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
        reward: '50 pts',
        description: 'Wear a single color outfit',
        daysLeft: 2,
        difficulty: 'Easy',
        icon: '🖤',
      },
      {
        id: 2,
        title: 'Sustainable Style',
        progress: 40,
        reward: '100 pts',
        description: 'Use eco-friendly fashion choices',
        daysLeft: 5,
        difficulty: 'Medium',
        icon: '🌱',
      },
      {
        id: 3,
        title: 'Color Pop Week',
        progress: 20,
        reward: '75 pts',
        description: 'Add vibrant colors to your outfits',
        daysLeft: 7,
        difficulty: 'Hard',
        icon: '🌈',
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            Active Challenges
          </h3>
          <TrophyIcon className="w-5 h-5 text-yellow-500" weight="duotone" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={handleViewAll}
        >
          View All
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 group cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{challenge.icon}</span>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {challenge.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {challenge.reward}
                    </Badge>
                    <Badge
                      className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {challenge.progress}%
                    </span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                  {challenge.progress > 50 && (
                    <div className="flex items-center gap-1 text-orange-500">
                      <FireIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">On fire!</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});

export default ActiveChallenges;
