import {
  TrophyIcon,
  FireIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { memo, useMemo, useCallback } from 'react';

const ActiveChallenges = memo(function ActiveChallenges() {
  const challenges = useMemo(
    () => [
      {
        id: 1,
        title: 'Monochrome Monday',
        progress: 75,
        reward: '🏆 50 XP',
        description: 'Wear a single color outfit',
        daysLeft: 4,
        difficulty: 'Easy',
        icon: '✨',
      },
      {
        id: 2,
        title: 'Color Pop Week',
        progress: 40,
        reward: '🎨 75 XP',
        description: 'Add vibrant colors to your outfits',
        daysLeft: 5,
        difficulty: 'Medium',
        icon: '🌈',
      },
      {
        id: 3,
        title: 'Sustainable Style',
        progress: 20,
        reward: '⭐ 100 XP',
        description: 'Use eco-friendly fashion choices',
        daysLeft: 14,
        difficulty: 'Hard',
        icon: '👗',
      },
    ],
    [],
  );

  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400';
      case 'Hard':
        return 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-950/20 dark:text-gray-400';
    }
  }, []);

  const handleViewAll = useCallback(() => {
    // TODO: Navigate to challenges page
    console.log('View all challenges');
  }, []);

  return (
    <section
      role="region"
      aria-label="Active challenges"
      className="space-y-6 animate-fade-in-up animation-delay-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-gradient">
            Active Challenges
          </h3>
          <TrophyIcon
            className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-bounce-gentle"
            weight="duotone"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-black/20 backdrop-blur-sm transition-all duration-300 group hover:scale-105"
          onClick={handleViewAll}
        >
          View All
          <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
        </Button>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <Card
            key={challenge.id}
            role="article"
            className={`relative border-0 bg-white/50 dark:bg-black/30 backdrop-blur-md hover:bg-white/70 dark:hover:bg-black/40 transition-all duration-500 group cursor-pointer hover:scale-[1.03] hover:shadow-2xl overflow-hidden animate-fade-in-up shadow-lg`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Enhanced gradient overlay based on difficulty */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                challenge.difficulty === 'Easy'
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : challenge.difficulty === 'Medium'
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                    : 'bg-gradient-to-br from-red-400 to-pink-500'
              }`}
            />
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className={`absolute top-2 right-2 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  challenge.difficulty === 'Easy'
                    ? 'bg-green-400'
                    : challenge.difficulty === 'Medium'
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                }`}
              />
            </div>

            <CardContent className="relative p-5">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">
                        {challenge.icon}
                      </span>
                      {challenge.progress > 50 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {challenge.title}
                      </h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-white/20"
                    >
                      {challenge.reward}
                    </Badge>
                    <Badge
                      className={`text-xs border-0 ${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">
                      Progress
                    </span>
                    <span className="font-semibold text-foreground bg-white/50 dark:bg-black/30 px-2 py-1 rounded-md text-xs">
                      {challenge.progress}%
                    </span>
                  </div>
                  <div id="progress" className="relative">
                    <Progress
                      value={challenge.progress}
                      className="h-3 bg-muted/50"
                    />
                    {/* Animated shimmer on progress bar */}
                    <div
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-full"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground bg-white/30 dark:bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="font-medium">
                      {challenge.daysLeft} days left
                    </span>
                  </div>
                  {challenge.progress > 50 && (
                    <div className="flex items-center gap-1 text-orange-500 bg-orange-50 dark:bg-orange-950/20 px-3 py-1.5 rounded-lg animate-pulse">
                      <FireIcon className="w-4 h-4 animate-bounce-gentle" />
                      <span className="text-xs font-semibold">On fire!</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
});

export default ActiveChallenges;
