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
      <div className="flex-col gap-6 w-full flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          </div>
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>
          {/* Decorative sparkles */}
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/60 rounded-full animate-ping" />
          <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-primary/40 rounded-full animate-ping animation-delay-300" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground animate-pulse">
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
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-float animation-delay-1000" />
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-2000" />
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8 pb-safe">
              {/* Header */}
              <div className="pt-6 sm:pt-8 animate-fade-in-up">
                <Header />
              </div>

              {/* Today's Outfit */}
              <section className="animate-fade-in-up animation-delay-200">
                <TodaysOutfit />
              </section>

              {/* Quick Actions */}
              <section className="animate-fade-in-up animation-delay-400">
                <QuickActions />
              </section>

              {/* Active Challenges */}
              <section className="animate-fade-in-up animation-delay-600">
                <ActiveChallenges />
              </section>
            </div>
          </div>
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}
