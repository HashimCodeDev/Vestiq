import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useState } from 'react';

export default function FilterBadge() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories = [
    { name: 'All', icon: '👗' },
    { name: 'Tops', icon: '👕' },
    { name: 'Bottoms', icon: '👖' },
    { name: 'Dresses', icon: '👗' },
    { name: 'Accessories', icon: '👜' },
  ];

  return (
    <div className="w-full mb-6 px-4 animate-fade-in-up animation-delay-200">
      <div className="max-w-md mx-auto">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
          Filter by Category
        </h3>
        <Carousel className="w-full">
          <CarouselContent className="ml-2 mr-2">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/3 sm:basis-1/4 flex justify-center"
              >
                <Badge
                  className={`w-full min-w-[80px] h-12 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    activeIndex === index
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-white/60 dark:bg-black/40 text-foreground hover:bg-white/80 dark:hover:bg-black/60 backdrop-blur-sm border border-white/30 dark:border-white/20'
                  }`}
                  variant="default"
                  onClick={() =>
                    setActiveIndex((prevIndex) =>
                      prevIndex === index ? null : index,
                    )
                  }
                >
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-xs font-medium">{category.name}</span>
                </Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
