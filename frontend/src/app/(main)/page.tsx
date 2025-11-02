'use client';
import { Suspense } from 'react';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';
import Header from '@/components/home/Header';
import QuickActions from '@/components/home/QuickActions';
import TodaysOutfit from '@/components/home/TodaysOutfit';
import ActiveChallenges from '@/components/home/ActiveChallenges';

/**
 * Enhanced home page component with modern UI design.
 *
 * Features:
 * - Animated background with floating elements
 * - Staggered animations for smooth content reveal
 * - Glass morphism effects and modern gradients
 * - Responsive design with improved spacing
 * - Enhanced loading states with multiple animation layers
 *
 * @returns The enhanced home page component.
 */
export default function Home() {
  const Loader = () => {
    return (
      <div className="flex-col gap-8 w-full flex items-center justify-center min-h-[70vh] animate-fade-in">
        <div className="relative">
          {/* Enhanced loading indicator with glow effect */}
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-glow" />
          <div className="absolute inset-2 w-12 h-12 border-2 border-primary/10 border-b-primary/50 rounded-full animate-spin animation-delay-300" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="text-center space-y-3">
          <p className="text-xl font-semibold text-gradient">
            Loading your style...
          </p>
          <p className="text-base text-muted-foreground">
            Curating the perfect look for you ✨
          </p>
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader />}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background/98 to-primary/5 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-1000" />
            <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-secondary/5 rounded-full blur-3xl animate-float animation-delay-2000" />
          </div>
          
          {/* Main Content Container */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-10 pb-safe">
              {/* Header */}
              <div className="pt-8 sm:pt-12">
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
