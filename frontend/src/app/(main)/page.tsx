'use client';
import { Suspense, lazy } from 'react';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';
import PageSkeleton from '@/components/skeleton/HomePageSkeleton';
import {
  BellIcon,
  CameraIcon,
  PaletteIcon,
  StarIcon,
  ThermometerIcon,
  TrophyIcon,
} from '@phosphor-icons/react';
import Header from '@/components/home/Header';
import QuickActions from '@/components/home/QuickActions';
import TodaysOutfit from '@/components/home/TodaysOutfit';
import ActiveChallenges from '@/components/home/ActiveChallenges';

/**
 * The home page component.
 *
 * This component is protected by the {@link ProtectedRoute} component, meaning
 * that it will only be rendered if the user is logged in. It renders a welcome
 * card, a section of curated styles, and a section of trending styles.
 *
 * The component uses the {@link Suspense} component to handle loading states.
 * When the component is first rendered, it will render a skeleton page until
 * the data has been fetched from the server. Once the data has been fetched, it
 * will render the actual content.
 *
 * @returns The home page component.
 */
export default function Home() {
  const wardrobeItems = [
    {
      id: 1,
      name: 'Navy Blazer',
      category: 'Outerwear',
      worn: 12,
      image: '🧥',
      color: 'navy',
    },
    {
      id: 2,
      name: 'White Blouse',
      category: 'Tops',
      worn: 8,
      image: '👔',
      color: 'white',
    },
    {
      id: 3,
      name: 'Black Jeans',
      category: 'Bottoms',
      worn: 25,
      image: '👖',
      color: 'black',
    },
    {
      id: 4,
      name: 'Summer Dress',
      category: 'Dresses',
      worn: 3,
      image: '👗',
      color: 'floral',
    },
    {
      id: 5,
      name: 'Sneakers',
      category: 'Shoes',
      worn: 18,
      image: '👟',
      color: 'white',
    },
    {
      id: 6,
      name: 'Leather Boots',
      category: 'Shoes',
      worn: 7,
      image: '🥾',
      color: 'brown',
    },
  ];

  const Loader = () => {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader />}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <Header />

          {/* Today's Outfit */}
          <TodaysOutfit />

          {/* Quick Actions */}
          <QuickActions />

          {/* Active Challenges */}
          <ActiveChallenges />
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}
