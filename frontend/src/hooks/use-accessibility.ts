import { useEffect, useRef, useCallback } from 'react';

// Hook for managing focus trap
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // You can add custom escape logic here
        console.log('Escape pressed in focus trap');
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);

    // Focus first element when trap becomes active
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive]);

  return containerRef;
};

// Hook for managing keyboard navigation
export const useKeyboardNavigation = (
  items: unknown[],
  onSelect?: (index: number) => void,
  isActive: boolean = true,
) => {
  const activeIndexRef = useRef(0);
  const containerRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive || items.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          activeIndexRef.current = (activeIndexRef.current + 1) % items.length;
          break;
        case 'ArrowUp':
          e.preventDefault();
          activeIndexRef.current =
            activeIndexRef.current === 0
              ? items.length - 1
              : activeIndexRef.current - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onSelect?.(activeIndexRef.current);
          break;
        case 'Home':
          e.preventDefault();
          activeIndexRef.current = 0;
          break;
        case 'End':
          e.preventDefault();
          activeIndexRef.current = items.length - 1;
          break;
      }
    },
    [items, onSelect, isActive],
  );

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, isActive]);

  return {
    containerRef,
    activeIndex: activeIndexRef.current,
  };
};

// Hook for managing reduced motion preferences
export const useReducedMotion = () => {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return prefersReducedMotion;
};

// Hook for managing screen reader announcements
export const useScreenReader = () => {
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', priority);
      announcement.setAttribute('aria-atomic', 'true');
      announcement.setAttribute('class', 'sr-only');
      announcement.textContent = message;

      document.body.appendChild(announcement);

      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },
    [],
  );

  return { announce };
};

// Hook for managing color contrast and theme accessibility
export const useAccessibleColors = () => {
  const getContrastRatio = useCallback(() => {
    // This is a simplified version - in a real app you'd want a proper color contrast library
    // For now, return a mock value
    return 4.5; // WCAG AA standard
  }, []);

  const isHighContrast = useCallback(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-contrast: high)').matches
      : false;
  }, []);

  return {
    getContrastRatio,
    isHighContrast: isHighContrast(),
  };
};

// Hook for managing viewport and responsive accessibility
export const useViewportAccessibility = () => {
  const isLargeText = useCallback(() => {
    if (typeof window === 'undefined') return false;

    const fontSize = window.getComputedStyle(document.documentElement).fontSize;
    const baseFontSize = parseFloat(fontSize);
    return baseFontSize >= 18; // Consider 18px+ as large text
  }, []);

  const isTouchDevice = useCallback(() => {
    return typeof window !== 'undefined' && 'ontouchstart' in window;
  }, []);

  return {
    isLargeText: isLargeText(),
    isTouchDevice: isTouchDevice(),
  };
};
