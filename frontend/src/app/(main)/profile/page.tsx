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
import { useUserInfo } from '@/hooks/useUserInfo';

export default function SettingsPage() {
  const { theme } = useTheme();
  const { setTheme } = useTheme();
  const { displayName, photoURL, email } = useUserInfo();

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
    <div className="w-full max-w-sm mx-auto min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10 text-foreground flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/3 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/3 rounded-full blur-2xl animate-float animation-delay-1000" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent/3 rounded-full blur-3xl animate-float animation-delay-2000" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 animate-fade-in-up">
        <Button
          className="cursor-pointer w-10 h-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-black/70 transition-all duration-200"
          variant="ghost"
          size="icon"
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowLeftIcon size={20} />
        </Button>
        <h2 className="text-xl font-bold">Profile & Settings</h2>
        <div className="w-10" /> {/* spacer for symmetry */}
      </div>

      {/* Profile */}
      <div className="relative z-10 flex flex-col items-center p-8 animate-fade-in-up animation-delay-200">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
          <Avatar className="relative w-24 h-24 ring-4 ring-white/20 dark:ring-black/20 shadow-2xl">
            <AvatarImage
              src={photoURL ? photoURL : ''}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl font-bold">
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm">
            <div className="text-center">
              <div className="text-sm font-medium">✏️</div>
              <div className="text-xs">Edit</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            {displayName || 'User'}
          </h3>
          <p className="text-sm text-muted-foreground bg-white/30 dark:bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {email}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">42</div>
              <div className="text-xs text-muted-foreground">Items</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">18</div>
              <div className="text-xs text-muted-foreground">Outfits</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">Level 3</div>
              <div className="text-xs text-muted-foreground">Style</div>
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="relative z-10 flex-1 space-y-3 px-6 overflow-y-auto animate-fade-in-up animation-delay-400">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Account
          </h4>
          <div className="space-y-1">
            <SettingItem icon={UserIcon} label="Profile details" />
            <SettingItem icon={LockIcon} label="Password" />
            <SettingItem icon={InfoIcon} label="Subscription" />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Preferences
          </h4>
          <div className="space-y-1">
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
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Support
          </h4>
          <div className="space-y-1">
            <SettingItem icon={InfoIcon} label="About application" />
            <SettingItem icon={QuestionIcon} label="Help/FAQ" />
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="relative z-10 p-6 animate-fade-in-up animation-delay-600">
        <Button
          variant="ghost"
          className="w-full h-12 text-red-600 dark:text-red-400 justify-between px-4 hover:bg-red-50 dark:hover:bg-red-950/20 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-red-200 dark:border-red-800 rounded-xl transition-all duration-200 hover:scale-[1.02]"
        >
          <span className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <SignOutIcon size={18} />
            </div>
            <span className="font-medium">Logout</span>
          </span>
          <ArrowRightIcon size={16} />
        </Button>
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, label }: { icon: Icon; label: string }) {
  return (
    <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/50 dark:hover:bg-black/50 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-xl transition-all duration-200 hover:scale-[1.01] group border border-white/20 dark:border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
          <Icon size={20} className="text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <ArrowRightIcon
        size={16}
        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
      />
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
    <div className="flex items-center justify-between py-4 px-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-xl transition-all duration-300 border border-white/20 dark:border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-lg">{enabled ? '🌙' : '☀️'}</span>
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
}
