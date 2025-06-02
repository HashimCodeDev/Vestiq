'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ListIcon, UserIcon } from '@phosphor-icons/react';

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

  return (
    <div className="relative w-full h-16 flex items-center bg-background px-4">
      {/* LEFT ICON - Drawer Trigger */}
      <div className="mr-auto absolute left-4">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <ListIcon size={10} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4 max-w-1/2">
            <DrawerHeader
              className="text-left"
              aria-description="Drawer Header"
              aria-describedby={undefined}
            >
              <DrawerTitle>Wearzy</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <ul className="mt-4 ml-4 space-y-2">
              {Object.entries(titles).map(([path, name]) => (
                <li key={path}>
                  <a
                    href={path}
                    className="block text-sm hover:underline transition"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </DrawerContent>
        </Drawer>
      </div>

      {/* CENTER TITLE */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
        {title}
      </h1>

      {/* RIGHT ICON */}
      <div className="ml-auto absolute right-4">
        <Button variant="ghost" size="icon" asChild>
          <UserIcon size={28} />
        </Button>
      </div>
    </div>
  );
}
