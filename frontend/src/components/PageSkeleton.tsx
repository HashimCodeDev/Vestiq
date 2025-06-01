import { Skeleton } from '@/components/ui/skeleton';

export default function PageSkeleton() {
  return (
    <div className="flex-col">
      {/* Welcome Card Skeleton */}
      <Skeleton className="md:flex md:flex-row md:items-center md:w-2/3 md:place-self-center md:px-20 relative flex-col h-36 p-4 rounded-3xl shadow-sm overflow-hidden mb-10" />
      {/* My Wardrobe Skeleton */}
      <Skeleton className="h-10 w-2/3 mb-15 ml-5" />
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex aspect-video items-center justify-center w-full rotate-90"
          />
        ))}
      </div>
      {/* Space Between Both */}
      <div className="h-20"></div>
      {/* Trending Section Skeleton */}
      <Skeleton className="h-10 w-2/3 mb-15 ml-5" />
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex aspect-video items-center justify-center w-full rotate-90"
          />
        ))}
      </div>
    </div>
  );
}
