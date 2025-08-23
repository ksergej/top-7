import {prisma} from "@/prisma/prisma-client";
import NotFound from "next/dist/client/components/builtin/not-found";
import {Container, ProducImage, Title} from "@/components/shared";
import {GroupVariants} from "@/components/shared/group-variants";

export default async function ProductModalPage({params: {id}}: { params: { id: string } }) {

  const product = await prisma.product.findFirst({where: {id: Number(id)}});

  if (!product) return NotFound();

  return <Container className="flex flex-col my-10">
  <h1>Product Modal</h1>
  </Container>
}