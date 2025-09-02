import {Ingredient, ProductItem} from '@prisma/client';
import {CartItemDTO} from "@/shared/services/dto/cart.dto";
import {accumulate} from "effect/Stream";

type Item = {
  productItem: ProductItem;
  ingredients: Ingredient[];
  quantity: number;
};

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {

  return (
    (item.productItem.price +
      item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) *
    item.quantity
  );
};
