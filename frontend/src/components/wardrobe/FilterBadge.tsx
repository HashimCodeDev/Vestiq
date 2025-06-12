import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useState } from 'react';

export default function FilterBadge() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <Carousel className="w-full max-w-sm mb-4">
      <CarouselContent className="ml-5 mr-5 gap-10">
        {['Top', 'Shirt', 'Pants', 'Bottom', 'Accessories'].map(
          (item, index) => (
            <CarouselItem
              key={index}
              className={`pl-1 basis-1/5 flex justify-center ${
                activeIndex === index ? 'scale-110' : 'opacity-70'
              }`}
              onClick={() =>
                setActiveIndex((prevIndex) =>
                  prevIndex === index ? null : index,
                )
              }
            >
              <Badge
                className={`w-20 font-light transition-all ${
                  activeIndex === index
                    ? 'bg-gray-200 text-black dark:bg-black dark:text-white'
                    : 'bg-gray-50 text-black dark:bg-black/30 dark:text-white'
                }`}
                variant="default"
              >
                {item}
              </Badge>
            </CarouselItem>
          ),
        )}
      </CarouselContent>
    </Carousel>
  );
}
