import {
  StarIcon,
  ShuffleIcon,
  HeartIcon,
  SunIcon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { memo, useMemo, useCallback } from 'react';

const TodaysOutfit = memo(function TodaysOutfit() {
  const todaysOutfit = useMemo(
    () => ({
      weather: '22°C, Sunny',
      mood: 'Professional',
      items: ['Navy Blazer', 'White Blouse', 'Black Jeans', 'Leather Boots'],
      confidence: 95,
    }),
    [],
  );

  // Memoize item emoji mapping for performance
  const getItemEmoji = useCallback((item: string) => {
    if (item.includes('Blazer')) return '🧥';
    if (item.includes('Blouse')) return '👔';
    if (item.includes('Jeans')) return '👖';
    return '🥾';
  }, []);

  const handleShuffle = useCallback(() => {
    // TODO: Implement shuffle logic
    console.log('Shuffling outfit...');
  }, []);

  const handleLoveIt = useCallback(() => {
    // TODO: Implement love it logic
    console.log('Loved outfit!');
  }, []);

  return (
    <section
      aria-labelledby="todays-outfit-title"
      className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 rounded-3xl shadow-xl hover-lift backdrop-blur-sm"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-2xl animate-float animation-delay-1000" />
      </div>
      
      <Card className="relative overflow-hidden border-0 bg-transparent shadow-none">
        <CardHeader className="pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <h2
                  id="todays-outfit-title"
                  className="text-2xl sm:text-3xl font-bold text-gradient"
                >
                  Today&apos;s Perfect Match
                </h2>
                <span className="text-2xl">✨</span>
              </div>
              <Badge
                variant="secondary"
                className="w-fit bg-white/60 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/20 px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                role="status"
                aria-label={`Outfit mood: ${todaysOutfit.mood}`}
              >
                {todaysOutfit.mood}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/40 dark:bg-black/30 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <SunIcon className="w-5 h-5 text-orange-500" aria-hidden="true" />
              <span
                className="font-semibold"
                aria-label={`Weather: ${todaysOutfit.weather}`}
              >
                {todaysOutfit.weather}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Outfit Items Grid */}
          <div
            className="bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/40 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500"
            role="region"
            aria-labelledby="outfit-items-title"
          >
            <h3 id="outfit-items-title" className="sr-only">
              Today&apos;s outfit items
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8" role="list">
              {todaysOutfit.items.map((item, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer"
                  role="listitem"
                >
                  <div
                    className="relative w-20 h-20 sm:w-28 sm:h-28 bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-3xl flex items-center justify-center mb-4 border border-white/50 dark:border-white/30 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 hover-glow"
                    role="img"
                    aria-label={`${item} clothing item`}
                  >
                    <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                      {getItemEmoji(item)}
                    </span>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground font-semibold leading-tight group-hover:text-foreground transition-colors duration-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence Score & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <StarIcon className="w-6 h-6 text-yellow-500 fill-yellow-500 shadow-glow" />
                <span className="text-lg font-bold text-foreground">
                  {todaysOutfit.confidence}% Confidence
                </span>
              </div>
              <div className="relative w-40 h-4 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out relative shadow-glow"
                  style={{ width: `${todaysOutfit.confidence}%` }}
                >
                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent animate-shimmer animation-delay-500" />
                </div>
              </div>
            </div>

            <div
              className="flex gap-4 w-full sm:w-auto"
              role="group"
              aria-label="Outfit actions"
            >
              <Button
                variant="glass"
                size="lg"
                className="flex-1 sm:flex-none gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Shuffle to get a new outfit recommendation"
                onClick={handleShuffle}
              >
                <ShuffleIcon className="w-5 h-5" aria-hidden="true" />
                Shuffle
              </Button>
              <Button
                variant="gradient"
                size="lg"
                className="flex-1 sm:flex-none gap-3 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                aria-label="Mark this outfit as loved and save to favorites"
                onClick={handleLoveIt}
              >
                <HeartIcon className="w-5 h-5" aria-hidden="true" />
                Love It!
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
});

export default TodaysOutfit;
