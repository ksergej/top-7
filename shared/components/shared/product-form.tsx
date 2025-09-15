'use client';
import React from 'react';
import {useCartStore} from "@/shared/store";
import toast from "react-hot-toast";
import {ProductWithRelations} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/shared/components/shared/choose-pizza-form";
import {ChooseProductForm} from "@/shared/components/shared/choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({product, onSubmit: _onSubmit}) => {

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId: number, ingredients?: number[]) => {
    try {

      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success('Продукт добавлен в корзину');
      _onSubmit?.();
    } catch (error) {
      toast.error('Не удалось добавить продукт в корзину')
      console.error(error);
    }
  }

  if (isPizzaForm) {
    return <ChoosePizzaForm
      imageUrl={product.imageUrl}
      name={product.name}
      ingredients={product.ingredients}
      items={product.items}
      onSubmit={onSubmit}
      loading={loading}
    />
  }

  return <ChooseProductForm
    itemId={firstItem.id}
    imageUrl={product.imageUrl}
    name={product.name}
    onSubmit={onSubmit}
    price={firstItem.price}
    loading={loading}
  />
};

