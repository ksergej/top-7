import React from 'react';
import {FormTextarea, WhiteBlock} from "@/shared/components/shared";
import {Input} from "@/shared/components/ui";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
       <WhiteBlock title="3. Адрес доставки">
          <div className="flex flex-col gap-5">
            <Input name="firstName" className="text-base" placeholder="Адрес доставки"/>
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

