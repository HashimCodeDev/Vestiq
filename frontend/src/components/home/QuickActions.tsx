import { CameraIcon, PaletteIcon } from '@phosphor-icons/react';
import Link from 'next/link';

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <Link href="/wardrobe" className="flex gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CameraIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Add Items</p>
              <p className="text-sm text-gray-600">Snap & categorize</p>
            </div>
          </Link>
        </div>
      </button>

      <button className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <Link href="suggestions" className="flex gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <PaletteIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Outfit Builder</p>
              <p className="text-sm text-gray-600">Mix & match</p>
            </div>
          </Link>
        </div>
      </button>
    </div>
  );
}
