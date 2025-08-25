'use client';

import React from 'react';
import {Product} from "@prisma/client";
import {ChooseProductForm, Title} from "@/shared/components/shared";
import {useRouter} from "next/navigation";
import {cn} from "@/shared/lib/utils";
import {Dialog, DialogContent} from "@/shared/components/ui/dialog";
import {ProductWithRelations} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/shared/components/shared/choose-pizza-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModel: React.FC<Props> = ({ product,  className}) => {
  const router = useRouter();
  const isPizzaForm = Boolean( product.items[0].pizzaType);
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] min-w-[1060px] min-h-[500px] bg-white overflow-hidden'
        , className,
        )}>
        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients}/>
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};

