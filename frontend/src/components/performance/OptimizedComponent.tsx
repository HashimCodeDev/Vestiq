'use client';

import { memo, useMemo, useCallback } from 'react';

interface OptimizedComponentProps {
  children: React.ReactNode;
  dependencies?: React.DependencyList;
  shouldUpdate?: (
    prevProps: OptimizedComponentProps,
    nextProps: OptimizedComponentProps,
  ) => boolean;
}

// Higher-order component for performance optimization
export const withOptimization = <P extends object>(
  Component: React.ComponentType<P>,
  customComparison?: (prevProps: P, nextProps: P) => boolean,
) => {
  const OptimizedComponent = memo(Component, customComparison);
  OptimizedComponent.displayName = `Optimized(${Component.displayName || Component.name})`;
  return OptimizedComponent;
};

// Hook for memoizing expensive calculations
export const useMemoizedValue = <T,>(
  factory: () => T,
  deps: React.DependencyList,
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(), [factory, ...deps]);
};

// Hook for memoizing callbacks
export const useMemoizedCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList,
): T => {
  return useCallback(
    (...args: unknown[]) => callback(...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, ...deps],
  ) as T;
};

// Component for conditional rendering with performance optimization
export const ConditionalRender = memo(function ConditionalRender({
  condition,
  children,
  fallback = null,
}: {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return condition ? <>{children}</> : <>{fallback}</>;
});

// Debounced input component
export const DebouncedInput = memo(function DebouncedInput({
  value,
  onChange,
  delay = 300,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  [key: string]: unknown;
}) {
  const debouncedOnChange = useCallback(
    (newValue: string) => {
      const timeoutId = setTimeout(() => onChange(newValue), delay);
      return () => clearTimeout(timeoutId);
    },
    [onChange, delay],
  );

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => debouncedOnChange(e.target.value)}
    />
  );
});

// Virtual list component for large datasets
export const VirtualList = memo(function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const visibleItems = useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const buffer = 5; // Render extra items for smooth scrolling
    return Math.min(items.length, visibleCount + buffer);
  }, [items.length, itemHeight, containerHeight]);

  const renderedItems = useMemo(() => {
    return items.slice(0, visibleItems).map((item, index) => (
      <div key={index} style={{ height: itemHeight }}>
        {renderItem(item, index)}
      </div>
    ));
  }, [items, visibleItems, itemHeight, renderItem]);

  return (
    <div style={{ height: containerHeight, overflow: 'auto' }}>
      {renderedItems}
    </div>
  );
});

export default memo(function OptimizedComponent({
  children,
  dependencies = [],
}: OptimizedComponentProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedChildren = useMemo(() => children, [children, ...dependencies]);

  return <>{memoizedChildren}</>;
});
