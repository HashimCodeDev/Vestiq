'use client';

import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/': 'Wearzy',
  '/wardrobe': 'Wardrobe',
  '/suggestions': 'Suggestions',
  '/chat': 'Chat',
  '/shopping': 'Shopping',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

const backButtonRoutes = ['/profile', '/settings'];

export function useHeaderMeta() {
  const pathname = usePathname();

  // Determine title
  let title = 'Wearzy';
  if (pathname === '/') {
    title = 'Wearzy';
  } else if (
    pathname.startsWith('/wardrobe/') &&
    pathname.split('/').length === 3
  ) {
    title = 'Take a look';
  } else if (pathname in titles) {
    title = titles[pathname];
  }

  // Determine if back button should be shown
  const shouldShowBackButton =
    backButtonRoutes.includes(pathname) || pathname.startsWith('/wardrobe/');

  return {
    title,
    shouldShowBackButton,
  };
}
