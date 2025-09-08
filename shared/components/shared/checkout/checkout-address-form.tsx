'use client';
import React from 'react';
import {AdressInput, ErrorText, FormTextarea, WhiteBlock} from "@/shared/components/shared";
import {Controller, useFormContext} from "react-hook-form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({className}) => {

  const address = 'address';
  const {control} = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name={address}
          render={({field, fieldState}) => <>
            <AdressInput onChange={field.onChange}/>
            {fieldState.error?.message && <ErrorText text={fieldState.error.message} /> }
            </>}
          />

        <FormTextarea
        name="comment"
        className="text-base"
        placeholder='Комментарий к заказу'
        rows={5}
        />
      </div>

    </WhiteBlock>
  );
};

