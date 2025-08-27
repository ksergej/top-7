import {PizzaSize, PizzaType } from "@/shared/constants/pizza";
import {Ingredient, ProductItem} from "@prisma/client";

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @example
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns `number` общюю стоимость
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice = items.find((item) => item.size === size && item.pizzaType === type)?.price || 0;
  const totalIngredientPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce(
      (acc, ingredient) => acc + ingredient.price, 0
    );

  return pizzaPrice + totalIngredientPrice;
}