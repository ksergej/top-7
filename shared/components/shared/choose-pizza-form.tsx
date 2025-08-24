import React from 'react';
import {cn} from "@/shared/lib/utils";
import {PizzaImage} from "@/shared/components/shared/pizza-image";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {GroupVariants} from "@/shared/components/shared/group-variants";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

const textDetaills = "30 см, традиционное тесто 30";
const totalPrice = 350;
const size = 30;

export const ChoosePizzaForm: React.FC<Props> = ({
                                                     imageUrl,
                                                     name,
                                                     ingredients,
                                                     items,
                                                     onClickAdd,
                                                     className,
                                                   }) => {
  return (
    <div className={cn(className, 'flex flex-1')}>

      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bh-[#F7F6F5] p-7">

        <Title text={name} size="md" className="mt-5 font-extrabold mb-1"/>

        <p className="text-gray-400 ">{textDetaills}</p>

        <GroupVariants
          items={ingredients}
        />

        <Button
          className="h-[55px] px-10 mt-8 text-base rouded-[18px] w-full ">
          Добавить в корзину за {totalPrice}
        </Button>

      </div>

    </div>

  );
};

