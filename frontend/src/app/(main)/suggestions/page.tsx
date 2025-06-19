'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ThumbsUpIcon, ThumbsDownIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';

interface OutfitItem {
  id: string;
  type: string;
  image: string;
  alt: string;
}

interface StyleSuggestion {
  id: string;
  title: string;
  subtitle: string;
  items: OutfitItem[];
  likes: number;
  dislikes: number;
}

const SuggestionsPage = () => {
  const [likedSuggestions, setLikedSuggestions] = useState<{
    [key: string]: boolean;
  }>({});
  const [dislikedSuggestions, setDislikedSuggestions] = useState<{
    [key: string]: boolean;
  }>({});

  const handleLike = (id: string) => {
    setLikedSuggestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setDislikedSuggestions((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleDislike = (id: string) => {
    setDislikedSuggestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setLikedSuggestions((prev) => ({
      ...prev,
      [id]: false,
    }));

    // Optional: update backend or local dislike count here
  };

  const suggestions: StyleSuggestion[] = [
    {
      id: '1',
      title: 'Casual Weekend',
      subtitle: 'Effortless Comfort',
      items: [
        {
          id: '1b',
          type: 'top',
          image:
            'https://i.pinimg.com/736x/e5/bd/ea/e5bdea21c7ea45a4d040e19b6432b490.jpg',
          alt: 'Cream top',
        },
        {
          id: '1c',
          type: 'bag',
          image:
            'https://i.pinimg.com/736x/94/f1/95/94f19532ca71d3736248e08a1a35708c.jpg',
          alt: 'Tan leather bag',
        },
        {
          id: '1d',
          type: 'jeans',
          image:
            'https://i.pinimg.com/736x/bc/6c/d9/bc6cd914561b41e9f66b3f079698729e.jpg',
          alt: 'Dark jeans',
        },
        {
          id: '1e',
          type: 'top',
          image:
            'https://i.pinimg.com/736x/76/d4/5d/76d45d02b81d5898db96cc9e1757c092.jpg',
          alt: 'Beige sweater',
        },
      ],
      likes: 24,
      dislikes: 3,
    },
    {
      id: '2',
      title: 'Business Casual',
      subtitle: 'Smart Sophistication',
      items: [
        {
          id: '2a',
          type: 'shirt',
          image:
            'https://i.pinimg.com/736x/45/58/f4/4558f4221e7d45789eabba479751b078.jpg',
          alt: 'Light blue shirt',
        },
        {
          id: '2b',
          type: 'top',
          image:
            'https://i.pinimg.com/736x/99/41/c1/9941c1e86b92dfa1e553b8cdfc6d549d.jpg',
          alt: 'White blouse',
        },
        {
          id: '2c',
          type: 'belt',
          image:
            'https://i.pinimg.com/736x/22/a1/96/22a196edf3ddf6b9494452800b8a4abc.jpg',
          alt: 'Brown leather belt',
        },
        {
          id: '2e',
          type: 'jeans',
          image:
            'https://i.pinimg.com/736x/7c/4f/c1/7c4fc163fffd518d60ec68f193cfa751.jpg',
          alt: 'Light wash jeans',
        },
      ],
      likes: 31,
      dislikes: 1,
    },
    {
      id: '3',
      title: 'Smart Casual',
      subtitle: 'Versatile Elegance',
      items: [
        {
          id: '3a',
          type: 'shirt',
          image:
            'https://i.pinimg.com/736x/79/22/4f/79224ffb6dc4d705ccc20f98e229805e.jpg',
          alt: 'Striped shirt',
        },
        {
          id: '3b',
          type: 'pants',
          image:
            'https://i.pinimg.com/736x/39/f5/b5/39f5b5113b509c863030518654968d71.jpg',
          alt: 'Khaki trousers',
        },
        {
          id: '3c',
          type: 'top',
          image:
            'https://i.pinimg.com/736x/27/ff/13/27ff13954ae4accc2a00bd804ac597e0.jpg',
          alt: 'White tank top',
        },
      ],
      likes: 18,
      dislikes: 2,
    },
  ];

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
        <div className="relative z-10 bg-white/50 dark:bg-black/50 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-lg">
          <div className="max-w-md mx-auto px-6 py-6">
            <div className="flex items-center justify-between animate-fade-in-up">
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span>✨</span>
                  Style Suggestions
                </h1>
                <p className="text-sm text-muted-foreground">
                  Curated looks just for you
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-orange-100 dark:ring-orange-900/30">
                  <span className="text-white text-lg font-bold">O</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-black animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-8">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className="bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/30 dark:border-white/10 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Outfit Grid */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {suggestion.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="group aspect-square bg-white/50 dark:bg-black/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        animationDelay: `${index * 200 + itemIndex * 100}ms`,
                      }}
                    >
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={120}
                          height={120}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        {/* Item type badge */}
                        <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs font-medium text-foreground capitalize">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Title and Subtitle */}
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {suggestion.title}
                  </h3>
                  <p className="text-muted-foreground text-sm bg-white/30 dark:bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                    {suggestion.subtitle}
                  </p>
                </div>

                {/* View Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <span className="flex items-center justify-center gap-2">
                    <span>Try This Look</span>
                    <span>👗</span>
                  </span>
                </button>
              </div>

              {/* Interaction Bar */}
              <div className="flex items-center justify-center gap-4 px-8 py-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm border-t border-white/20 dark:border-white/10">
                <Button
                  variant="ghost"
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    likedSuggestions[suggestion.id]
                      ? 'text-green-600 bg-green-50 dark:bg-green-950/20 shadow-lg'
                      : 'text-muted-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20'
                  }`}
                  onClick={() => handleLike(suggestion.id)}
                >
                  <ThumbsUpIcon
                    className="w-5 h-5"
                    weight={
                      likedSuggestions[suggestion.id] ? 'fill' : 'regular'
                    }
                  />
                  <span className="font-medium">{suggestion.likes}</span>
                  <span className="text-xs">Love it</span>
                </Button>

                <div className="w-px h-8 bg-border" />

                <Button
                  variant="ghost"
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    dislikedSuggestions[suggestion.id]
                      ? 'text-red-600 bg-red-50 dark:bg-red-950/20 shadow-lg'
                      : 'text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                  }`}
                  onClick={() => handleDislike(suggestion.id)}
                >
                  <ThumbsDownIcon
                    className="w-5 h-5"
                    weight={
                      dislikedSuggestions[suggestion.id] ? 'fill' : 'regular'
                    }
                  />
                  <span className="font-medium">{suggestion.dislikes}</span>
                  <span className="text-xs">Not for me</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SuggestionsPage;
