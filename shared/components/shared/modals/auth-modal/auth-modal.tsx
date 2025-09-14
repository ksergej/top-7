'use client';

import React from 'react';
import {Dialog, DialogContent} from '@/shared/components/ui/dialog';
//import { LoginForm } from './forms/login-form';
//import { RegisterForm } from './forms/register-form';
import {Button} from '@/shared/components/ui/button';
import {signIn} from 'next-auth/react';
import {LoginForm, RegisterForm} from "@/shared/components";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export const AuthModal: React.FC<Props> = ({open, onClose}) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');
  const [loading, setLoading] = React.useState(false);

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
    setType('login');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose}/>
        ) : (
          <RegisterForm onClose={handleClose}/>
        )}

        <hr/>

        <div className="flex gap-2">
          <Button
            loading={loading}
            variant="secondary"
            onClick={() => {
              setLoading(true);
              signIn('github', {

                callbackUrl: '/',
                redirect: true,
              })
            }}
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg"/>
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('facebook', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              className="w-6 h-6"
              src="/facebook_logo.png"
            />
            Facebook
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
