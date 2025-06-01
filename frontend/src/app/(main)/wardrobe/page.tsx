'use client';

import { Suspense } from 'react';
import WardrobeSection from '@/components/WardrobeSection';

export default function Wardrobe() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>{' '}
        </div>
      }
    >
      <WardrobeSection />
    </Suspense>
  );
}
