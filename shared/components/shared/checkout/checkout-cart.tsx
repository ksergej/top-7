import React from 'react';
import {CheckoutItem, WhiteBlock} from "@/shared/components/shared";
import {getCartItemDetails} from "@/shared/lib";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {removeCartItem} from "@/shared/services/cart";
import {CartStateItem} from "@/shared/lib/get-cart-details";
import {Skeleton} from "@/shared/components";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
                                                items,
                                                onClickCountButton,
                                                removeCartItem,
                                                loading,
                                                className
                                              }) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {
          loading && [...Array(4).map((_, index) => <Skeleton key={index} className="h-24"/>)]
        }
        {
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={0}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize,
              )}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              disabled={item.disabled}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            >
            </CheckoutItem>
          ))
        }
      </div>
    </WhiteBlock>
  );
};

