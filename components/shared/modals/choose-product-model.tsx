'use client';

import React from 'react';
import {Product} from "@prisma/client";
import {ChooseProductForm, Title} from "@/components/shared";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Dialog, DialogContent} from "@/components/ui/dialog";

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModel: React.FC<Props> = ({ product,  className}) => {
  const router = useRouter();
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] min-w-[1060px] min-h-[500px] bg-white overflow-hidden'
        , className,
        )}>
        <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]}/>
      </DialogContent>
    </Dialog>
  );
};

