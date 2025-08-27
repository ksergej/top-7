"use client";
import React from 'react';
import {cn} from "@/shared/lib/utils";
import {PizzaImage} from "@/shared/components/shared/pizza-image";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {GroupVariants} from "@/shared/components/shared/group-variants";
import {mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import {Ingredient, ProductItem} from "@prisma/client";
import {IngredientItem} from "@/shared/components/shared/ingredient-item";
import {useSet} from "react-use";
import {calcTotalPizzaPrice} from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCard?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
                                                   imageUrl,
                                                   name,
                                                   ingredients,
                                                   items,
                                                   onClickAddCard,
                                                   className,
                                                 }) => {

  const [size, setSize] = React.useState<PizzaSize>(30);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  )
  const textDetaills = `${size} см, ${mapPizzaType[type]} пица, ингредиенты (${selectedIngredients.size})`;

  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const handleClickAdd = () => {
    onClickAddCard?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredients,
      totalPrice,
    });
  }

  console.log(items, filteredPizzasByType, availablePizzaSizes);

  return (
    <div className={cn(className, 'flex flex-1')}>

      <PizzaImage imageUrl={imageUrl} size={size}/>

      <div className="w-[490px] bh-[#F7F6F5] p-7">

        <Title text={name} size="md" className="mt-5 font-extrabold mb-1"/>

        <p className="text-gray-400 ">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">

          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClik={value => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClik={value => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className={'grid grid-cols-3 gap-3'}>
            {ingredients.map((ingredient, index) => (
              <IngredientItem
                key={index}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleClickAdd}
                className="h-[55px] px-10 mt-8 text-base rouded-[18px] w-full ">
          Добавить в корзину за {totalPrice}
        </Button>

      </div>
    </div>
  );
}
