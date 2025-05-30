import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
export default function WelcomeCard() {
  return (
    <>
      <div className="block  h-36 p-4 mask-origin-border bg-[#C78E58] rounded-3xl shadow-sm">
        <div className="flex justify-end z-10 absolute top-7 right-10">
          <Image
            src="/homecard.png"
            alt="Welcome Image"
            width={120}
            height={50}
          ></Image>
        </div>
        <h5 className="mb-2 ml-5 text-2xl font-bold tracking-tight dark:text-gray-900 text-white font-jakarta">
          ELEVATE YOUR <br /> <span className="text-center">OUTFIT</span> STYLE
          <br />
        </h5>
        <Link href="/wardrobe">
          <Button className="bg-white text-[#C78E58] hover:bg-[#C78E58] hover:text-white font-jakarta relative left-10">
            Explore Now
          </Button>
        </Link>
      </div>
    </>
  );
}
