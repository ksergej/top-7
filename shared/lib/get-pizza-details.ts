import {Ingredient, ProductItem} from "@prisma/client";
import {calcTotalPizzaPrice} from "@/shared/lib/calc-total-pizza-price";
import {mapPizzaType, PizzaSize, PizzaType} from "@/shared/constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  )
  const textDetaills = `${size} см, ${mapPizzaType[type]} пица, ингредиенты (${selectedIngredients.size})`;

  return {
    totalPrice,
    textDetaills,
  }
}