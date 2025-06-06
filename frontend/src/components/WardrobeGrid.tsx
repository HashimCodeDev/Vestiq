// Wardrobe grid of Wardrobe page

'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FilterBadge from '@/components/FilterBadge';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlusCircleIcon, PlusIcon } from '@phosphor-icons/react';

export default function WardrobeGrid({
  outfitItems,
}: {
  outfitItems: string[];
}) {
  return (
    <div className="relative min-h-screen">
      <FilterBadge />
      <div className="w-full p-1">
        <Button className="w-full">
          <PlusIcon size={32} weight="fill" />
          Add Outfit
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 py-5 mb-10">
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
        <div className="p-1">
          <Card className="h-60 bg-card flex justify-center items-center">
            <CardContent className="flex aspect-square items-center justify-center">
              <Button
                className="cursor-pointer size-15"
                variant="ghost"
                size="icon"
                asChild
              >
                <PlusCircleIcon size={28} weight="fill" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
