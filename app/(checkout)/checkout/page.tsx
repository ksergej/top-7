'use client';
import {CheckoutSidebar, Container, Title} from "@/shared/components";
import {useCart} from "@/shared/hooks";
import {useForm, FormProvider} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm} from "@/shared/components";
import {checkoutFormSchema, CheckoutFormValues} from "@/shared/constants";
import {cn} from "@/shared/lib/utils";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import {useSession} from "next-auth/react";
import {Api} from "@/shared/services/api-client";

export default function CheckoutPage() {
  const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();
  const [submitting, setSubmitting] = React.useState(false);
  const {data: session} = useSession();


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

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату ...', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }

    } catch (error) {
      console.log(error);
      setSubmitting(false);
      return toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1);
  };

  return <Container className="mt-10">
    <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          {/* Левая часть */}
          <div className="flex flex-col gap-10 flex-1 mb-20">

            <CheckoutCart
              items={items}
              onClickCountButton={onClickCountButton}
              loading={loading}
              removeCartItem={removeCartItem}
            />
            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''}/>
            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ''}/>
          </div>

          {/* Правая часть */}
          <div className="w-[450px]">
            <CheckoutSidebar loading={loading || submitting} totalAmount={totalAmount}/>
          </div>
        </div>

      </form>
    </FormProvider>
  </Container>

}