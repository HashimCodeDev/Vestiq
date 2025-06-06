// app/wardrobe/[id]/page.tsx
import Image from 'next/image';

interface WardrobePageProps {
  params: {
    id: string;
  };
}

export default async function WardrobeItemPage({ params }: WardrobePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Wardrobe Item {id}</h1>
      <p>Display item info here for item #{id}</p>
    </div>
  );
}
