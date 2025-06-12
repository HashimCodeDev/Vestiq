import { BellIcon } from '@phosphor-icons/react';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function Header() {
  const { displayName, photoURL, email, loading } = useUserInfo();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Good Morning, {displayName} ☀️
        </h1>
        <p className="text-gray-600">Level 3: Sartorial Sorcerer ✨</p>
      </div>
      <div className="flex items-center space-x-2">
        <BellIcon className="w-6 h-6 text-gray-600" />
        <Link href="/profile">
          <Avatar>
            <AvatarImage src={photoURL ? photoURL : ''} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
