'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import {useCategoryStore} from "@/store/category";
import {Button} from "@/components/ui";
import {Category} from "@prisma/client";

interface Props {
  items: Category[];
  className?: string;
}
export const Categories: React.FC<Props> = ({items, className }) => {
  const categoryActiveId = useCategoryStore( (state) => state.activeId );
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(({id, name }, index) => (
        <Link
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === index + 1 && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href={`/#${name}`}
          key={index}>
          {name}
        </Link>
      ))}
    </div>
  );
};
