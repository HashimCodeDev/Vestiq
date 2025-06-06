// Wardrobe grid of Wardrobe page

'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FilterBadge from '@/components/FilterBadge';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlusCircleIcon, PlusIcon } from '@phosphor-icons/react';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useEffect, useRef, useState } from 'react';
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
 * @param wardrobeItems List of URLs of the images of the outfit items to display
 * @returns A JSX element representing the Wardrobe grid
 */

interface WardrobeItem {
  _id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  __v: number;
}

/**
 * Wardrobe grid component for the Wardrobe page.
 *
 * Displays a grid of cards, each containing an image of an outfit item. The
 * first card is a button to add a new outfit item. The component also includes
 * a filter badge to filter the wardrobe items based on different criteria.
 *
 * @returns A JSX element representing the Wardrobe grid
 */
export default function WardrobeGrid() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useUploadImage();
  const { token } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState<string[]>([]);
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasFetched = useRef(false);

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

      const newItems = response.data.items.map(
        (item: WardrobeItem) => item.imageUrl,
      );
      const totalCount = response.data.totalCount;

      /** Append new items to existing */
      setWardrobeItems((prev) => [...prev, ...newItems]);

      /** Check if there are more items */
      setHasMore(skip + newItems.length < totalCount);
    } catch (error) {
      console.error('Error fetching outfit items:', error);
    }
  };

  /**
   * Loads more wardrobe items.
   *
   * If there are more items (i.e. `hasMore` is true), fetches the next batch of
   * items by calling `fetchWardrobeItems` with the current `limit` and `skip`
   * values. Then, increments `skip` by `limit` to prepare for the next fetch.
   */
  const handleLoadMore = async () => {
    if (hasMore) {
      await fetchWardrobeItems(limit, skip);
      setSkip((prevSkip) => prevSkip + limit);
    }
  };

  // Fetch wardrobe items on mount
  useEffect(() => {
    if (!token || hasFetched.current) return;
    fetchWardrobeItems(limit, skip);
    hasFetched.current = true;
    setSkip(limit);
  }, [token, fetchWardrobeItems, limit, skip]);

  useEffect(() => {
    if (!loaderRef.current) return;
    console.log('Infinite Scroll loading');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [handleLoadMore, hasMore]);

  /**
   * Simulates a click event on the file input element.
   *
   * When the user clicks the "Add Outfit" button, this function is called to
   * open the file input dialog to select an image file to upload.
   */
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
        {wardrobeItems.map((item, index) => (
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
        {wardrobeItems.length > 5 && (
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
