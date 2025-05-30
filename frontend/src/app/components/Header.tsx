'use client';

import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
      {/* CENTERED TITLE */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
        {title}
      </h1>

      {/* RIGHT ICON */}
      <div className="ml-auto absolute right-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <User size={30} />
        </button>
      </div>
    </div>
  );
}
