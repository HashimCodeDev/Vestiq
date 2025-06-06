'use client';

import { Suspense, useEffect, useState, lazy, useRef } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import WardrobePageSkeleton from '@/components/skeleton/WardrobePageSkeleton';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

const WardrobeGrid = lazy(() => import('@/components/WardrobeGrid'));

/**
 * Wardrobe component that displays a grid of outfit items fetched from the server.
 * Utilizes lazy loading and suspense for smooth loading experience.
 *
 * - Fetches wardrobe items from the server using the user's token.
 * - Displays a button to add a new outfit.
 * - Uses `ProtectedRoute` to ensure authentication.
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
