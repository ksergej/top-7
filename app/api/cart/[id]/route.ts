import {NextRequest, NextResponse} from 'next/server';
import {prisma} from "@/prisma/prisma-client";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";

export async function PATCH(req: NextRequest) {
  try {

    // Достаём id прямо из URL
    const url = new URL(req.url);
    const id = Number( url.pathname.split("/").pop()); // "123" если вызвали /api/cart/123
    const body = await req.json();
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({error: 'Cart token not found'});
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({error: 'Cart item not found'});
    }

    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: body.quantity,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);

  } catch (err) {
    console.log('[CART_PATCH] Server error', err);
    return NextResponse.json({message: ' Не удалось обновить корзину'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({error: 'Cart token not found'});
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({error: 'Cart item not found'});
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);

  } catch (error) {

    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({message: ' Не удалось удалить корзину'}, {status: 500});

  }
}
