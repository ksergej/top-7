'use client';

import React from 'react';
import {Dialog} from "@/components/ui";
import {DialogContent} from "@/components/ui/dialog";
import {Product} from "@prisma/client";
import {Title} from "@/components/shared";
import {useRouter} from "next/navigation";

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModel: React.FC<Props> = ({ product,  className}) => {
  const router = useRouter();
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className='p-0 w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        <Title size='sm' className='p-5' text={product.name}>
        </Title>
      </DialogContent>
    </Dialog>
  );
};

