'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FilterBadge from '@/components/FilterBadge';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlusIcon } from '@phosphor-icons/react';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { Camera, Upload } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface WardrobeItem {
  _id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  __v: number;
}

export default function WardrobeGrid() {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useUploadImage();
  const { token } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState<string[]>([]);
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (isUploading) {
      toast.loading('Uploading image...');
    } else {
      toast.dismiss();
      toast.success('Image uploaded successfully!');
    }
  }, [isUploading]);

  const fetchWardrobeItems = useCallback(
    async (limit: number = 5, skip: number = 0): Promise<void> => {
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

        setWardrobeItems((prev) => [...prev, ...newItems]);
        setHasMore(skip + newItems.length < totalCount);
      } catch (error) {
        console.error('Error fetching outfit items:', error);
      }
    },
    [token],
  );

  useEffect(() => {
    if (!token || hasFetched.current) return;
    fetchWardrobeItems(limit, skip);
    hasFetched.current = true;
    setSkip(limit);
  }, [token, limit, skip, fetchWardrobeItems]);

  useEffect(() => {
    if (!loaderRef.current) return;
    console.log('Infinite Scroll loading');

    const handleLoadMore = async () => {
      if (hasMore) {
        await fetchWardrobeItems(limit, skip);
        setSkip((prevSkip) => prevSkip + limit);
      }
    };

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
  }, [hasMore, fetchWardrobeItems, limit, skip]);

  /**
   * Handles the change event of a file input, uploading the selected image to the server and
   * adding the image URL to the wardrobe. The function first attempts to upload the image using
   * `uploadImage`, then updates the server with the new image URL. If the upload and update are
   * successful, the wardrobe items are refreshed to include the new item.
   *
   * @param e - The change event triggered by the file input.
   */

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
      if (res.status === 201) {
        console.log('Outfit added successfully');
        // Refresh the wardrobe items to show the new item
        setWardrobeItems([]);
        setSkip(0);
        hasFetched.current = false;
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  /**
   * Triggers the hidden camera file input to open the camera roll.
   */
  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  /**
   * Triggers the hidden file input to open the gallery.
   */
  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className="relative min-h-screen">
      <FilterBadge />

      <div className="w-full p-1">
        {/* Hidden file inputs */}
        <Input
          type="file"
          accept="image/*"
          ref={cameraInputRef}
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <Input
          type="file"
          accept="image/*"
          ref={galleryInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Dropdown Menu for Upload Options */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full transition-all duration-200"
                disabled={isUploading}
              >
                <PlusIcon size={32} weight="fill" />
                {'Add Outfit'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuLabel>Choose upload method</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleCameraClick}
                disabled={isUploading}
              >
                <Camera className="mr-2 h-4 w-4" />
                <span>Take Photo</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleGalleryClick}
                disabled={isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                <span>Upload from Gallery</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-5 mb-10">
        {wardrobeItems.map((item, index) => (
          <div key={index} className="p-1">
            <Link href={`/wardrobe/${index + 1}`}>
              <Card className="h-60 justify-center mb-5 hover:shadow-md transition-shadow">
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
      </div>

      {/* Infinite scroll loader */}
      <div ref={loaderRef} className="h-4" />
    </div>
  );
}
