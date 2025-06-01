'use client';
import { Suspense } from 'react';
import WelcomeCard from '@/components/WelcomeCard';
import WardrobeSection from '@/components/WardrobeSection';
import TrendingSection from '@/components/TrendingSection';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>{' '}
            </div>
          }
        >
          <WelcomeCard />
          <WardrobeSection />
          <TrendingSection />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
