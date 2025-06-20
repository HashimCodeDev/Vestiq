import { renderHook, act } from '@testing-library/react';
import {
  useFocusTrap,
  useKeyboardNavigation,
  useReducedMotion,
  useScreenReader,
} from '../use-accessibility';

describe('Accessibility Hooks', () => {
  describe('useFocusTrap', () => {
    beforeEach(() => {
      // Clear any existing event listeners
      document.removeEventListener = jest.fn();
      document.addEventListener = jest.fn();
    });

    it('returns a ref object', () => {
      const { result } = renderHook(() => useFocusTrap(false));

      expect(result.current).toHaveProperty('current');
    });

    it('sets up event listeners when active', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      renderHook(() => useFocusTrap(true));

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      );
    });

    it('does not set up event listeners when inactive', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      renderHook(() => useFocusTrap(false));

      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });

    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener',
      );

      const { unmount } = renderHook(() => useFocusTrap(true));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      );
    });
  });

  describe('useKeyboardNavigation', () => {
    const mockItems = ['item1', 'item2', 'item3'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      document.addEventListener = jest.fn();
      document.removeEventListener = jest.fn();
    });

    it('returns containerRef and activeIndex', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation(mockItems, mockOnSelect, true),
      );

      expect(result.current).toHaveProperty('containerRef');
      expect(result.current).toHaveProperty('activeIndex');
      expect(typeof result.current.activeIndex).toBe('number');
    });

    it('sets up event listeners when active', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      renderHook(() => useKeyboardNavigation(mockItems, mockOnSelect, true));

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      );
    });

    it('does not set up event listeners when inactive', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      renderHook(() => useKeyboardNavigation(mockItems, mockOnSelect, false));

      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });

    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener',
      );

      const { unmount } = renderHook(() =>
        useKeyboardNavigation(mockItems, mockOnSelect, true),
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      );
    });
  });

  describe('useReducedMotion', () => {
    beforeEach(() => {
      // Mock window.matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });

    it('returns false when prefers-reduced-motion is not set', () => {
      const { result } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(false);
    });

    it('returns true when prefers-reduced-motion is set', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(true);
    });

    it('handles server-side rendering', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Temporarily removing window for SSR test
      delete global.window;

      const { result } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(false);

      global.window = originalWindow;
    });
  });

  describe('useScreenReader', () => {
    beforeEach(() => {
      // Mock document.body methods
      document.body.appendChild = jest.fn();
      document.body.removeChild = jest.fn();
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns announce function', () => {
      const { result } = renderHook(() => useScreenReader());

      expect(result.current).toHaveProperty('announce');
      expect(typeof result.current.announce).toBe('function');
    });

    it('creates announcement element with correct attributes', () => {
      const { result } = renderHook(() => useScreenReader());

      act(() => {
        result.current.announce('Test message');
      });

      expect(document.body.appendChild).toHaveBeenCalledWith(
        expect.objectContaining({
          textContent: 'Test message',
        }),
      );
    });

    it('sets correct aria attributes for polite announcement', () => {
      const { result } = renderHook(() => useScreenReader());
      const mockElement = {
        setAttribute: jest.fn(),
        textContent: '',
      };

      document.createElement = jest.fn().mockReturnValue(mockElement);

      act(() => {
        result.current.announce('Test message', 'polite');
      });

      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-live',
        'polite',
      );
      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-atomic',
        'true',
      );
      expect(mockElement.setAttribute).toHaveBeenCalledWith('class', 'sr-only');
    });

    it('sets correct aria attributes for assertive announcement', () => {
      const { result } = renderHook(() => useScreenReader());
      const mockElement = {
        setAttribute: jest.fn(),
        textContent: '',
      };

      document.createElement = jest.fn().mockReturnValue(mockElement);

      act(() => {
        result.current.announce('Urgent message', 'assertive');
      });

      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-live',
        'assertive',
      );
    });

    it('removes announcement element after timeout', () => {
      const { result } = renderHook(() => useScreenReader());
      const mockElement = {
        setAttribute: jest.fn(),
        textContent: '',
      };

      document.createElement = jest.fn().mockReturnValue(mockElement);

      act(() => {
        result.current.announce('Test message');
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(document.body.removeChild).toHaveBeenCalledWith(mockElement);
    });
  });
});
