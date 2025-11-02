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

        <div className="w-full mb-8 animate-fade-in-up">
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
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 rounded-2xl blur-xl opacity-50" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="relative w-full h-14 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] group"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="font-semibold">Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <PlusIcon
                          size={22}
                          weight="bold"
                          className="group-hover:rotate-90 transition-transform duration-300"
                        />
                        <span className="font-semibold text-base">
                          Add New Item
                        </span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-72 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl animate-fade-in-up"
                >
                  <DropdownMenuLabel className="text-center py-3 text-base font-semibold">
                    Choose upload method
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleCameraClick}
                    disabled={isUploading}
                    className="flex items-center gap-4 p-4 hover:bg-accent cursor-pointer rounded-lg m-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold block">Take Photo</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Use your camera
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleGalleryClick}
                    disabled={isUploading}
                    className="flex items-center gap-4 p-4 hover:bg-accent cursor-pointer rounded-lg m-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Upload className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold block">
                        Upload from Gallery
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
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
        <div className="pb-24 lg:pb-8">
          {wardrobeItems.length === 0 && !isUploading ? (
            <div className="text-center py-20 animate-fade-in-up animation-delay-200">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20 shadow-xl">
                  <span className="text-6xl animate-bounce-gentle">👗</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gradient mb-3">
                Your wardrobe is empty
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Add your first item to get started on your style journey
              </p>
              <Button
                onClick={() => galleryInputRef.current?.click()}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-6 text-base font-semibold rounded-xl"
              >
                <PlusIcon size={20} weight="bold" className="mr-2" />
                Add Your First Item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 animate-fade-in-up animation-delay-200">
              {wardrobeItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/wardrobe/${index + 1}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card className="relative aspect-[3/4] overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/50 dark:bg-black/30 backdrop-blur-sm hover:scale-[1.05] shadow-lg">
                    <CardContent className="p-0 h-full relative">
                      <Image
                        src={item}
                        alt={`Item ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-500 rounded-lg" />

                      {/* Item number badge */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <span className="text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
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
