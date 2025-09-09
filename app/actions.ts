'use server';

import {CheckoutFormValues} from "@/shared/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";

export async function createOder(data: CheckoutFormValues) {
  console.log(data);
  const token = '123';

  await prisma.order.create({
      data: {
        token,
        totalAmount: 1500,
        status: OrderStatus.PENDING,
        items: JSON.stringify([]),
        userId: 1,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
      },
   });

}