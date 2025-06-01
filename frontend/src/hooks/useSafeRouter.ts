// hooks/useSafeRouter.ts
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSafeRouter = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const safePush = (url: string) => {
    if (isMounted && router) {
      router.push(url);
    }
  };

  const safeReplace = (url: string) => {
    if (isMounted && router) {
      router.replace(url);
    }
  };

  return {
    ...router,
    push: safePush,
    replace: safeReplace,
    isMounted,
  };
};
