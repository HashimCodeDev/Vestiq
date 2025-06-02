'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ThumbsUpIcon, ThumbsDownIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              Good Evening, Olivia
            </h1>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-foreground text-sm font-medium">O</span>
            </div>
          </div>
          <p className="text-foreground text-sm mt-1">
            Picks Based on Your Style
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-background rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Outfit Grid */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {suggestion.items.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square bg-background rounded-lg overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={120}
                        height={120}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Title and Subtitle */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {suggestion.title}
                </h3>
                <p className="text-gray-600 text-sm">{suggestion.subtitle}</p>
              </div>

              {/* View Button */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-foreground font-medium py-3 px-4 rounded-lg transition-colors">
                View
              </button>
            </div>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-background border-t">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 ${
                  likedSuggestions[suggestion.id]
                    ? 'text-red-500'
                    : 'text-foreground'
                } hover:text-red-500 transition-colors`}
                onClick={() => handleLike(suggestion.id)}
              >
                <ThumbsUpIcon
                  className="w-5 h-5"
                  weight={likedSuggestions[suggestion.id] ? 'fill' : 'regular'}
                />
                <span className="text-sm">{suggestion.likes}</span>
              </Button>

              <Button
                variant="ghost"
                className={`flex items-center space-x-2 ${
                  dislikedSuggestions[suggestion.id]
                    ? 'text-red-500'
                    : 'text-foreground'
                } hover:text-red-500 transition-colors`}
                onClick={() => handleDislike(suggestion.id)}
              >
                <ThumbsDownIcon
                  className="w-5 h-5"
                  weight={
                    dislikedSuggestions[suggestion.id] ? 'fill' : 'regular'
                  }
                />
                <span className="text-sm">{suggestion.dislikes}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPage;
