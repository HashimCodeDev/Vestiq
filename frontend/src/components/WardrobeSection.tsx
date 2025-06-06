//Wardrobe Section of Home Page

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import FilterBadge from '@/components/FilterBadge';

export default function WardrobeSection() {
  const router = useRouter();

  const carouselItems = [
    {
      src: 'https://i.pinimg.com/736x/92/f2/6e/92f26ef8411fdfb284e2b0fa773ee13e.jpg',
      title: 'Item 1',
    },
    {
      src: 'https://i.pinimg.com/736x/86/b2/ba/86b2ba24874a08a00ac0b01a518bd56b.jpg',
      title: 'Item 2',
    },
    {
      src: 'https://i.pinimg.com/736x/cf/64/ff/cf64ff0d45268609266ed17244f53c80.jpg',
      title: 'Item 3',
    },
    {
      src: 'https://i.pinimg.com/736x/85/98/69/859869086499cde08c6633d1d26b5a42.jpg',
      title: 'Item 4',
    },
    {
      src: 'https://i.pinimg.com/736x/09/de/98/09de9831f16476cafa75c3cc9ea5047b.jpg',
      title: 'Item 5',
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Outfit Gallery</h2>
      <FilterBadge />
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <Image
                      src={item.src}
                      width={200}
                      height={400}
                      alt={`Wardrobe item ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
                <div className="mt-2 text-center text-xs text-black dark:text-white font-jakarta font-thin">
                  {item.title}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center">
        <Button
          className="mt-4 bg-gray-200 text-black dark:bg-black/70 dark:text-white"
          onClick={() => {
            router.push('/wardrobe');
          }}
        >
          <ArrowRightIcon size={16} />
          Explore my Wardrobe
        </Button>
      </div>
    </div>
  );
}
