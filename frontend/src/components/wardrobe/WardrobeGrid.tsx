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

      <div className="w-full px-4 mb-6">
        <div className="max-w-md mx-auto">
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

          {/* Enhanced Upload Section */}
          <div className="animate-fade-in-up animation-delay-400">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-full h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <PlusIcon size={24} weight="fill" />
                      <span className="font-medium">Add New Item</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-64 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/30 dark:border-white/20 shadow-2xl"
              >
                <DropdownMenuLabel className="text-center font-medium">
                  Choose upload method
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleCameraClick}
                  disabled={isUploading}
                  className="flex items-center gap-3 p-3 hover:bg-white/50 dark:hover:bg-black/50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <span className="font-medium">Take Photo</span>
                    <p className="text-xs text-muted-foreground">
                      Use your camera
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleGalleryClick}
                  disabled={isUploading}
                  className="flex items-center gap-3 p-3 hover:bg-white/50 dark:hover:bg-black/50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Upload className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <span className="font-medium">Upload from Gallery</span>
                    <p className="text-xs text-muted-foreground">
                      Choose from photos
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Wardrobe Items Grid */}
      <div className="px-4 pb-20">
        <div className="max-w-md mx-auto">
          {wardrobeItems.length === 0 && !isUploading ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👗</span>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Your wardrobe is empty
              </h3>
              <p className="text-sm text-muted-foreground">
                Start building your collection by adding your first item!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {wardrobeItems.map((item, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/wardrobe/${index + 1}`} className="group">
                    <Card className="relative h-64 overflow-hidden border-0 bg-white/60 dark:bg-black/40 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/60 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl rounded-2xl">
                      <CardContent className="p-0 h-full relative">
                        <Image
                          src={item}
                          alt={`Wardrobe item ${index + 1}`}
                          width={400}
                          height={600}
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                        {/* Favorite button */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-sm">❤️</span>
                          </div>
                        </div>
                        {/* Item number badge */}
                        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <span className="text-xs font-medium text-foreground">
                            #{index + 1}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Infinite scroll loader */}
      {hasMore && wardrobeItems.length > 0 && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-sm">Loading more items...</span>
          </div>
        </div>
      )}
    </div>
  );
}
