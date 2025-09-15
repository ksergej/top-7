import {prisma} from "@/prisma/prisma-client";
import NotFound from "next/dist/client/components/builtin/not-found";
import React from "react";
import {Container, ProductForm} from "@/shared/components/shared";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

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