'use client';

import { Suspense, useEffect, useState, lazy } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import WardrobePageSkeleton from '@/components/skeleton/WardrobePageSkeleton';
import { Button } from '@/components/ui/button';
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

interface WardrobeItem {
  _id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  __v: number;
}

export default function Wardrobe() {
  const [outfitItems, setOutfitItems] = useState<string[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchWardrobeItems = async () => {
      if (!token) return;
      try {
        const response = await axios.get('/wardrobe', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data as WardrobeItem[];
        setOutfitItems(data.map((item) => item.imageUrl));
      } catch (error) {
        console.error('Error fetching wardrobe items:', error);
      }
    };
    fetchWardrobeItems();
  }, [token]);

  useEffect(() => {
    console.log('outfitItems:', outfitItems);
  }, [outfitItems]);

  return (
    <ProtectedRoute>
      <div>
        <Suspense fallback={<WardrobePageSkeleton />}>
          <div className="fixed right-0 bottom-0 z-40">
            <Button>Add Outfit</Button>
          </div>
          <WardrobeGrid outfitItems={outfitItems} />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
