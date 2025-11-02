import {
  CameraIcon,
  PaletteIcon,
  SparkleIcon,
  TrendUpIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { memo, useMemo } from 'react';

const QuickActions = memo(function QuickActions() {
  const actions = useMemo(
    () => [
      {
        title: 'Add Items',
        description: 'Snap & categorize your wardrobe',
        icon: CameraIcon,
        href: '/wardrobe',
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
      },
      {
        title: 'Outfit Builder',
        description: 'Create stunning combinations',
        icon: PaletteIcon,
        href: '/suggestions',
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
        iconColor: 'text-green-600 dark:text-green-400',
      },
      {
        title: 'Style Insights',
        description: 'Discover trends & analytics',
        icon: TrendUpIcon,
        href: '/analytics',
        gradient: 'from-purple-500 via-pink-500 to-rose-500',
        bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
      },
      {
        title: 'AI Stylist',
        description: 'Get personalized fashion advice',
        icon: SparkleIcon,
        href: '/chat',
        gradient: 'from-orange-500 via-red-500 to-pink-500',
        bgColor: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30',
        iconColor: 'text-orange-600 dark:text-orange-400',
      },
    ],
    [],
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-gradient">
            Quick Actions
          </h3>
          <span className="text-2xl">⚡</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} href={action.href} className="group">
              <Card className="relative border-0 bg-white/50 dark:bg-black/30 backdrop-blur-md hover:bg-white/70 dark:hover:bg-black/40 transition-all duration-500 group-hover:scale-[1.05] group-hover:shadow-2xl overflow-hidden hover-lift shadow-xl">
                {/* Enhanced gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className={`absolute top-2 right-2 w-16 h-16 bg-gradient-to-br ${action.gradient} opacity-5 rounded-full blur-xl group-hover:opacity-15 transition-opacity duration-500`} />
                  <div className={`absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-br ${action.gradient} opacity-5 rounded-full blur-lg group-hover:opacity-10 transition-opacity duration-500 animation-delay-300`} />
                </div>

                <CardContent className="relative p-6">
                  <div className="flex items-center gap-5">
                    <div
                      className={`relative w-16 h-16 ${action.bgColor} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl group-hover:shadow-2xl border border-white/20`}
                    >
                      <Icon
                        className={`w-8 h-8 ${action.iconColor} group-hover:scale-110 transition-transform duration-500`}
                        weight="duotone"
                      />
                      {/* Enhanced glow effect */}
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md`}
                      />
                      <div
                        className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                        {action.title}
                      </h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRightIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-3 group-hover:scale-110 transition-all duration-500" />
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
