'use client';
import { Suspense } from 'react';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';
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
      <div className="flex-col gap-6 w-full flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          {/* Simple spinning ring - keep only functional loading indicator */}
          <div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">
            Loading your style...
          </p>
          <p className="text-sm text-muted-foreground">
            Curating the perfect look for you ✨
          </p>
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader />}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10">
          {/* Main Content Container */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8 pb-safe">
              {/* Header */}
              <div className="pt-6 sm:pt-8">
                <Header />
              </div>

              {/* Today's Outfit */}
              <section>
                <TodaysOutfit />
              </section>

              {/* Quick Actions */}
              <section>
                <QuickActions />
              </section>

              {/* Active Challenges */}
              <section>
                <ActiveChallenges />
              </section>
            </div>
          </div>
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}
