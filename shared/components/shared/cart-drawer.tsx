'use client';

import {Button} from '@/shared/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import {CartDrawerItem} from './cart-drawer-item';
import {ArrowRight} from 'lucide-react';
import Link from "next/link";
import {getCartItemDetails} from "@/shared/lib";
import {useCartStore} from "@/shared/store/";
import React from "react";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({children}) => {
  const fetchCartItems = useCartStore(state => state.fetchCartItems, );
  const totalAmount = useCartStore(state => state.totalAmount );
  const items = useCartStore(state =>  state.items );

  React.useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="mt-5 overflow-auto flex-1">
          <div className='mb-2'>
            {
              items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={
                    item.pizzaSize && item.pizzaType
                      ? getCartItemDetails(
                        item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize
                      )
                      : ''
                  }
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))
            }
          </div>
        </div>

        <SheetFooter className=" bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2"/>
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>

            </div>
            <Link href="/cart">
              <Button
                type="submit"
                className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2"/>
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
