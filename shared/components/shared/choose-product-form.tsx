import React from 'react';
import {cn} from "@/shared/lib/utils";
import {PizzaImage} from "@/shared/components/shared/pizza-image";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма выбора продукта
 *
 * @param imageUrl
 * @param name
 * @param price
 * @param loading
 * @param onSubmit
 * @param className
 * @constructor
 */
export const ChooseProductForm: React.FC<Props> = ({
                                                     imageUrl,
                                                     name,
                                                     price,
                                                     loading,
                                                     onSubmit,
                                                     className,
                                                   }) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bh-[#F7F6F5] p-7">

        <Title text={name} size="md" className="mt-5 font-extrabold mb-1"/>

        <p className="text-gray-400 ">{""}</p>

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 mt-8 text-base rouded-[18px] w-full ">
          Добавить в корзину за {price}
        </Button>

      </div>

    </div>

  );
};

