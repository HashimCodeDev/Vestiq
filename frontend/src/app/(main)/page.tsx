'use client';
import { Suspense, lazy } from 'react';
import WelcomeCard from '@/components/WelcomeCard';
import TrendingSection from '@/components/TrendingSection';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';
import PageSkeleton from '@/components/skeleton/HomePageSkeleton';
import {
  BellIcon,
  CameraIcon,
  PaletteIcon,
  StarIcon,
  ThermometerIcon,
  TrophyIcon,
} from '@phosphor-icons/react';

const WardrobeSection = lazy(() => import('@/components/WardrobeSection'));

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
  const wardrobeItems = [
    {
      id: 1,
      name: 'Navy Blazer',
      category: 'Outerwear',
      worn: 12,
      image: '🧥',
      color: 'navy',
    },
    {
      id: 2,
      name: 'White Blouse',
      category: 'Tops',
      worn: 8,
      image: '👔',
      color: 'white',
    },
    {
      id: 3,
      name: 'Black Jeans',
      category: 'Bottoms',
      worn: 25,
      image: '👖',
      color: 'black',
    },
    {
      id: 4,
      name: 'Summer Dress',
      category: 'Dresses',
      worn: 3,
      image: '👗',
      color: 'floral',
    },
    {
      id: 5,
      name: 'Sneakers',
      category: 'Shoes',
      worn: 18,
      image: '👟',
      color: 'white',
    },
    {
      id: 6,
      name: 'Leather Boots',
      category: 'Shoes',
      worn: 7,
      image: '🥾',
      color: 'brown',
    },
  ];

  const todaysOutfit = {
    weather: '22°C, Sunny',
    mood: 'Professional',
    items: ['Navy Blazer', 'White Blouse', 'Black Jeans', 'Leather Boots'],
    confidence: 95,
  };

  const challenges = [
    { id: 1, title: 'Monochrome Monday', progress: 75, reward: '50 pts' },
    { id: 2, title: 'Sustainable Style', progress: 40, reward: '100 pts' },
    { id: 3, title: 'Color Pop Week', progress: 20, reward: '75 pts' },
  ];

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good Morning, Sarah! ☀️
            </h1>
            <p className="text-gray-600">Level 3: Sartorial Sorcerer ✨</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <BellIcon className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Today's Outfit */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Today's Perfect Match
            </h2>
            <div className="flex items-center space-x-2">
              <ThermometerIcon className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {todaysOutfit.weather}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4">
            <div className="grid grid-cols-4 gap-3">
              {todaysOutfit.items.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl">
                      {item.includes('Blazer')
                        ? '🧥'
                        : item.includes('Blouse')
                          ? '👔'
                          : item.includes('Jeans')
                            ? '👖'
                            : '🥾'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">
                Confidence: {todaysOutfit.confidence}%
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Shuffle
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                I Love It!
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CameraIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Add Items</p>
                <p className="text-sm text-gray-600">Snap & categorize</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <PaletteIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Outfit Builder</p>
                <p className="text-sm text-gray-600">Mix & match</p>
              </div>
            </div>
          </button>
        </div>

        {/* Active Challenges */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Active Challenges
            </h3>
            <TrophyIcon className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-xl p-4 shadow-sm border"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {challenge.title}
                  </span>
                  <span className="text-sm text-purple-600 font-medium">
                    {challenge.reward}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
