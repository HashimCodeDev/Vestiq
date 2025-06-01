'use client';
import { Suspense } from 'react';
import WelcomeCard from '@/components/WelcomeCard';
import WardrobeSection from '@/components/WardrobeSection';
import TrendingSection from '@/components/TrendingSection';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageSkeleton from '@/components/PageSkeleton';

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
