// Wardrobe grid of Wardrobe page

'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FilterBadge from '@/components/FilterBadge';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlusCircleIcon, PlusIcon } from '@phosphor-icons/react';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useRef } from 'react';
import { Input } from './ui/input';

export default function WardrobeGrid({
  outfitItems,
}: {
  outfitItems: string[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useUploadImage();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      console.log('Uploaded outfit URL:', url);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  return (
    <div className="relative min-h-screen">
      <FilterBadge />
      <div className="w-full p-1">
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          className="w-full"
          onClick={handleButtonClick}
          disabled={isUploading}
        >
          <PlusIcon size={32} weight="fill" />
          {isUploading ? 'Uploading...' : 'Add Outfit'}
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
