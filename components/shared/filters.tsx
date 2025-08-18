'use client';
import React from 'react';

import {FilterCheckbox} from '@/components/shared/filter-checkbox';
import {Title} from './title';
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui";
import {RangeSlider} from "@/components/ui/range-slider";
import {CheckboxFiltersGroup} from "@/components/shared/checkbox-filters-group";
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {useSet} from "react-use";
import qs from 'qs';
import {useRouter, useSearchParams} from "next/navigation";

interface Props {
  className?: string;
}

// Video 6.23.50
interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export const Filters: React.FC<Props> = ({className}) => {

  // Video 6.50.38
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  // Video 6.42.58, 7.00.00
  const router = useRouter();
  const {ingredients, loading, onAddId, selectedIngredients, setSelectedIngredients} = useFilterIngredients(
    searchParams.get('ingredients')?.split(',')
  );

  // Video: 6.30.50
  // Video: 6.53.20
  const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(
    searchParams.has('sizes')
      ? searchParams.get('sizes')?.split(',')
      : []
  ));
  const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(
    searchParams.has('pizzaTypes')
      ? searchParams.get('pizzaTypes')?.split(',')
      : []
  ));

  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const items = ingredients.map((item) => ({value: String(item.id), text: item.name}));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  console.log(searchParams, 999);

  React.useEffect(() => {

    // Filters go to Backend ... Video: 6.38.30
    const filters = {
      ...prices,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    }
    // Video 6.41.19 -> arrayFormat: 'comma'
    // console.log(qs.stringify(filters, {arrayFormat: 'comma'}));

    const query = qs.stringify(filters, {arrayFormat: 'comma'});
    router.push(`?${query}`, {scroll: false});

    console.log(query);

  }, [prices, pizzaTypes, sizes, selectedIngredients]);


  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        title="Размеры"
        name='sizes'
        className="mb-5"
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          {value: '20', text: '20 см'},
          {value: '30', text: '30 см'},
          {value: '40', text: '40 см'},
        ]}
      />

      <CheckboxFiltersGroup
        title="Тип теста"
        name='pizzaTypes'
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          {value: '1', text: 'Тонкое'},
          {value: '2', text: 'Традиционное'},
        ]}
      />

      <div className={cn('mt-5 border-y  border-y-neutral-100 py-6 pb-7')}>
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number"
                 placeholder="0" min={0} max={1000}
                 value={String(prices.priceFrom)}
                 onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input type="number" min={100} max={1000}
                 placeholder="1000"
                 value={String(prices.priceTo)}
                 onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider min={0} max={1000} step={10}
                     value={[prices.priceFrom || 0, prices.priceTo || 1000]}
                     onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}
        />

      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name='ingredients'
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
