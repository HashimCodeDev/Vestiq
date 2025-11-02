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

      {/* Enhanced Header */}
      <div className="relative z-10 flex items-center justify-between p-6 animate-fade-in-up">
        <Button
          className="cursor-pointer w-11 h-11 bg-white/60 dark:bg-black/60 backdrop-blur-md hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
          variant="ghost"
          size="icon"
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowLeftIcon
            size={22}
            className="group-hover:-translate-x-1 transition-transform duration-300"
            weight="bold"
          />
        </Button>
        <h2 className="text-2xl font-bold text-gradient">Profile & Settings</h2>
        <div className="w-11" /> {/* spacer for symmetry */}
      </div>

      {/* Enhanced Profile */}
      <div className="relative z-10 flex flex-col items-center p-8 animate-fade-in-up animation-delay-200">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-lg opacity-30 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow"></div>
          <Avatar className="relative w-28 h-28 ring-4 ring-white/30 dark:ring-black/30 shadow-2xl group-hover:ring-primary/50 transition-all duration-500 group-hover:scale-105">
            <AvatarImage
              src={photoURL ? photoURL : ''}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground text-3xl font-bold">
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-md">
            <div className="text-center">
              <div className="text-xl font-medium mb-1">✏️</div>
              <div className="text-sm font-semibold">Edit Photo</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 space-y-3">
          <h3 className="text-3xl font-bold text-gradient">
            {displayName || 'User'}
          </h3>
          <p className="text-sm text-muted-foreground bg-white/40 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-white/20">
            {email}
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/20">
            <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                42
              </div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">
                Items
              </div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                18
              </div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">
                Outfits
              </div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Level 3
              </div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">
                Style
              </div>
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

      {/* Enhanced Logout */}
      <div className="relative z-10 p-6 animate-fade-in-up animation-delay-600">
        <Button
          variant="ghost"
          className="w-full h-14 text-red-600 dark:text-red-400 justify-between px-5 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white/60 dark:bg-black/60 backdrop-blur-md border-2 border-red-200 dark:border-red-800 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-xl group"
        >
          <span className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <SignOutIcon
                size={20}
                weight="bold"
                className="group-hover:rotate-12 transition-transform duration-300"
              />
            </div>
            <span className="font-semibold text-base">Logout</span>
          </span>
          <ArrowRightIcon
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-300"
            weight="bold"
          />
        </Button>
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, label }: { icon: Icon; label: string }) {
  return (
    <div className="flex items-center justify-between py-4 px-5 cursor-pointer hover:bg-white/60 dark:hover:bg-black/60 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-xl transition-all duration-300 hover:scale-[1.02] group border border-white/30 dark:border-white/20 shadow-md hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl flex items-center justify-center group-hover:from-primary/25 group-hover:to-accent/25 transition-all duration-300 shadow-sm group-hover:scale-110">
          <Icon
            size={22}
            className="text-primary group-hover:rotate-12 transition-transform duration-300"
            weight="duotone"
          />
        </div>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <ArrowRightIcon
        size={18}
        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"
        weight="bold"
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
    <div className="flex items-center justify-between py-4 px-5 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-xl transition-all duration-300 border border-white/30 dark:border-white/20 shadow-md hover:shadow-lg hover:scale-[1.02] group">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
            {enabled ? '🌙' : '☀️'}
          </span>
        </div>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
}
