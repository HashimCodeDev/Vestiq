// Navbar

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HouseIcon,
  TShirtIcon,
  LightbulbIcon,
  ChatDotsIcon,
  ShoppingBagIcon,
} from '@phosphor-icons/react';

const navItems = [
  { href: '/', icon: HouseIcon, id: 'home' },
  { href: '/wardrobe', icon: TShirtIcon, id: 'wardrobe' },
  { href: '/suggestions', icon: LightbulbIcon, id: 'suggestions' },
  { href: '/chat', icon: ChatDotsIcon, id: 'chat' },
  { href: '/shopping', icon: ShoppingBagIcon, id: 'shopping' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed w-full bottom-0 left-0 right-0 bg-background border-t z-50 safe-area-inset-bottom">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-3 rounded-lg min-h-[48px] transition-colors hover:bg-accent"
                >
                  <Icon
                    className="text-primary"
                    size={24}
                    weight={isActive ? 'fill' : 'regular'}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind navbar */}
    </>
  );
}
