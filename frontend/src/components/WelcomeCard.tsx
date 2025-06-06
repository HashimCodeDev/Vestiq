// Welcome Card of Home Page

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function WelcomeCard() {
  return (
    <div className="md:flex md:flex-row md:items-center md:w-2/3 md:place-self-center md:px-20 relative flex-col h-36 p-4 bg-[#C78E58] rounded-3xl shadow-sm overflow-hidden">
      <div className="absolute bottom-0 right-5">
        <Image
          src="/homecard.png"
          alt="Welcome Image"
          width={120}
          height={50}
          className="object-contain"
          priority
          style={{ height: 'auto' }}
        />
      </div>

      <h5 className="mb-2 ml-5 text-2xl font-bold tracking-tight text-white font-jakarta">
        ELEVATE YOUR <br />
        <span>OUTFIT</span> STYLE
      </h5>

      <Link href="/wardrobe" className="inline-block ml-10">
        <Button className="bg-white text-[#C78E58] hover:bg-gray-200 font-jakarta transition-colors cursor-pointer">
          Explore Now
        </Button>
      </Link>
    </div>
  );
}
