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
      <nav className="fixed w-full bottom-0 left-0 right-0 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-t border-white/40 dark:border-white/20 z-50 safe-area-inset-bottom shadow-2xl">
        {/* Enhanced background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/10 to-transparent dark:from-black/20 dark:via-black/10 dark:to-transparent" />
        
        <div className="w-full max-w-md mx-auto relative">
          <div className="flex justify-around items-center py-4 px-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.match(pathname);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-3xl min-h-[64px] min-w-[64px] transition-all duration-500 hover:scale-110 ${
                    isActive
                      ? 'bg-primary/15 shadow-xl shadow-primary/20 backdrop-blur-sm border border-primary/30'
                      : 'hover:bg-white/60 dark:hover:bg-black/60 hover:shadow-lg backdrop-blur-sm'
                  }`}
                >
                  {/* Enhanced active indicator */}
                  {isActive && (
                    <>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-primary to-primary/80 rounded-full animate-scale-in shadow-glow" />
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse-soft" />
                    </>
                  )}

                  {/* Icon with enhanced effects */}
                  <div className="relative">
                    <Icon
                      className={`transition-all duration-500 ${
                        isActive
                          ? 'text-primary scale-110 drop-shadow-lg'
                          : 'text-muted-foreground group-hover:text-primary group-hover:scale-125 group-hover:drop-shadow-md'
                      }`}
                      size={26}
                      weight={isActive ? 'fill' : 'regular'}
                    />
                    {/* Glow effect for active icon */}
                    {isActive && (
                      <div className="absolute inset-0 text-primary/30 scale-150 blur-sm">
                        <Icon size={26} weight="fill" />
                      </div>
                    )}
                  </div>

                  {/* Enhanced label */}
                  <span
                    className={`text-xs font-semibold mt-1.5 transition-all duration-500 ${
                      isActive
                        ? 'text-primary opacity-100 scale-105'
                        : 'text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:scale-105'
                    }`}
                  >
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                  </span>

                  {/* Enhanced ripple effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 scale-0 group-active:scale-100 transition-transform duration-300 ease-out" />
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
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
