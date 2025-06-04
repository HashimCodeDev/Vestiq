'use client';

import { Suspense, useEffect, useState, lazy } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import WardrobePageSkeleton from '@/components/skeleton/WardrobePageSkeleton';

const WardrobeGrid = lazy(() => import('@/components/WardrobeGrid'));

export default function Wardrobe() {
  const [outfitItems, setOutfitItems] = useState<string[]>([]);

  useEffect(() => {
    setOutfitItems([
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80',
    ]);
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Suspense fallback={<WardrobePageSkeleton />}>
          <WardrobeGrid outfitItems={outfitItems} />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
