import React from 'react';
import {cn} from "@/lib/utils";
import {ProducImage} from "@/components/shared/product-image";
import {Title} from "@/components/shared/title";
import {Button} from "@/components/ui";

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
      <ProducImage imageUrl={imageUrl} size={30} />

    <div className="w-[490px] bh-[#F7F6F5] p-7">

      <Title text={name} size="md" className="mt-5 font-extrabold mb-1"/>

      <p className="text-gray-400 ">{textDetaills}</p>

      <Button
        className="h-[55px] px-10 mt-8 text-base rouded-[18px] w-full ">
        Добавить в корзину за {totalPrice}
      </Button>

    </div>

    </div>

  );
};

