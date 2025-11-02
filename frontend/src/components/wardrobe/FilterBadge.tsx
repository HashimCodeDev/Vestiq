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
    <div className="w-full mb-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4 lg:hidden">
          <h3 className="text-base font-semibold mb-1">
            Filter by Category
          </h3>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="ml-1 mr-1">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/3 sm:basis-1/4 flex justify-center"
              >
                <Badge
                  className={`w-full min-w-[80px] h-12 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                    activeIndex === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card hover:bg-accent'
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
