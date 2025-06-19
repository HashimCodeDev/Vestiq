import {
  CameraIcon,
  PaletteIcon,
  SparkleIcon,
  TrendUpIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { memo, useMemo } from 'react';

const QuickActions = memo(function QuickActions() {
  const actions = useMemo(
    () => [
      {
        title: 'Add Items',
        description: 'Snap & categorize',
        icon: CameraIcon,
        href: '/wardrobe',
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
      },
      {
        title: 'Outfit Builder',
        description: 'Mix & match',
        icon: PaletteIcon,
        href: '/suggestions',
        gradient: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        iconColor: 'text-green-600 dark:text-green-400',
      },
      {
        title: 'Style Insights',
        description: 'Trends & analytics',
        icon: TrendUpIcon,
        href: '/analytics',
        gradient: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        iconColor: 'text-purple-600 dark:text-purple-400',
      },
      {
        title: 'AI Stylist',
        description: 'Get personalized tips',
        icon: SparkleIcon,
        href: '/chat',
        gradient: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        iconColor: 'text-orange-600 dark:text-orange-400',
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} href={action.href} className="group">
              <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon
                        className={`w-6 h-6 ${action.iconColor}`}
                        weight="duotone"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
});

export default QuickActions;
