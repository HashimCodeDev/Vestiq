'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import { useHeaderMeta } from '@/hooks/useHeaderMeta';

export default function Header() {
  const router = useRouter();
  const { title, shouldShowBackButton } = useHeaderMeta();

  return (
    <div className="relative w-full h-16 flex items-center bg-background px-4">
      {/* LEFT BACK ARROW */}
      <div className="absolute left-4 flex items-center">
        {shouldShowBackButton && (
          <Button
            className="cursor-pointer size-6"
            variant="ghost"
            size="icon"
            asChild
            onClick={() => router.back()}
          >
            <ArrowLeftIcon size={28} />
          </Button>
        )}
      </div>

      {/* CENTER TITLE */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
        {title}
      </h1>

      {/* RIGHT ICON */}
      <div className="ml-auto absolute right-4 top-4.5">
        {!shouldShowBackButton && (
          <Button
            className="cursor-pointer size-6"
            variant="ghost"
            size="icon"
            asChild
            onClick={() => router.push('/profile')}
          >
            <UserIcon size={28} />
          </Button>
        )}
      </div>
    </div>
  );
}
