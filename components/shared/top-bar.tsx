import {cn} from '@/lib/utils';
import React from 'react';
import {Props} from "next/script";
import {Container} from "@/components/shared/container";
import {Categories} from "@/components/shared/categories";
import {SortPopup} from "@/components/shared/sort-popup";
import TestNavigationMenuMapNested from "@/components/shared/testNavigationMenuMapNested";
import NavigationMenuWithDropdown from "@/components/shared/testNavigationMenuWithDropdown";
import {NavigationMenuDemo} from "@/components/shared/testNavigationMenu";

interface TopBar {
  className?: string;
}

export const TopBar: React.FC<Props> = ({className}) => {
  return (
    <div
      className={cn('sticky top-0 bf-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories/>
        <SortPopup/>
      </Container>
    </div>
  )
}
