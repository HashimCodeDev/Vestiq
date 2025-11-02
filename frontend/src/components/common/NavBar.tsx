/**
 * Enhanced Navigation Bar Component
 *
 * Features:
 * - Glass morphism design with backdrop blur
 * - Smooth animations and micro-interactions
 * - Enhanced active states with glow effects
 * - Improved accessibility and touch targets
 * - Responsive design with better spacing
 */

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
      <nav className="fixed w-full bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-t-2 border-white/50 dark:border-white/30 z-50 safe-area-inset-bottom shadow-2xl">
        {/* Enhanced background with multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/15 to-transparent dark:from-black/30 dark:via-black/15 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 opacity-50" />

        <div className="w-full max-w-md mx-auto relative">
          <div className="flex justify-around items-center py-4 px-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.match(pathname);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-3xl min-h-[68px] min-w-[68px] transition-all duration-500 hover:scale-115 ${
                    isActive
                      ? 'bg-gradient-to-br from-primary/20 via-primary/15 to-accent/10 shadow-2xl shadow-primary/30 backdrop-blur-md border-2 border-primary/40'
                      : 'hover:bg-white/70 dark:hover:bg-black/70 hover:shadow-xl backdrop-blur-md border border-transparent hover:border-white/40'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Enhanced active indicator with gradient */}
                  {isActive && (
                    <>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-scale-in shadow-lg shadow-primary/50" />
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 via-accent/10 to-transparent animate-pulse-soft" />
                    </>
                  )}

                  {/* Icon with enhanced effects */}
                  <div className="relative">
                    <Icon
                      className={`transition-all duration-500 ${
                        isActive
                          ? 'text-primary scale-125 drop-shadow-2xl'
                          : 'text-muted-foreground group-hover:text-primary group-hover:scale-[1.35] group-hover:drop-shadow-lg'
                      }`}
                      size={28}
                      weight={isActive ? 'fill' : 'duotone'}
                    />
                    {/* Enhanced glow effect for active icon */}
                    {isActive && (
                      <div className="absolute inset-0 text-primary/40 scale-[1.8] blur-md animate-pulse-slow">
                        <Icon size={28} weight="fill" />
                      </div>
                    )}
                  </div>

                  {/* Enhanced label with gradient text */}
                  <span
                    className={`text-xs font-bold mt-2 transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent opacity-100 scale-110'
                        : 'text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:scale-110'
                    }`}
                  >
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                  </span>

                  {/* Enhanced ripple effect with gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20 scale-0 group-active:scale-100 transition-transform duration-300 ease-out" />

                  {/* Enhanced hover glow with gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Enhanced spacer with improved gradient */}
      <div className="h-[96px] safe-area-inset-bottom relative">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </div>
    </>
  );
}
