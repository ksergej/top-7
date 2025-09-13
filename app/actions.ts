'use server';

import {CheckoutFormValues} from "@/shared/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {cookies} from "next/headers";
import {sendEmail} from "@/shared/lib/send-email";
import {PayOrderTemplate} from "@/shared/components";
import {ReactNode} from "react";
import {createPayPalOrder} from "@/shared/lib/create-paypal-order";
import {getUserSession} from "@/shared/lib/get-user-session";
import {hashSync} from "bcrypt";
import {VerificationUserTemplate} from "@/shared/components/shared/email-templates/verification-user";

/**
 * Creates an order based on the provided checkout form data and the associated user's cart.
 *
 * @param {CheckoutFormValues} data - The checkout form data, which includes information like the user's full name, email, phone, address, and any comments.
 * @return {Promise<string | undefined>} A promise that resolves to the PayPal approval link for payment if the order is successfully created, or undefined if an error occurs.
 */
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
/**
 * Captures a PayPal order using the provided order ID. This method authenticates with the PayPal API,
 * sends a capture request for the order, and updates the order status in the database if it exists.
 *
 * @param {string} orderID - The ID of the PayPal order to be captured.
 * @return {Promise<object>} A promise that resolves with the capture data returned by the PayPal API.
 * @throws {Error} If there is an issue obtaining the PayPal access token or capturing the PayPal order.
 */
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

/**
 * Updates the user information based on the provided input data.
 *
 * @param {Prisma.UserCreateInput} body - The user data to update, which includes fields such as fullName, email, and password.
 * @return {Promise<void>} A promise that resolves when the user information is successfully updated or throws an error if the update fails.
 */
export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });


    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}

/**
 * Registers a new user in the system. Checks if the user's email already exists.
 * If the email is unverified, an error is thrown. If the user does not exist,
 * a new user is created with the provided data, including a hashed password.
 * A verification code is generated and sent to the user's email for account confirmation.
 *
 * @param {Prisma.UserCreateInput} body - The input data for creating a new user, including email, password, and other details.
 * @return {Promise<void>} Resolves when the user is successfully registered and a verification email is sent, or rejects with an error.
 */
export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        phone: body.phone,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / Подтверждение регистрации',
      VerificationUserTemplate({code}) as ReactNode ,
    );

  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}



