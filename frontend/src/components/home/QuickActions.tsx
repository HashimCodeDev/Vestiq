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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            Quick Actions
          </h3>
          <span className="text-sm animate-bounce-gentle">⚡</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} href={action.href} className="group">
              <Card className="relative border-0 bg-white/40 dark:bg-black/20 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl overflow-hidden">
                {/* Subtle gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <CardContent className="relative p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`relative w-14 h-14 ${action.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      <Icon
                        className={`w-7 h-7 ${action.iconColor} group-hover:scale-110 transition-transform duration-300`}
                        weight="duotone"
                      />
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {action.title}
                      </h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
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
