// app/page.tsx
import { Suspense } from 'react';
import WelcomeCard from './components/WelcomeCard';
import WardrobeSection from './components/WardrobeSection';
import TrendingSection from './components/TrendingSection';

export default function Home() {
  return (
    <div>
      <WelcomeCard />
      <Suspense fallback={<div>Loading...</div>}>
        <WardrobeSection />
        <TrendingSection />
      </Suspense>
    </div>
  );
}
