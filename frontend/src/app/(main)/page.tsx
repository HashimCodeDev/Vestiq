'use client';
import { Suspense, lazy } from 'react';
import WelcomeCard from '@/components/WelcomeCard';
import TrendingSection from '@/components/TrendingSection';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageSkeleton from '@/components/skeleton/HomePageSkeleton';

const WardrobeSection = lazy(() => import('@/components/WardrobeSection'));

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
  return (
    <ProtectedRoute>
      <div>
        <Suspense fallback={<PageSkeleton />}>
          <WelcomeCard />
          <WardrobeSection />
          <TrendingSection />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
