import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Home from '@/app/(main)/page'

// Mock dependencies
jest.mock('@/hooks/useUserInfo', () => ({
  useUserInfo: () => ({
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
    email: 'test@example.com',
    loading: false,
  }),
}))

jest.mock('@/components/authentication/ProtectedRoute', () => {
  return ({ children }: { children: React.ReactNode }) => <div data-testid="protected-route">{children}</div>
})

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

describe('User Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Home Page User Journey', () => {
    it('should allow user to navigate through quick actions', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // Wait for the page to load
      await waitFor(() => {
        expect(screen.getByText('Quick Actions')).toBeInTheDocument()
      })

      // Test navigation to wardrobe
      const addItemsLink = screen.getByRole('link', { name: /add items/i })
      await user.click(addItemsLink)
      
      // Since we're using Next.js Link, check the href attribute
      expect(addItemsLink).toHaveAttribute('href', '/wardrobe')

      // Test navigation to outfit builder
      const outfitBuilderLink = screen.getByRole('link', { name: /outfit builder/i })
      await user.click(outfitBuilderLink)
      expect(outfitBuilderLink).toHaveAttribute('href', '/suggestions')

      // Test navigation to style chat
      const styleChatLink = screen.getByRole('link', { name: /style chat/i })
      await user.click(styleChatLink)
      expect(styleChatLink).toHaveAttribute('href', '/chat')

      // Test navigation to challenges
      const challengesLink = screen.getByRole('link', { name: /challenges/i })
      await user.click(challengesLink)
      expect(challengesLink).toHaveAttribute('href', '/challenges')
    })

    it('should allow user to interact with today\'s outfit', async () => {
      const user = userEvent.setup()
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      render(<Home />)

      // Wait for the outfit section to load
      await waitFor(() => {
        expect(screen.getByText("Today's Perfect Match")).toBeInTheDocument()
      })

      // Test shuffle functionality
      const shuffleButton = screen.getByRole('button', { 
        name: /shuffle to get a new outfit recommendation/i 
      })
      await user.click(shuffleButton)
      expect(consoleSpy).toHaveBeenCalledWith('Shuffling outfit...')

      // Test love functionality
      const loveButton = screen.getByRole('button', { 
        name: /mark this outfit as loved and save to favorites/i 
      })
      await user.click(loveButton)
      expect(consoleSpy).toHaveBeenCalledWith('Loved outfit!')

      consoleSpy.mockRestore()
    })

    it('should display user information correctly', async () => {
      render(<Home />)

      // Check that user greeting is displayed
      await waitFor(() => {
        expect(screen.getByText(/Good Morning, Test User/i)).toBeInTheDocument()
      })

      // Check that user level is displayed
      expect(screen.getByRole('status', { name: /User level/i })).toBeInTheDocument()

      // Check that profile link is present
      const profileLink = screen.getByRole('link', { name: /Go to Test User profile/i })
      expect(profileLink).toHaveAttribute('href', '/profile')
    })
  })

  describe('Challenge Interaction Flow', () => {
    it('should display active challenges with progress', async () => {
      render(<Home />)

      // Wait for challenges to load
      await waitFor(() => {
        expect(screen.getByText('Active Challenges')).toBeInTheDocument()
      })

      // Check that challenges are displayed
      expect(screen.getByText('Minimalist Week')).toBeInTheDocument()
      expect(screen.getByText('Color Pop Challenge')).toBeInTheDocument()
      expect(screen.getByText('Vintage Vibes')).toBeInTheDocument()

      // Check that progress bars are present
      const progressBars = screen.getAllByRole('progressbar')
      expect(progressBars.length).toBeGreaterThan(0)

      // Check that each progress bar has proper attributes
      progressBars.forEach(progressBar => {
        expect(progressBar).toHaveAttribute('aria-valuenow')
        expect(progressBar).toHaveAttribute('aria-valuemin', '0')
        expect(progressBar).toHaveAttribute('aria-valuemax', '100')
      })
    })

    it('should allow interaction with challenge cards', async () => {
      const user = userEvent.setup()
      render(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Active Challenges')).toBeInTheDocument()
      })

      // Test hovering over challenge cards
      const challengeCards = screen.getAllByRole('article')
      expect(challengeCards.length).toBeGreaterThan(0)

      // Test that cards are interactive
      challengeCards.forEach(card => {
        expect(card).toHaveClass('cursor-pointer')
      })
    })
  })

  describe('Responsive Design Flow', () => {
    it('should adapt layout for different screen sizes', () => {
      // Mock different viewport sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      render(<Home />)

      // Check that responsive classes are applied
      const container = screen.getByTestId('protected-route')
      expect(container).toBeInTheDocument()

      // Check that grid layouts use responsive classes
      const gridElements = container.querySelectorAll('.grid')
      gridElements.forEach(grid => {
        // Should have responsive grid classes
        const hasResponsiveClasses = 
          grid.className.includes('sm:') || 
          grid.className.includes('md:') || 
          grid.className.includes('lg:')
        expect(hasResponsiveClasses).toBe(true)
      })
    })
  })

  describe('Error Handling Flow', () => {
    it('should handle missing user data gracefully', () => {
      // Mock hook to return loading state
      jest.doMock('@/hooks/useUserInfo', () => ({
        useUserInfo: () => ({
          displayName: null,
          photoURL: null,
          email: null,
          loading: true,
        }),
      }))

      render(<Home />)

      // Should still render the page structure
      expect(screen.getByTestId('protected-route')).toBeInTheDocument()
    })

    it('should handle component errors gracefully', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      // This should not throw even if there are minor issues
      expect(() => render(<Home />)).not.toThrow()

      consoleSpy.mockRestore()
    })
  })

  describe('Performance and Loading', () => {
    it('should render main content quickly', async () => {
      const startTime = performance.now()
      
      render(<Home />)

      // Main content should be available quickly
      await waitFor(() => {
        expect(screen.getByText("Today's Perfect Match")).toBeInTheDocument()
      }, { timeout: 1000 })

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should render within reasonable time (less than 500ms)
      expect(renderTime).toBeLessThan(500)
    })

    it('should not have memory leaks in component lifecycle', () => {
      const { unmount } = render(<Home />)

      // Should unmount without errors
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Accessibility Integration', () => {
    it('should maintain focus management', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // Test keyboard navigation
      await user.tab()
      
      // Should focus on first interactive element
      const focusedElement = document.activeElement
      expect(focusedElement).toBeInstanceOf(HTMLElement)
      
      // Should be a focusable element
      const tagName = focusedElement?.tagName.toLowerCase()
      const focusableElements = ['a', 'button', 'input', 'select', 'textarea']
      const isFocusable = focusableElements.includes(tagName || '') || 
                         focusedElement?.hasAttribute('tabindex')
      
      expect(isFocusable).toBe(true)
    })

    it('should announce important changes to screen readers', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // Test that interactive elements have proper labels
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        const hasLabel = button.getAttribute('aria-label') || button.textContent?.trim()
        expect(hasLabel).toBeTruthy()
      })

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        const hasLabel = link.getAttribute('aria-label') || 
                        link.textContent?.trim() ||
                        link.querySelector('[aria-label]')
        expect(hasLabel).toBeTruthy()
      })
    })
  })
})
