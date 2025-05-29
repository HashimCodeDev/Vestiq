// app/page.tsx
import { Suspense } from 'react';
import WelcomeCard from './components/WelcomeCard';
// import WardrobeSection from './components/WardrobeSection';
// import TrendingSection from './components/TrendingSection';
// import ClothingGrid from './components/ClothingGrid';

export default function Home() {
  return (
    <div>
      <div className="block max-w-md h-[7.5rem] p-0 mask-origin-border bg-[#C78E58] rounded-xl shadow-sm">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hi ✋ Olivia Bennett,
          <br />
          Welcome!{' '}
        </h5>
        <p className="font-normal text-white ">
          Discover new outfits and trends today{' '}
        </p>
      </div>
    </div>
  );
}
