'use server';

import {CheckoutFormValues} from "@/shared/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import {cookies} from "next/headers";
import {sendEmail} from "@/shared/lib/send-email";
import {PayOrderTemplate} from "@/shared/components";
import {ReactNode} from "react";
import {createPayPalOrder} from "@/shared/lib/create-paypal-order";

export async function createOrder(data: CheckoutFormValues) {

  try {

    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // TODO:  сделать создание ссылки оплаты
    const {approveLink, approveId} = await createPayPalOrder(userCart?.totalAmount.toString());

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: approveId,
      },
    });

    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ №' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: approveLink,
      }) as ReactNode
    );

    return approveLink;

  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }

}


//
// Подтверждение (capture)
//
export async function capturePayPalOrder(orderID: string) {
  const {PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_MODE} = process.env;
  const base =
    PAYPAL_MODE === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

  // 1. Access token
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const tokenResp = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!tokenResp.ok) {
    throw new Error("Не удалось получить PayPal access token");
  }

  const {access_token} = await tokenResp.json();

  // 2. Capture
  const captureResp = await fetch(`${base}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  if (!captureResp.ok) {
    const err = await captureResp.text();
    throw new Error("Ошибка capture PayPal order: " + err);
  }

  console.log('Capture PayPal orderID : ', orderID);

  const orderData = await prisma.order.findFirst({
    where: {
      paymentId: orderID,
    },
  });

  if (orderData) {
    await prisma.order.update({
      where: {
        id: orderData.id,
      },
      data: {
        status: 'SUCCEEDED'
      },
    });
  }

  const captureData = await captureResp.json();
  return captureData;
}