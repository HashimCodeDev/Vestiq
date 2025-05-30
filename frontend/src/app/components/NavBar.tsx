'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Shirt,
  Lightbulb,
  MessageSquareMore,
  ShoppingBag,
} from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, id: 'home' },
  { href: '/wardrobe', icon: Shirt, id: 'wardrobe' },
  { href: '/suggestions', icon: Lightbulb, id: 'suggestions' },
  { href: '/chat', icon: MessageSquareMore, id: 'chat' },
  { href: '/shopping', icon: ShoppingBag, id: 'shopping' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed w-full bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 py-3 mb-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon size={24} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add a spacer div to avoid content going under navbar */}
      <div className="h-[56px]" />
    </>
  );
}
