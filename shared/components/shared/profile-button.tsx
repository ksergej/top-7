import React from 'react';
import {useSession} from "next-auth/react";
import {Button} from "@/shared/components";
import {CircleUser, User} from "lucide-react";
import Link from "next/link";

interface Props {
  onClickSighIn?: VoidFunction;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({className, onClickSighIn}) => {
  const {data: session} = useSession();

  return (
    <div className={className}>
      { !session
      ? (
      <Button onClick={onClickSighIn}
              variant="outline"
              className="flex items-center gap-1">
        <User size={16}/> Anmelden
      </Button>
      )
      : (
      <Link href="/profile">
        <Button variant="outline" className="flex items-center gap-2">
          <CircleUser size={18}/>
          Профиль
        </Button>
      </Link>
      )}
    </div>
  );
};

