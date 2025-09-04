'use client';

import React from 'react';
import {Product} from "@prisma/client";
import {ChooseProductForm, Title} from "@/shared/components/shared";
import {useRouter} from "next/navigation";
import {cn} from "@/shared/lib/utils";
import {Dialog, DialogContent} from "@/shared/components/ui/dialog";
import {ProductWithRelations} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/shared/components/shared/choose-pizza-form";
import {useCartStore} from "@/shared/store";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const addCartItem = useCartStore( (state) => state.addCartItem );
  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    });
  };

  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredients,
    });
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] min-w-[1060px] min-h-[500px] bg-white overflow-hidden'
        , className,
      )}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onAddProduct}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

