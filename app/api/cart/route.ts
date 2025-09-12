import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import crypto from 'crypto';
import {findOrCreateCart} from "@/shared/lib/find-or-create-cart";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {

  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({totalAmount: 0, items: []});
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          }
        ]
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            productItem: {
              include: {
                product: true,
              }
            },
            ingredients: true,
          }
        }
      }
    })

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET]', error);
    return NextResponse.json({message: 'Не удалось получить корзину'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    // 1. Поиск в корзине со списком ингредиентов с полным совпадением ингредиентов
    // 2. Проверка ниже в if совпадения количества
    if (!data.ingredients) {
      data.ingredients = [];
    }

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        AND: [
          // есть каждый из нужных
          ...data.ingredients.map((id) => ({ingredients: {some: {id}}})),
          // нет лишних
          {ingredients: {none: {id: {notIn: data.ingredients}}}},
        ],
      },
      include: {
        ingredients: true,
      }
    });


    // Если товар был найден, делаем +1
    if (findCartItem
    ) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });


      const updatedUserCart = await updateCartTotalAmount(token);
      const resp = NextResponse.json(updatedUserCart);
      resp.cookies.set('cartToken', token);
      return resp;
    } else {

      // Если товар не найден:
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({id})),
          },
        },
      });

    }
    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;

  } catch (error) {
    console.log('[CART_POST]', error);
    return NextResponse.json({message: 'Не удалось создать корзину'}, {status: 500});
  }
}