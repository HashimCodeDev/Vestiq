'use client';

import { Suspense, lazy } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import WardrobePageSkeleton from '@/components/skeleton/WardrobePageSkeleton';

const WardrobeGrid = lazy(() => import('@/components/WardrobeGrid'));

/**
 * Wardrobe component that displays a grid of outfit items.
 *
 * This component is protected by the {@link ProtectedRoute} component,
 * ensuring that it can only be accessed by authenticated users. It uses
 * the {@link Suspense} component to handle loading states, displaying a
 * skeleton page while the {@link WardrobeGrid} component is being lazy-loaded.
 *
 * @returns A JSX element representing the wardrobe page.
 */

export default function Wardrobe() {
  return (
    <ProtectedRoute>
      <div>
        <Suspense fallback={<WardrobePageSkeleton />}>
          <WardrobeGrid />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
