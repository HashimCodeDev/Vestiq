'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  SparkleIcon,
  TrendUpIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  ShuffleIcon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  category: string;
  tags: string[];
  trending?: boolean;
}

const SuggestionsPage = () => {
  const [likedSuggestions, setLikedSuggestions] = useState<{
    [key: string]: boolean;
  }>({});
  const [dislikedSuggestions, setDislikedSuggestions] = useState<{
    [key: string]: boolean;
  }>({});
  const [savedSuggestions, setSavedSuggestions] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
  };

  const handleSave = (id: string) => {
    setSavedSuggestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const suggestions: StyleSuggestion[] = [
    {
      id: '1',
      title: 'Casual Weekend',
      subtitle: 'Effortless Comfort',
      category: 'casual',
      tags: ['Relaxed', 'Everyday', 'Comfortable'],
      trending: true,
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
      category: 'business',
      tags: ['Professional', 'Polished', 'Office'],
      trending: false,
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
      category: 'smart-casual',
      tags: ['Versatile', 'Chic', 'Modern'],
      trending: true,
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

  const categories = [
    { id: 'all', label: 'All Styles', icon: '✨' },
    { id: 'casual', label: 'Casual', icon: '👕' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'smart-casual', label: 'Smart Casual', icon: '👔' },
  ];

  const filteredSuggestions =
    selectedCategory === 'all'
      ? suggestions
      : suggestions.filter((s) => s.category === selectedCategory);

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
          <div className="max-w-md mx-auto px-6 py-6 space-y-4">
            <div className="flex items-center justify-between animate-fade-in-up">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <SparkleIcon className="w-6 h-6 text-primary" weight="fill" />
                  Style Suggestions
                </h1>
                <p className="text-sm text-muted-foreground">
                  Curated looks just for you
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-105 transition-transform duration-200"
                onClick={() => {
                  /* Shuffle suggestions */
                }}
              >
                <ShuffleIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-fade-in-up animation-delay-200">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  size="sm"
                  className={`rounded-full whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'shadow-lg scale-105'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
          {filteredSuggestions.length === 0 ? (
            <div className="text-center py-12 animate-fade-in-up">
              <p className="text-muted-foreground text-lg">
                No suggestions found for this category
              </p>
            </div>
          ) : (
            filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className="group bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/40 dark:border-white/10 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] animate-fade-in-up relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Trending Badge */}
                {suggestion.trending && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg flex items-center gap-1 px-3 py-1.5">
                      <TrendUpIcon className="w-3.5 h-3.5" weight="bold" />
                      <span className="text-xs font-semibold">Trending</span>
                    </Badge>
                  </div>
                )}

                {/* Outfit Grid */}
                <div className="p-6">
                  {/* Title and Tags */}
                  <div className="mb-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-1.5">
                          {suggestion.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {suggestion.subtitle}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full transition-all duration-200 ${
                          savedSuggestions[suggestion.id]
                            ? 'text-pink-600 hover:text-pink-700 scale-110'
                            : 'text-muted-foreground hover:text-pink-600'
                        }`}
                        onClick={() => handleSave(suggestion.id)}
                      >
                        <BookmarkIcon
                          className="w-5 h-5"
                          weight={
                            savedSuggestions[suggestion.id] ? 'fill' : 'regular'
                          }
                        />
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {suggestion.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {suggestion.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="group/item aspect-square bg-gradient-to-br from-white/60 to-white/40 dark:from-black/60 dark:to-black/40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 dark:border-white/5"
                        style={{
                          animationDelay: `${index * 150 + itemIndex * 80}ms`,
                        }}
                      >
                        <div className="relative w-full h-full overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.alt}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full group-hover/item:scale-110 transition-transform duration-500"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                          {/* Item type badge */}
                          <div className="absolute bottom-1.5 left-1.5 right-1.5">
                            <div className="bg-white/95 dark:bg-black/95 backdrop-blur-sm px-2 py-1 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 shadow-lg">
                              <span className="text-[10px] font-semibold text-foreground capitalize block truncate">
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg">
                    <span className="flex items-center justify-center gap-2">
                      <SparkleIcon className="w-5 h-5" weight="fill" />
                      <span>Try This Look</span>
                    </span>
                  </Button>
                </div>

                {/* Interaction Bar */}
                <div className="flex items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-white/40 to-white/30 dark:from-black/40 dark:to-black/30 backdrop-blur-sm border-t border-white/30 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                        likedSuggestions[suggestion.id]
                          ? 'text-green-600 bg-green-50 dark:bg-green-950/30 shadow-md'
                          : 'text-muted-foreground hover:text-green-600 hover:bg-green-50/50 dark:hover:bg-green-950/20'
                      }`}
                      onClick={() => handleLike(suggestion.id)}
                    >
                      <HeartIcon
                        className="w-4 h-4"
                        weight={
                          likedSuggestions[suggestion.id] ? 'fill' : 'regular'
                        }
                      />
                      <span className="font-semibold text-sm">
                        {suggestion.likes +
                          (likedSuggestions[suggestion.id] ? 1 : 0)}
                      </span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                        dislikedSuggestions[suggestion.id]
                          ? 'text-red-600 bg-red-50 dark:bg-red-950/30 shadow-md'
                          : 'text-muted-foreground hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20'
                      }`}
                      onClick={() => handleDislike(suggestion.id)}
                    >
                      <ThumbsDownIcon
                        className="w-4 h-4"
                        weight={
                          dislikedSuggestions[suggestion.id]
                            ? 'fill'
                            : 'regular'
                        }
                      />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  >
                    <ShareIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Share</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SuggestionsPage;
