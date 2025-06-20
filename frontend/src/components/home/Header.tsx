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
    <header className="flex items-start justify-between gap-4" role="banner">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
            {greeting}, {displayName || 'Fashionista'}
          </h1>
          <span
            className="text-2xl sm:text-3xl flex-shrink-0"
            aria-hidden="true"
            role="img"
            aria-label={`${greeting} emoji`}
          >
            {greetingEmoji}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="flex items-center gap-1"
            role="status"
            aria-label="User level: Level 3 Sartorial Sorcerer"
          >
            <SparkleIcon className="w-3 h-3" aria-hidden="true" />
            Level 3: Sartorial Sorcerer
          </Badge>
        </div>
      </div>

      <nav
        className="flex items-center gap-3 flex-shrink-0"
        role="navigation"
        aria-label="User actions"
      >
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="View notifications (1 unread)"
          aria-describedby="notification-count"
        >
          <BellIcon className="w-5 h-5" aria-hidden="true" />
          <span
            id="notification-count"
            className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background"
            aria-label="1 unread notification"
          />
        </Button>

        <Link
          href="/profile"
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          aria-label={`Go to ${displayName || 'user'} profile`}
        >
          <Avatar className="w-10 h-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
            <AvatarImage
              src={photoURL || ''}
              alt={`${displayName || 'User'} profile picture`}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
        </Link>
      </nav>
    </header>
  );
});

export default Header;
