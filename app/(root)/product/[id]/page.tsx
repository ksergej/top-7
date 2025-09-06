import {prisma} from "@/prisma/prisma-client";
import NotFound from "next/dist/client/components/builtin/not-found";
import React from "react";
import {Container, ProductForm} from "@/shared/components/shared";

export default async function ProductPage({params: {id}}: { params: { id: string } }) {

  const product =
    await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        ingredients: true,
        category: {
          include: {
            products: {
              include: {
                items: true,
              },
            },
          },
        },
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            product: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });


  if (!product) return NotFound();

  return ( <Container className="flex flex-col my-10">
    <ProductForm product={product}/>
  </Container>
  );
}