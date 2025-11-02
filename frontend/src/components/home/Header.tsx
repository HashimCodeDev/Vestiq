import { BellIcon, SparkleIcon } from '@phosphor-icons/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useUserInfo } from '@/hooks/useUserInfo';
import { memo, useMemo } from 'react';

const Header = memo(function Header() {
  const { displayName, photoURL } = useUserInfo();

  // Memoize greeting to avoid recalculating on every render
  const { greeting, greetingEmoji } = useMemo(() => {
    const hour = new Date().getHours();
    let greeting: string;
    let greetingEmoji: string;

    if (hour < 12) {
      greeting = 'Good Morning';
      greetingEmoji = '☀️';
    } else if (hour < 17) {
      greeting = 'Good Afternoon';
      greetingEmoji = '🌤️';
    } else {
      greeting = 'Good Evening';
      greetingEmoji = '🌙';
    }

    return { greeting, greetingEmoji };
  }, []); // Empty dependency array since we only want to calculate once per component mount

  return (
    <header
      className="flex items-start justify-between gap-6 relative animate-fade-in-up"
      role="banner"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute -inset-6 bg-gradient-to-r from-primary/8 via-accent/5 to-secondary/8 rounded-3xl blur-2xl opacity-60 animate-pulse-slow" />
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl blur-xl opacity-50" />

      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-3 mb-3 animate-slide-in-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-gradient truncate">
            {greeting}, {displayName || 'Fashionista'}
          </h1>
          <span
            className="text-3xl sm:text-4xl flex-shrink-0 animate-bounce-gentle"
            aria-hidden="true"
            role="img"
            aria-label={`${greeting} emoji`}
          >
            {greetingEmoji}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap animate-slide-in-left animation-delay-100">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/15 to-accent/15 backdrop-blur-md border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
            role="status"
            aria-label="User level: Level 3 Sartorial Sorcerer"
          >
            <SparkleIcon
              className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform duration-300"
              aria-hidden="true"
              weight="fill"
            />
            <span className="font-semibold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Level 3: Sartorial Sorcerer
            </span>
          </Badge>
        </div>
      </div>

      <nav
        className="flex items-center gap-3 flex-shrink-0 relative z-10 animate-slide-in-right"
        role="navigation"
        aria-label="User actions"
      >
        <Button
          variant="glass"
          size="icon-lg"
          className="relative hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl group"
          aria-label="View notifications (1 unread)"
          aria-describedby="notification-count"
        >
          <BellIcon
            className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"
            aria-hidden="true"
            weight="duotone"
          />
          <span
            id="notification-count"
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-background shadow-glow animate-pulse flex items-center justify-center"
            aria-label="1 unread notification"
          >
            <span className="sr-only">1</span>
            <span className="text-[10px] font-bold text-white">1</span>
          </span>
        </Button>

        <Link
          href="/profile"
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label={`Go to ${displayName || 'user'} profile`}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-75 blur transition-opacity duration-300" />
            <Avatar className="relative w-12 h-12 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300 cursor-pointer shadow-lg group-hover:shadow-2xl">
              <AvatarImage
                src={photoURL || ''}
                alt={`${displayName || 'User'} profile picture`}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-lg backdrop-blur-sm">
                {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </Link>
      </nav>
    </header>
  );
});

export default Header;
