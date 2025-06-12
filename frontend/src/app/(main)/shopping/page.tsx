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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <div
            className={`w-full h-48 flex items-center justify-center ${
              item.color === 'white'
                ? 'bg-gray-100'
                : item.color === 'blue'
                  ? 'bg-blue-500'
                  : item.color === 'black'
                    ? 'bg-gray-900'
                    : item.color === 'grey'
                      ? 'bg-gray-400'
                      : item.color === 'green'
                        ? 'bg-green-600'
                        : 'bg-red-500'
            }`}
          >
            {/* Placeholder for model image */}
            <div className="w-20 h-32 bg-white/20 rounded-lg flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-white/70" />
            </div>
          </div>
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 bg-red-500 text-white font-semibold"
          >
            {item.discount}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm text-foreground mb-1">
            {item.name}
          </h3>
          <p className="text-xs text-foreground mb-2">{item.brand}</p>

          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400">★</span>
            <span className="text-xs text-gray-600">
              {item.rating} ★ ({item.reviews})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">
              ${item.salePrice.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ShoppingPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Clothing Grid */}
        <div className="max-w-md mx-auto px-4 pb-20">
          <div className="grid grid-cols-2 gap-4">
            {clothingItems.map((item) => (
              <ClothingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
