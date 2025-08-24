import {prisma} from "@/prisma/prisma-client";
import NotFound from "next/dist/client/components/builtin/not-found";
import {ChooseProductModel } from "@/shared/components/shared";


export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      ingredients: true,
      items: true,
      }
  });

  if (!product) return NotFound();

  return <ChooseProductModel  product={product}/>
}