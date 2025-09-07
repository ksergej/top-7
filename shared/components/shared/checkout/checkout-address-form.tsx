import React from 'react';
import {AdressInput, FormTextarea, WhiteBlock} from "@/shared/components/shared";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
       <WhiteBlock title="3. Адрес доставки">
          <div className="flex flex-col gap-5">
            <AdressInput />
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

