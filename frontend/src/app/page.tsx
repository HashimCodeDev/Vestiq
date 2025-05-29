// app/page.tsx
import { Suspense } from 'react';
import WelcomeCard from './components/WelcomeCard';
// import WardrobeSection from './components/WardrobeSection';
// import TrendingSection from './components/TrendingSection';
// import ClothingGrid from './components/ClothingGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Main Content */}
        <div className="h-full p-10 space-y-6">
          <WelcomeCard />
          {/* <WardrobeSection />
           <TrendingSection /> */}
        </div>

        {/* Clothing Grid */}
        <div className="p-4">
          {/* <Suspense
            fallback={<div className="text-center py-8">Loading...</div>}
          >
            <ClothingGrid />
          </Suspense> */}
        </div>
      </div>
    </div>
  );
}
