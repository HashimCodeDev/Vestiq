import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export default function TrendingSection() {
  const carouselItems = [
    'https://i.pinimg.com/736x/92/f2/6e/92f26ef8411fdfb284e2b0fa773ee13e.jpg',
    'https://i.pinimg.com/736x/86/b2/ba/86b2ba24874a08a00ac0b01a518bd56b.jpg',
    'https://i.pinimg.com/736x/cf/64/ff/cf64ff0d45268609266ed17244f53c80.jpg',
    'https://i.pinimg.com/736x/85/98/69/859869086499cde08c6633d1d26b5a42.jpg',
    'https://i.pinimg.com/736x/09/de/98/09de9831f16476cafa75c3cc9ea5047b.jpg',
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h2 className="font-bold mb-4">Picked for you</h2>
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <span className="text-2xl font-semibold">
                      <Image
                        src={item}
                        alt={`Wardrobe item ${index + 1}`}
                        width={200}
                        height={400}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
