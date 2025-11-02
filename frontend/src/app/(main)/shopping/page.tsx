'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserIcon } from '@phosphor-icons/react';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';

interface ClothingItem {
  id: number;
  name: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  color: string;
}

const clothingItems: ClothingItem[] = [
  {
    id: 1,
    name: 'Urban Threads',
    brand: 'Basic Tee',
    originalPrice: 5.12,
    salePrice: 3.5,
    discount: '-32%',
    rating: 4.2,
    reviews: 112,
    image: '/api/placeholder/150/200',
    color: 'white',
  },
  {
    id: 2,
    name: 'Ocean Blue Apparel',
    brand: 'Button Shirt',
    originalPrice: 42.5,
    salePrice: 34.0,
    discount: '-20%',
    rating: 4.5,
    reviews: 89,
    image: '/api/placeholder/150/200',
    color: 'blue',
  },
  {
    id: 3,
    name: 'Midnight Style',
    brand: 'Classic Tee',
    originalPrice: 48.99,
    salePrice: 30,
    discount: '-25%',
    rating: 4.1,
    reviews: 67,
    image: '/api/placeholder/150/200',
    color: 'black',
  },
  {
    id: 4,
    name: 'Ash Grey Basics',
    brand: 'Comfort Tee',
    originalPrice: 45.0,
    salePrice: 31.5,
    discount: '-30%',
    rating: 4.3,
    reviews: 145,
    image: '/api/placeholder/150/200',
    color: 'grey',
  },
  {
    id: 5,
    name: 'Emerald Green Co.',
    brand: 'Casual Tee',
    originalPrice: 44,
    salePrice: 34.44,
    discount: '-18%',
    rating: 4.6,
    reviews: 203,
    image: '/api/placeholder/150/200',
    color: 'green',
  },
  {
    id: 6,
    name: 'Crimson Tide Wear',
    brand: 'Premium Tee',
    originalPrice: 37.44,
    salePrice: 29.95,
    discount: '-22%',
    rating: 4.3,
    reviews: 156,
    image: '/api/placeholder/150/200',
    color: 'red',
  },
];

const ClothingCard: React.FC<{ item: ClothingItem }> = ({ item }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.05] border-0 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-lg">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <div
            className={`w-full h-56 flex items-center justify-center relative transition-all duration-500 ${
              item.color === 'white'
                ? 'bg-gradient-to-br from-gray-100 to-gray-200'
                : item.color === 'blue'
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                  : item.color === 'black'
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                    : item.color === 'grey'
                      ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                      : item.color === 'green'
                        ? 'bg-gradient-to-br from-green-500 to-green-700'
                        : 'bg-gradient-to-br from-red-400 to-red-600'
            }`}
          >
            {/* Enhanced placeholder for model image */}
            <div className="w-28 h-40 bg-white/30 dark:bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
              <UserIcon
                className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform duration-500"
                weight="duotone"
              />
            </div>

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
          </div>

          {/* Enhanced discount badge */}
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1.5 rounded-xl shadow-xl animate-pulse border-2 border-white/30"
          >
            {item.discount}
          </Badge>

          {/* Enhanced favorite button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
            <div className="w-9 h-9 bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer border border-white/30">
              <span className="text-base hover:scale-110 transition-transform">
                ❤️
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground font-semibold">
              {item.brand}
            </p>
          </div>

          {/* Enhanced Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm transition-all duration-300 ${i < Math.floor(item.rating) ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300 dark:text-gray-600'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {item.rating}{' '}
              <span className="text-[10px]">({item.reviews})</span>
            </span>
          </div>

          {/* Enhanced Pricing */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ${item.salePrice.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 px-2.5 py-1.5 rounded-lg shadow-md border border-green-200/50 dark:border-green-800/50">
              Save ${(item.originalPrice - item.salePrice).toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ShoppingPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/3 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/3 rounded-full blur-2xl animate-float animation-delay-1000" />
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent/3 rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>

        {/* Enhanced Header */}
        <div className="relative z-10 pt-8 pb-6 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-3 animate-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-4xl animate-bounce-gentle">🛍️</span>
                <h1 className="text-3xl font-bold text-gradient">Shopping</h1>
              </div>
              <p className="text-base text-muted-foreground font-medium">
                Discover trending fashion pieces curated for you
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Clothing Grid */}
        <div className="relative z-10 max-w-md mx-auto px-4 pb-24">
          <div className="grid grid-cols-2 gap-5">
            {clothingItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <ClothingCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
