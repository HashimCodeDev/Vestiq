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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-2xl">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <div
            className={`w-full h-52 flex items-center justify-center relative ${
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
            <div className="w-24 h-36 bg-white/30 dark:bg-black/30 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <UserIcon className="w-10 h-10 text-white/80" />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Discount badge */}
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-2 py-1 rounded-lg shadow-lg animate-pulse"
          >
            {item.discount}
          </Badge>

          {/* Favorite button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <span className="text-sm">❤️</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              {item.brand}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {item.rating} ({item.reviews})
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${item.salePrice.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-2 py-1 rounded-md">
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

        {/* Header */}
        <div className="relative z-10 pt-6 pb-4 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-2 animate-fade-in-up">
              <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <span>🛍️</span>
                Shopping
              </h1>
              <p className="text-sm text-muted-foreground">
                Discover trending fashion pieces
              </p>
            </div>
          </div>
        </div>

        {/* Clothing Grid */}
        <div className="relative z-10 max-w-md mx-auto px-4 pb-20">
          <div className="grid grid-cols-2 gap-4">
            {clothingItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
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
