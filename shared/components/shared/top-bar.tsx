import {cn} from '@/shared/lib/utils';
import React from 'react';
import {Props} from "next/script";
import {Container} from "@/shared/components/shared/container";
import {Categories} from "@/shared/components/shared/categories";
import {SortPopup} from "@/shared/components/shared/sort-popup";
import {Category} from "@prisma/client";
import {categories} from "@/prisma/constants";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({categories, className}) => {
  return (
    <div
      className={cn('sticky top-0 bf-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories}/>
        <SortPopup/>
      </Container>
    </div>
  )
}
