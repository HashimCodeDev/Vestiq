// Wardrobe grid of Wardrobe page

'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FilterBadge from '@/components/FilterBadge';
import Link from 'next/link';

export default function WardrobeGrid({
  outfitItems,
}: {
  outfitItems: string[];
}) {
  return (
    <div className="flex flex-col">
      <FilterBadge />
      <div className="grid grid-cols-2 gap-4 py-10 mb-10">
        {outfitItems.map((item, index) => (
          <div key={index} className="p-1">
            <Link href={`/wardrobe/${index + 1}`}>
              <Card className="h-60 justify-center mb-5">
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image
                    src={item}
                    alt={`Wardrobe item ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
