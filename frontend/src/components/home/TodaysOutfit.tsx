import {
  StarIcon,
  ThermometerIcon,
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
      className="overflow-hidden border-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 rounded-xl"
    >
      <Card className="overflow-hidden border-0 bg-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2
                id="todays-outfit-title"
                className="text-xl font-bold text-foreground"
              >
                Today's Perfect Match
              </h2>
              <Badge
                variant="secondary"
                className="w-fit"
                role="status"
                aria-label={`Outfit mood: ${todaysOutfit.mood}`}
              >
                {todaysOutfit.mood}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SunIcon className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span
                className="font-medium"
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
            className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
            role="region"
            aria-labelledby="outfit-items-title"
          >
            <h3 id="outfit-items-title" className="sr-only">
              Today's outfit items
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list">
              {todaysOutfit.items.map((item, index) => (
                <div key={index} className="text-center group" role="listitem">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 border border-border/50 group-hover:border-primary/50 transition-all duration-200 group-hover:scale-105"
                    role="img"
                    aria-label={`${item} clothing item`}
                  >
                    <span className="text-2xl sm:text-3xl" aria-hidden="true">
                      {getItemEmoji(item)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence Score & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-foreground">
                  {todaysOutfit.confidence}% Confidence
                </span>
              </div>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${todaysOutfit.confidence}%` }}
                />
              </div>
            </div>

            <div
              className="flex gap-2 w-full sm:w-auto"
              role="group"
              aria-label="Outfit actions"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none gap-2 hover:bg-accent focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Shuffle to get a new outfit recommendation"
                onClick={handleShuffle}
              >
                <ShuffleIcon className="w-4 h-4" aria-hidden="true" />
                Shuffle
              </Button>
              <Button
                size="sm"
                className="flex-1 sm:flex-none gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Mark this outfit as loved and save to favorites"
                onClick={handleLoveIt}
              >
                <HeartIcon className="w-4 h-4" aria-hidden="true" />
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
