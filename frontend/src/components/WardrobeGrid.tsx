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
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

/**
 * Wardrobe grid component for the Wardrobe page.
 *
 * Displays a grid of cards, each containing an image of an outfit item. The
 * first card is a button to add a new outfit item. The component also includes
 * a filter badge to filter the wardrobe items based on different criteria.
 *
 * @param outfitItems List of URLs of the images of the outfit items to display
 * @returns A JSX element representing the Wardrobe grid
 */
export default function WardrobeGrid({
  outfitItems,
}: {
  outfitItems: string[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useUploadImage();
  const { token } = useAuth();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    let url = '';
    if (!file) return;

    try {
      url = await uploadImage(file);
      console.log('Uploaded outfit URL:', url);
    } catch (err) {
      console.error('Error uploading image:', err);
    }

    try {
      const res = await axios.post(
        '/wardrobe',
        { imageUrl: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);
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
          capture="environment"
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
                    height={600}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
        {outfitItems.length > 5 && (
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
        )}
      </div>
    </div>
  );
}
