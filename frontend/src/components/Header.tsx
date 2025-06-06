// Header

'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

const titles: Record<string, string> = {
  '/': 'Wearzy',
  '/wardrobe': 'Wardrobe',
  '/suggestions': 'Suggestions',
  '/chat': 'Chat',
  '/shopping': 'Shopping',
};

export default function Header() {
  const pathname = usePathname();
  const title = titles[pathname] || 'Wearzy';
  const router = useRouter();

  return (
    <div className="relative w-full h-16 flex items-center bg-background px-4">
      {/* CENTER TITLE */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
        {title}
      </h1>

      {/* RIGHT ICON */}
      <div className="ml-auto absolute right-4">
        <Button
          className="cursor-pointer size-8"
          variant="ghost"
          size="icon"
          asChild
          onClick={() => router.push('/profile')}
        >
          <UserIcon size={28} />
        </Button>
      </div>
    </div>
  );
}
