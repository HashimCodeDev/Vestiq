import { Skeleton } from '@/components/ui/skeleton';

export default function WardrobePageSkeleton() {
  return (
    <div className="flex-col">
      <Skeleton className="h-10 w-2/3 ml-10" />
      <div className="grid grid-cols-2 gap-y-30 relative justify-center top-15">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex aspect-video items-center justify-center w-full rotate-90"
          />
        ))}
      </div>
    </div>
  );
}
