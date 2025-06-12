import { BellIcon } from '@phosphor-icons/react';

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Good Morning, Sarah! ☀️
        </h1>
        <p className="text-gray-600">Level 3: Sartorial Sorcerer ✨</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">S</span>
        </div>
        <BellIcon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
}
