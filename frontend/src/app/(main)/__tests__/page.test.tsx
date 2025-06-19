import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock all the child components
jest.mock('@/components/authentication/ProtectedRoute', () => {
  return ({ children }: { children: React.ReactNode }) => <div data-testid="protected-route">{children}</div>
})

jest.mock('@/components/home/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>
  }
})

jest.mock('@/components/home/QuickActions', () => {
  return function MockQuickActions() {
    return <div data-testid="quick-actions">Quick Actions Component</div>
  }
})

jest.mock('@/components/home/TodaysOutfit', () => {
  return function MockTodaysOutfit() {
    return <div data-testid="todays-outfit">Today's Outfit Component</div>
  }
})

jest.mock('@/components/home/ActiveChallenges', () => {
  return function MockActiveChallenges() {
    return <div data-testid="active-challenges">Active Challenges Component</div>
  }
})

jest.mock('@/components/skeleton/HomePageSkeleton', () => {
  return function MockPageSkeleton() {
    return <div data-testid="page-skeleton">Loading Skeleton</div>
  }
})

describe('Home Page', () => {
  it('renders within ProtectedRoute', () => {
    render(<Home />)
    
    expect(screen.getByTestId('protected-route')).toBeInTheDocument()
  })

  it('renders all main sections', () => {
    render(<Home />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('quick-actions')).toBeInTheDocument()
    expect(screen.getByTestId('todays-outfit')).toBeInTheDocument()
    expect(screen.getByTestId('active-challenges')).toBeInTheDocument()
  })

  it('has proper layout structure', () => {
    render(<Home />)
    
    // Check for main container
    const mainContainer = screen.getByTestId('protected-route').firstChild
    expect(mainContainer).toHaveClass('min-h-screen')
  })

  it('renders sections in correct order', () => {
    render(<Home />)
    
    const protectedRoute = screen.getByTestId('protected-route')
    const sections = protectedRoute.querySelectorAll('[data-testid]')
    
    expect(sections[0]).toHaveAttribute('data-testid', 'header')
    expect(sections[1]).toHaveAttribute('data-testid', 'todays-outfit')
    expect(sections[2]).toHaveAttribute('data-testid', 'quick-actions')
    expect(sections[3]).toHaveAttribute('data-testid', 'active-challenges')
  })

  it('applies correct styling classes', () => {
    render(<Home />)
    
    const mainContainer = screen.getByTestId('protected-route').firstChild as HTMLElement
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-br')
  })

  it('has proper responsive container', () => {
    render(<Home />)
    
    const container = screen.getByTestId('protected-route').querySelector('.container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'max-w-4xl')
  })

  it('includes decorative background elements', () => {
    render(<Home />)
    
    const backgroundElements = screen.getByTestId('protected-route').querySelectorAll('.absolute')
    expect(backgroundElements.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure', () => {
    render(<Home />)
    
    // Check for main content sections
    const sections = screen.getAllByRole('generic').filter(el => 
      el.tagName.toLowerCase() === 'section' || el.querySelector('[data-testid]')
    )
    expect(sections.length).toBeGreaterThan(0)
  })

  it('maintains proper spacing between sections', () => {
    render(<Home />)
    
    const contentContainer = screen.getByTestId('protected-route').querySelector('.space-y-8')
    expect(contentContainer).toBeInTheDocument()
  })

  it('includes safe area padding', () => {
    render(<Home />)
    
    const contentContainer = screen.getByTestId('protected-route').querySelector('.pb-safe')
    expect(contentContainer).toBeInTheDocument()
  })
})
