import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

export default function TrendingSection() {
  const router = useRouter();
  const carouselItems = [
    {
      src: 'https://i.pinimg.com/736x/87/1a/56/871a56c23b69cbd0b0f820fedd24a946.jpg',
      title: 'Smart Casual',
    },
    {
      src: 'https://i.pinimg.com/736x/0a/7d/32/0a7d325991e8320a25254b901d975f3c.jpg',
      title: 'Wedding Ready',
    },
    {
      src: 'https://i.pinimg.com/736x/a0/1b/bc/a01bbca57f3056a2c9c3a7ef0f62f55a.jpg',
      title: 'Corporate Clean',
    },
    {
      src: 'https://i.pinimg.com/736x/d8/2f/7c/d82f7c6efcf0528542d8688a0016be11.jpg',
      title: 'Casual Clean',
    },
    {
      src: 'https://i.pinimg.com/736x/31/05/c8/3105c80d543d87dfa35f5479ddeeb174.jpg',
      title: 'Date Night',
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h2 className="font-bold mb-4">Curated Styles For You</h2>
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="m-0">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/2">
              <div className="p-1">
                <Card className="h-60 justify-center p-0">
                  <CardContent className="flex aspect-square items-center justify-center">
                    <Image
                      src={item.src}
                      alt={`Wardrobe item ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
                <div className="mt-2 text-center text-black dark:text-white font-jakarta font-thin">
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
            router.push('/suggestions');
          }}
        >
          <ArrowRightIcon size={16} />
          Select For Occassion
        </Button>
      </div>
    </div>
  );
}
