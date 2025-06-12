'use client';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LockIcon,
  BellIcon,
  StarIcon,
  InfoIcon,
  QuestionIcon,
  SignOutIcon,
  UserIcon,
  Icon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

export default function SettingsPage() {
  const { theme } = useTheme();
  const { setTheme } = useTheme();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = (enabled: boolean) => {
    if (isTransitioning) return; // Prevent spam clicking

    setIsTransitioning(true);

    // Create a smooth transition effect
    document.documentElement.style.transition =
      'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
      setTheme(enabled ? 'dark' : 'light');
    }, 50);

    setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.style.transition = '';
    }, 350);
  };

  return (
    <div className="w-full max-w-sm mx-auto h-screen bg-white dark:bg-[#121212] text-black dark:text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          className="cursor-pointer size-6"
          variant="ghost"
          size="icon"
          asChild
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowLeftIcon size={24} />
        </Button>
        <h2 className="text-lg font-semibold">Settings</h2>
        <div className="w-6" /> {/* spacer for symmetry */}
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center p-6">
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white text-xs opacity-0 hover:opacity-100 transition">
            Edit profile
          </div>
        </div>
        <h3 className="mt-3 font-semibold text-lg">Ethan Carter</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ethan.carter@email.com
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 space-y-1 px-4 overflow-y-auto">
        <SettingItem icon={UserIcon} label="Profile details" />
        <SettingItem icon={LockIcon} label="Password" />
        <SettingItem icon={InfoIcon} label="Subscription" />
        <SettingItem icon={BellIcon} label="Notifications" />
        <SettingItem icon={StarIcon} label="Favorites" />
        <div className="relative">
          {/* Loading overlay during transition */}
          {isTransitioning && (
            <div className="absolute inset-0 bg-transparent z-10 pointer-events-none" />
          )}

          <div
            className={`
        transition-all duration-300 ease-in-out
        ${isTransitioning ? 'scale-[0.98] opacity-90' : 'scale-100 opacity-100'}
      `}
          >
            <SettingSwitch
              label="Dark mode"
              enabled={theme === 'dark'}
              setEnabled={toggleTheme}
            />
          </div>
        </div>
        <SettingItem icon={InfoIcon} label="About application" />
        <SettingItem icon={QuestionIcon} label="Help/FAQ" />
      </div>

      {/* Logout */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full text-red-600 justify-between px-2 hover:bg-red-50 dark:hover:bg-red-900"
        >
          <span className="flex items-center gap-2">
            <SignOutIcon size={20} />
            Logout
          </span>
          <ArrowRightIcon size={16} />
        </Button>
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, label }: { icon: Icon; label: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 rounded-md">
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ArrowRightIcon size={16} />
    </div>
  );
}

function SettingSwitch({
  label,
  enabled,
  setEnabled,
}: {
  label: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b px-2 transition-all duration-300">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{label}</span>
      </div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
}
