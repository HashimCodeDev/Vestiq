import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'pulse' | 'bars';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  text,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400" />
          </div>
        );

      case 'pulse':
        return (
          <div className={cn('bg-primary rounded-full animate-pulse', sizeClasses[size])} />
        );

      case 'bars':
        return (
          <div className="flex space-x-1">
            <div className="w-1 h-6 bg-primary animate-bounce" />
            <div className="w-1 h-6 bg-primary animate-bounce animation-delay-200" />
            <div className="w-1 h-6 bg-primary animate-bounce animation-delay-400" />
          </div>
        );

      default:
        return (
          <div className={cn('border-4 border-primary/20 border-t-primary rounded-full animate-spin', sizeClasses[size])} />
        );
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      {renderSpinner()}
      {text && (
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
