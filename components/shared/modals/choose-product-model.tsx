'use client';

import React from 'react';
import {Dialog} from "@/components/ui";
import {DialogContent} from "@/components/ui/dialog";
import {Product} from "@prisma/client";
import { Title } from '@radix-ui/react-dialog';

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModel: React.FC<Props> = ({ product,  className}) => {
  return (
    <Dialog open={Boolean(product)}>
      <DialogContent className='p-0 w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        <Title>
          Choose product model { product.name}
        </Title>
      </DialogContent>
    </Dialog>
  );
};

