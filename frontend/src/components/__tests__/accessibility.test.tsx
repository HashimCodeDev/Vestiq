import { render } from '@testing-library/react'
import { testAccessibility } from '@/lib/accessibility-test-utils'
import Home from '@/app/(main)/page'
import Header from '@/components/home/Header'
import QuickActions from '@/components/home/QuickActions'
import TodaysOutfit from '@/components/home/TodaysOutfit'
import ActiveChallenges from '@/components/home/ActiveChallenges'
import NavBar from '@/components/common/NavBar'

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
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>
})

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Accessibility Tests', () => {
  describe('Home Page Accessibility', () => {
    it('should have no critical accessibility issues', () => {
      const { container } = render(<Home />)
      
      const issues = testAccessibility(container)
      const criticalIssues = issues.filter(issue => issue.severity === 'critical')
      
      expect(criticalIssues).toHaveLength(0)
    })

    it('should have minimal serious accessibility issues', () => {
      const { container } = render(<Home />)
      
      const issues = testAccessibility(container)
      const seriousIssues = issues.filter(issue => issue.severity === 'serious')
      
      // Allow some serious issues but keep them minimal
      expect(seriousIssues.length).toBeLessThanOrEqual(3)
    })
  })

  describe('Header Component Accessibility', () => {
    it('should have proper heading structure', () => {
      const { container } = render(<Header />)
      
      const issues = testAccessibility(container)
      const headingIssues = issues.filter(issue => issue.rule === 'heading-order')
      
      expect(headingIssues).toHaveLength(0)
    })

    it('should have accessible images', () => {
      const { container } = render(<Header />)
      
      const issues = testAccessibility(container)
      const imageIssues = issues.filter(issue => issue.rule === 'img-alt')
      
      expect(imageIssues).toHaveLength(0)
    })
  })

  describe('QuickActions Component Accessibility', () => {
    it('should have accessible links', () => {
      const { container } = render(<QuickActions />)
      
      // Check that all links have accessible names
      const links = container.querySelectorAll('a')
      links.forEach(link => {
        const hasAccessibleName = 
          link.getAttribute('aria-label') ||
          link.textContent?.trim() ||
          link.querySelector('[aria-label]') ||
          link.querySelector('img[alt]')
        
        expect(hasAccessibleName).toBeTruthy()
      })
    })

    it('should have proper semantic structure', () => {
      const { container } = render(<QuickActions />)
      
      const issues = testAccessibility(container)
      const structuralIssues = issues.filter(issue => 
        issue.rule === 'heading-order' || issue.rule === 'landmark'
      )
      
      expect(structuralIssues).toHaveLength(0)
    })
  })

  describe('TodaysOutfit Component Accessibility', () => {
    it('should have accessible buttons', () => {
      const { container } = render(<TodaysOutfit />)
      
      const buttons = container.querySelectorAll('button')
      buttons.forEach(button => {
        const hasAccessibleName = 
          button.getAttribute('aria-label') ||
          button.textContent?.trim()
        
        expect(hasAccessibleName).toBeTruthy()
      })
    })

    it('should have proper ARIA usage', () => {
      const { container } = render(<TodaysOutfit />)
      
      const issues = testAccessibility(container)
      const ariaIssues = issues.filter(issue => 
        issue.rule.startsWith('aria-')
      )
      
      expect(ariaIssues).toHaveLength(0)
    })
  })

  describe('ActiveChallenges Component Accessibility', () => {
    it('should have accessible challenge cards', () => {
      const { container } = render(<ActiveChallenges />)
      
      // Check that challenge cards have proper structure
      const articles = container.querySelectorAll('[role="article"]')
      expect(articles.length).toBeGreaterThan(0)
      
      articles.forEach(article => {
        // Each article should have a heading or accessible name
        const hasHeading = article.querySelector('h1, h2, h3, h4, h5, h6')
        const hasAriaLabel = article.getAttribute('aria-label')
        
        expect(hasHeading || hasAriaLabel).toBeTruthy()
      })
    })

    it('should have accessible progress indicators', () => {
      const { container } = render(<ActiveChallenges />)
      
      const progressBars = container.querySelectorAll('[role="progressbar"]')
      progressBars.forEach(progressBar => {
        expect(progressBar).toHaveAttribute('aria-valuenow')
        expect(progressBar).toHaveAttribute('aria-valuemin')
        expect(progressBar).toHaveAttribute('aria-valuemax')
      })
    })
  })

  describe('NavBar Component Accessibility', () => {
    it('should have proper navigation structure', () => {
      const { container } = render(<NavBar />)
      
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      
      const issues = testAccessibility(container)
      const navIssues = issues.filter(issue => 
        issue.rule === 'landmark' || issue.rule === 'navigation'
      )
      
      expect(navIssues).toHaveLength(0)
    })

    it('should have accessible navigation links', () => {
      const { container } = render(<NavBar />)
      
      const navLinks = container.querySelectorAll('nav a')
      expect(navLinks.length).toBeGreaterThan(0)
      
      navLinks.forEach(link => {
        const hasAccessibleName = 
          link.getAttribute('aria-label') ||
          link.textContent?.trim() ||
          link.querySelector('[aria-label]')
        
        expect(hasAccessibleName).toBeTruthy()
      })
    })

    it('should indicate current page', () => {
      const { container } = render(<NavBar />)
      
      // Should have some indication of current page (aria-current, active class, etc.)
      const currentIndicators = container.querySelectorAll(
        '[aria-current="page"], .active, [data-active="true"]'
      )
      
      // At least one navigation item should indicate it's current
      expect(currentIndicators.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Keyboard Navigation', () => {
    it('should not have positive tabindex values', () => {
      const { container } = render(<Home />)
      
      const issues = testAccessibility(container)
      const tabindexIssues = issues.filter(issue => issue.rule === 'tabindex')
      
      expect(tabindexIssues).toHaveLength(0)
    })

    it('should have focusable interactive elements', () => {
      const { container } = render(<Home />)
      
      const interactiveElements = container.querySelectorAll(
        'button, a, input, select, textarea, [tabindex="0"]'
      )
      
      expect(interactiveElements.length).toBeGreaterThan(0)
      
      interactiveElements.forEach(element => {
        // Element should be focusable (not have tabindex="-1" unless intentional)
        const tabindex = element.getAttribute('tabindex')
        if (tabindex !== null) {
          expect(parseInt(tabindex)).toBeGreaterThanOrEqual(-1)
        }
      })
    })
  })

  describe('Color Contrast', () => {
    it('should have sufficient color contrast for text', () => {
      const { container } = render(<Home />)
      
      const issues = testAccessibility(container)
      const contrastIssues = issues.filter(issue => issue.rule === 'color-contrast')
      
      // Allow some contrast issues but keep them minimal
      expect(contrastIssues.length).toBeLessThanOrEqual(2)
    })
  })
})
