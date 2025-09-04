"use client";
import React from 'react';
import {cn} from "@/shared/lib/utils";
import {PizzaImage} from "@/shared/components/shared/pizza-image";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {GroupVariants} from "@/shared/components/shared/group-variants";
import {PizzaSize, PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import {Ingredient, ProductItem} from "@prisma/client";
import {IngredientItem} from "@/shared/components/shared/ingredient-item";
import {usePizzaOptions} from "@/shared/hooks/use-pizza-options";
import {getPizzaDetails} from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора пиццы
 *
 * @param imageUrl
 * @param name
 * @param ingredients
 * @param items
 * @param onClickAddCard
 * @param className
 * @constructor
 */
export const ChoosePizzaForm: React.FC<Props> = ({
                                                   imageUrl,
                                                   name,
                                                   ingredients,
                                                   items,
                                                   onSubmit,
                                                   className,
                                                 }) => {

  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient
  } = usePizzaOptions(items);

  const {totalPrice , textDetaills} = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  )

  const handleClickAdd = () => {
    if (currentItemId){
      onSubmit(currentItemId, Array.from(selectedIngredients.values()));
    }
  }


  return (
    <div className={cn(className, 'flex flex-1')}>

      <PizzaImage imageUrl={imageUrl} size={size}/>

      <div className="w-[490px] bh-[#F7F6F5] p-7">

        <Title text={name} size="md" className="mt-5 font-extrabold mb-1"/>

        <p className="text-gray-400 ">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">

          <GroupVariants
            items={availableSizes}
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
