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
  {
    href: '/',
    icon: HouseIcon,
    id: 'home',
    match: (path: string) => path === '/',
  },
  {
    href: '/wardrobe',
    icon: TShirtIcon,
    id: 'wardrobe',
    match: (path: string) => path.startsWith('/wardrobe'),
  },
  {
    href: '/suggestions',
    icon: LightbulbIcon,
    id: 'suggestions',
    match: (path: string) => path === '/suggestions',
  },
  {
    href: '/chat',
    icon: ChatDotsIcon,
    id: 'chat',
    match: (path: string) => path === '/chat',
  },
  {
    href: '/shopping',
    icon: ShoppingBagIcon,
    id: 'shopping',
    match: (path: string) => path === '/shopping',
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed w-full bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-white/30 dark:border-white/10 z-50 safe-area-inset-bottom shadow-2xl">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-around items-center py-3 px-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.match(pathname);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl min-h-[56px] min-w-[56px] transition-all duration-300 hover:scale-110 ${
                    isActive
                      ? 'bg-primary/10 shadow-lg'
                      : 'hover:bg-white/50 dark:hover:bg-black/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full animate-scale-in" />
                  )}

                  {/* Icon */}
                  <Icon
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'text-primary scale-110'
                        : 'text-muted-foreground group-hover:text-primary group-hover:scale-110'
                    }`}
                    size={24}
                    weight={isActive ? 'fill' : 'regular'}
                  />

                  {/* Label */}
                  <span
                    className={`text-xs font-medium mt-1 transition-all duration-300 ${
                      isActive
                        ? 'text-primary opacity-100'
                        : 'text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary'
                    }`}
                  >
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                  </span>

                  {/* Ripple effect on tap */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-150" />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Enhanced spacer with gradient fade */}
      <div className="h-[88px] safe-area-inset-bottom relative">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
      </div>
    </>
  );
}
