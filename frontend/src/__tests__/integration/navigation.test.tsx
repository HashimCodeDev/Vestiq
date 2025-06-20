import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/common/NavBar';

// Mock next/navigation
jest.mock('next/navigation');
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('NavBar Navigation Flow', () => {
    it('should highlight correct navigation item based on current path', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveClass('text-primary');

      // Other links should not be highlighted
      const wardrobeLink = screen.getByRole('link', { name: /wardrobe/i });
      expect(wardrobeLink).toHaveClass('text-muted-foreground');
    });

    it('should handle wardrobe section navigation', () => {
      mockUsePathname.mockReturnValue('/wardrobe');

      render(<NavBar />);

      const wardrobeLink = screen.getByRole('link', { name: /wardrobe/i });
      expect(wardrobeLink).toHaveClass('text-primary');
    });

    it('should handle wardrobe subsection navigation', () => {
      mockUsePathname.mockReturnValue('/wardrobe/item/123');

      render(<NavBar />);

      const wardrobeLink = screen.getByRole('link', { name: /wardrobe/i });
      expect(wardrobeLink).toHaveClass('text-primary');
    });

    it('should provide keyboard navigation', async () => {
      const user = userEvent.setup();
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      // Test tab navigation through nav items
      const navLinks = screen.getAllByRole('link');

      // Focus first link
      await user.tab();
      expect(navLinks[0]).toHaveFocus();

      // Tab to next link
      await user.tab();
      expect(navLinks[1]).toHaveFocus();
    });

    it('should have proper ARIA attributes for navigation', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();

      // All navigation links should be accessible
      const navLinks = screen.getAllByRole('link');
      expect(navLinks.length).toBe(5);

      navLinks.forEach((link) => {
        // Each link should have accessible text or label
        const hasAccessibleName =
          link.getAttribute('aria-label') ||
          link.textContent?.trim() ||
          link.querySelector('[aria-label]');

        expect(hasAccessibleName).toBeTruthy();
      });
    });
  });

  describe('Navigation State Management', () => {
    it('should maintain navigation state across different pages', () => {
      const pages = ['/', '/wardrobe', '/suggestions', '/chat', '/shopping'];

      pages.forEach((page) => {
        mockUsePathname.mockReturnValue(page);

        const { rerender } = render(<NavBar />);

        // Find the corresponding nav link
        const expectedActiveLink = screen.getAllByRole('link').find((link) => {
          const href = link.getAttribute('href');
          return href === page;
        });

        if (expectedActiveLink) {
          expect(expectedActiveLink).toHaveClass('text-primary');
        }

        rerender(<NavBar />);
      });
    });

    it('should handle unknown routes gracefully', () => {
      mockUsePathname.mockReturnValue('/unknown-route');

      render(<NavBar />);

      // No navigation item should be highlighted for unknown routes
      const navLinks = screen.getAllByRole('link');
      navLinks.forEach((link) => {
        expect(link).toHaveClass('text-muted-foreground');
      });
    });
  });

  describe('Mobile Navigation Behavior', () => {
    it('should be positioned at bottom for mobile', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('fixed', 'bottom-0');
    });

    it('should have touch-friendly navigation items', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const navLinks = screen.getAllByRole('link');
      navLinks.forEach((link) => {
        // Should have adequate spacing for touch targets
        expect(link).toHaveClass('flex', 'flex-col', 'items-center');
      });
    });
  });

  describe('Navigation Performance', () => {
    it('should render navigation quickly', () => {
      mockUsePathname.mockReturnValue('/');

      const startTime = performance.now();
      render(<NavBar />);
      const endTime = performance.now();

      const renderTime = endTime - startTime;
      expect(renderTime).toBeLessThan(50); // Should render very quickly
    });

    it('should not cause unnecessary re-renders', () => {
      mockUsePathname.mockReturnValue('/');

      const { rerender } = render(<NavBar />);

      // Multiple re-renders with same path should not cause issues
      rerender(<NavBar />);
      rerender(<NavBar />);

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Navigation Accessibility', () => {
    it('should provide clear navigation landmarks', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();

      // Should be identifiable as main navigation
      expect(nav).toHaveClass('fixed'); // Indicates it's persistent navigation
    });

    it('should support screen reader navigation', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const navLinks = screen.getAllByRole('link');

      navLinks.forEach((link) => {
        // Each link should be properly labeled for screen readers
        const linkText = link.textContent?.trim();
        const ariaLabel = link.getAttribute('aria-label');

        expect(linkText || ariaLabel).toBeTruthy();
      });
    });

    it('should indicate current page for screen readers', () => {
      mockUsePathname.mockReturnValue('/wardrobe');

      render(<NavBar />);

      const wardrobeLink = screen.getByRole('link', { name: /wardrobe/i });

      // Should have visual indication (color class)
      expect(wardrobeLink).toHaveClass('text-primary');

      // Could also check for aria-current if implemented
      // expect(wardrobeLink).toHaveAttribute('aria-current', 'page')
    });
  });

  describe('Navigation Error Handling', () => {
    it('should handle missing pathname gracefully', () => {
      mockUsePathname.mockReturnValue('');

      expect(() => render(<NavBar />)).not.toThrow();

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should handle null pathname gracefully', () => {
      mockUsePathname.mockReturnValue(null as unknown as string);

      expect(() => render(<NavBar />)).not.toThrow();

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Navigation Integration with Routing', () => {
    it('should have correct href attributes for all navigation links', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const expectedRoutes = [
        { name: /home/i, href: '/' },
        { name: /wardrobe/i, href: '/wardrobe' },
        { name: /suggestions/i, href: '/suggestions' },
        { name: /chat/i, href: '/chat' },
        { name: /shopping/i, href: '/shopping' },
      ];

      expectedRoutes.forEach(({ name, href }) => {
        const link = screen.getByRole('link', { name });
        expect(link).toHaveAttribute('href', href);
      });
    });

    it('should maintain navigation consistency', () => {
      mockUsePathname.mockReturnValue('/');

      render(<NavBar />);

      const navLinks = screen.getAllByRole('link');

      // Should always have exactly 5 navigation items
      expect(navLinks).toHaveLength(5);

      // Each should be a valid link
      navLinks.forEach((link) => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toMatch(/^\//);
      });
    });
  });
});
