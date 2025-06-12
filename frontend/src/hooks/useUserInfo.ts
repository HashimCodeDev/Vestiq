// hooks/useUserInfo.ts
'use client';

import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface UserInfo {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  loading: boolean;
}

export const useUserInfo = (): UserInfo => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    displayName: null,
    photoURL: null,
    email: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserInfo({
          displayName:
            user.displayName ?? user.providerData[0]?.displayName ?? null,
          photoURL: user.photoURL ?? user.providerData[0]?.photoURL ?? null,
          email: user.email ?? user.providerData[0]?.email ?? null,
          loading: false,
        });
      } else {
        setUserInfo({
          displayName: null,
          photoURL: null,
          email: null,
          loading: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return userInfo;
};
