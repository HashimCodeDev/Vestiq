'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FilterBadge from '@/components/wardrobe/FilterBadge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@phosphor-icons/react';
import { useUploadImage } from '@/hooks/useUploadImage';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
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

/**
 * The WardrobeGrid component displays a grid of outfit items from the server and allows the user to upload new outfit items.
 * The component fetches the outfit items from the server using the `/wardrobe` API and displays them in the grid.
 *
 * The component also renders a "Add Outfit" button that toggles a dropdown menu with options to either take a photo or upload from the gallery.
 * When the user selects an option, the component will either prompt the camera to open or the file input to open.
 * When the user selects an image from the gallery or takes a photo, the component will attempt to upload the image to the server using the `/api/upload` API.
 * If the upload is successful, the component will update the server with the new image URL and refresh the wardrobe items to include the new item.
 *
 * The component also uses the `useAuth` hook to get the user's token and pass it to the backend API.
 * The component also uses the `useUploadImage` hook to upload the image to the server.
 * The component also uses the `useState` hook to keep track of the wardrobe items and the infinite scroll state.
 *
 * @return {JSX.Element} The component JSX.
 */
export default function WardrobeGrid(): JSX.Element {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useUploadImage();
  const { token } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState<string[]>([]);
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const fileWasUploaded = useRef(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Show a toast when an image is uploaded
    if (isUploading) {
      toast.loading('Uploading image...');
    }
    // Show toast when upload is complete
    else if (fileWasUploaded.current) {
      toast.dismiss();
      toast.success('Image uploaded successfully!');
      fileWasUploaded.current = false;
    }
    // Hide toast when upload is complete
    else {
      toast.dismiss();
    }
  }, [isUploading]);

  const fetchWardrobeItems = useCallback(
    async (limit: number = 5, skip: number = 0): Promise<void> => {
      try {
        const response = await axios.get(
          `/wardrobe?limit=${limit}&skip=${skip}`,
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
        fileWasUploaded.current = true;
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      toast.error('Upload failed. Please try again.');
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
          <div key={index}>
            <Link href={`/wardrobe/${index + 1}`}>
              <Card className="h-60 justify-center mb-5 hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-center">
                  <Image
                    src={item}
                    alt={`Wardrobe item ${index + 1}`}
                    width={400}
                    height={600}
                    className="w-full h-full object-fill rounded-lg"
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
