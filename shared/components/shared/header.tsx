'use client';
import React from 'react';
import Image from 'next/image';

import {Container} from './container';
import {Button} from '../ui/button';
import {ArrowRight, ShoppingCart, User} from 'lucide-react';
import {SearchInput} from './search-input';
import {cn} from '@/shared/lib/utils';
import {CartDrawer} from './cart-drawer';
import Link from "next/link";
import {AuthModal, CartButton, ProfileButton} from "@/shared/components/shared";
import {redirect, useSearchParams} from 'next/navigation';
import toast from "react-hot-toast";
import {useSession, signIn} from "next-auth/react";


interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
                                          hasSearch = true,
                                          hasCart = true,
                                          className
                                        }) => {

  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const {data: session} = useSession();
  const searchParams = useSearchParams();

  React.useEffect(() => {
      if (searchParams.has('paid')) {
        setTimeout(() => {
          toast.success('Заказ успешно оплачен!');
        }, 500);
      }
    }, []
  );


  return (
    <header className={cn(' border-b border-gray-100', className)}>
      <Container className="flex items-center justify-between py-8">

        <Link href="/">

          <div className="flex items-center gap-4">
            <Image src="/logo2.png" width={130} height={100} alt="Logo"/>
            <div>
              <h1 className="text-2xl uppercase font-black">Top 7</h1>
              <p className="text-sm text-gray-400 leading-3">best reviews</p>
            </div>
          </div>
        </Link>

        {hasSearch && <div className="mx-10 flex-1">
            <SearchInput/>
        </div>}

        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

          <ProfileButton onClickSighIn={() => setOpenAuthModal(true)}/>
          {hasCart && <CartButton/>}
        </div>
      </Container>
    </header>
  );
};
