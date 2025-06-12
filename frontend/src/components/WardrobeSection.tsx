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
import FilterBadge from '@/components/wardrobe/FilterBadge';
import { useAuth } from '@/context/AuthContext';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

interface WardrobeItem {
  _id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  __v: number;
}

/**
 * Wardrobe section component for the Home page.
 *
 * Displays a carousel of outfit items fetched from the server.
 * The component is protected by `useAuth` and will only fetch the outfit items
 * if the user is authenticated.
 *
 * Also includes a filter badge and a button to explore the wardrobe.
 */
export default function WardrobeSection() {
  const router = useRouter();
  const { token } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);

  useEffect(() => {
    if (!token) return;
    /**
     * Fetches the next batch of outfit items from the server.
     * @param {number} [limit=5] The number of items to fetch.
     * @param {number} [skip=0] The number of items to skip.
     * @returns {Promise<void>} A promise that resolves when the items are fetched.
     */
    const fetchWardrobeItems = async (
      limit: number = 5,
      skip: number = 0,
    ): Promise<void> => {
      try {
        const response = await axios.get(
          `/wardrobe?limit=${limit}&skip=${skip}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('Outfit items fetched:', response.data.items);
        setWardrobeItems(response.data.items);
      } catch (error) {
        console.error('Error fetching outfit items:', error);
      }
    };
    fetchWardrobeItems();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Outfit Gallery</h2>
      <FilterBadge />
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {wardrobeItems.map((item, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/2 px-1">
              <div>
                <Card className="h-50">
                  <CardContent className="flex aspect-auto items-center justify-center">
                    <Image
                      src={item.imageUrl}
                      width={200}
                      height={400}
                      alt={`Wardrobe item ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
                {/* <div className="mt-2 text-center text-xs text-black dark:text-white font-jakarta font-thin">
                  {item.title}
                </div> */}
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
