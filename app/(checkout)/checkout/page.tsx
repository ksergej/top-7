'use client';
import {CheckoutSidebar, Container, Title } from "@/shared/components";
import {useCart} from "@/shared/hooks";
import {useForm, FormProvider} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm} from "@/shared/components";
import {checkoutFormSchema, CheckoutFormValues} from "@/shared/constants";
import {cn} from "@/shared/lib/utils";
import {createOder} from "@/app/actions";

export default function CheckoutPage() {
  const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Submitting: ", data);
    createOder(data);

  }

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1);
  };

  return <Container className="mt-10">
    <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className="flex gap-10">
          {/* Левая часть */}
          <div className="flex flex-col gap-10 flex-1 mb-20">

            <CheckoutCart
              items={items}
              onClickCountButton={onClickCountButton}
              loading={loading}
              removeCartItem={removeCartItem}
            />
            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : '' }/>
            <CheckoutAddressForm  className={loading ? "opacity-40 pointer-events-none" : '' }/>
          </div>

          {/* Правая часть */}
          <div className="w-[450px]">
            <CheckoutSidebar totalAmount={totalAmount} loading={loading}/>
          </div>
        </div>

      </form>
    </FormProvider>
  </Container>

}