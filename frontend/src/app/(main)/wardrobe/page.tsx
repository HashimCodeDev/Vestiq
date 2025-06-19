'use client';

import { Suspense, lazy } from 'react';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';
import WardrobePageSkeleton from '@/components/skeleton/WardrobePageSkeleton';

const WardrobeGrid = lazy(() => import('@/components/wardrobe/WardrobeGrid'));

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
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/3 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/3 rounded-full blur-2xl animate-float animation-delay-1000" />
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent/3 rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-6 pb-4 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-2 animate-fade-in-up">
              <h1 className="text-2xl font-bold text-foreground">
                My Wardrobe
              </h1>
              <p className="text-sm text-muted-foreground">
                Organize and discover your style
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <Suspense fallback={<WardrobePageSkeleton />}>
            <WardrobeGrid />
          </Suspense>
        </div>
      </div>
    </ProtectedRoute>
  );
}
