'use client';
import { Suspense } from 'react';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';
import PageSkeleton from '@/components/skeleton/HomePageSkeleton';
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
  const Loader = () => {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center min-h-[50vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading your style...
        </p>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader />}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          {/* Main Content Container */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-6 pb-safe">
              {/* Header */}
              <div className="pt-4 sm:pt-6">
                <Header />
              </div>

              {/* Today's Outfit */}
              <section className="space-y-4">
                <TodaysOutfit />
              </section>

              {/* Quick Actions */}
              <section className="space-y-4">
                <QuickActions />
              </section>

              {/* Active Challenges */}
              <section className="space-y-4">
                <ActiveChallenges />
              </section>
            </div>
          </div>
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}
