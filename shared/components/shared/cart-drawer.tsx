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
import {CartItem} from './cart-item';
import {ArrowRight} from 'lucide-react';
import Link from "next/link";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div>
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">3 товара</span>
            </SheetTitle>
          </SheetHeader>

          {/* Items */}

          <div className="flex flex-col gap-2 mt-5">
            <CartItem
              name="Чизбургер-пицца"
              imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
              price={500}
            />
            <CartItem
              name="Чизбургер-пицца"
              imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
              price={350}
              count={3}
            />
          </div>
        </div>

        <SheetFooter className=" bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого огого
                <div className="flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2"/>
              </span>

              <span className="font-bold text-lg">500 ₽р</span>

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
