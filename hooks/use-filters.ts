import {useSearchParams} from "next/navigation";
import {useSet} from "react-use";
import React from "react";

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

// Video 6.23.50
interface PriceProps {
  priceFrom: number;
  priceTo: number;
}


export const useFilters = () : ReturnProps => {
  // Video 6.50.38
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [selectedIngredients, { toggle: toggleingredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );

  // Video: 6.30.50
  // Video: 6.53.20
  /* Фильтр размеров */
  const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(
    searchParams.has('sizes')
      ? searchParams.get('sizes')?.split(',')
      : []
  ));

  /* Фильтр типов пиццы */
  const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(
    searchParams.has('pizzaTypes')
      ? searchParams.get('pizzaTypes')?.split(',')
      : []
  ));

  /* Фильтр стоимости */
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices( (prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filters go to Backend ... Video: 6.38.30
  const filters = {
    ...prices,
    pizzaTypes: Array.from(pizzaTypes),
    sizes: Array.from(sizes),
    ingredients: Array.from(selectedIngredients),
  };
  // Video 6.41.19 -> arrayFormat: 'comma'
  // console.log(qs.stringify(filters, {arrayFormat: 'comma'}));


  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleingredients,
  }

}