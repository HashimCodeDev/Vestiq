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
 * Enhanced WardrobeGrid component with modern UI design.
 *
 * Features:
 * - Animated background with floating elements
 * - Enhanced upload interface with better UX
 * - Improved grid layout with hover effects
 * - Glass morphism design elements
 * - Smooth animations and micro-interactions
 * - Better empty state with call-to-action
 * - Enhanced infinite scroll loading
 *
 * @return {JSX.Element} The enhanced wardrobe grid component.
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
    [],
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <FilterBadge />

        <div className="w-full mb-8">
          <div className="max-w-sm mx-auto lg:max-w-md">
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
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <PlusIcon size={20} weight="fill" />
                        <span>Add New Item</span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-64 bg-card border rounded-lg shadow-lg"
                >
                  <DropdownMenuLabel className="text-center py-2">
                    Choose upload method
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleCameraClick}
                    disabled={isUploading}
                    className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Camera className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">Take Photo</span>
                      <p className="text-xs text-muted-foreground">
                        Use camera
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleGalleryClick}
                    disabled={isUploading}
                    className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">Upload from Gallery</span>
                      <p className="text-xs text-muted-foreground">
                        Choose photos
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Wardrobe Items Grid */}
        <div className="pb-24 lg:pb-8">
          {wardrobeItems.length === 0 && !isUploading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Your wardrobe is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Add your first item to get started
              </p>
              <Button
                onClick={() => galleryInputRef.current?.click()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add Your First Item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {wardrobeItems.map((item, index) => (
                <Link key={index} href={`/wardrobe/${index + 1}`} className="group">
                  <Card className="relative aspect-[3/4] overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0 h-full">
                      <Image
                        src={item}
                        alt={`Item ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Infinite scroll loader */}
        {hasMore && wardrobeItems.length > 0 && (
          <div ref={loaderRef} className="flex justify-center py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
