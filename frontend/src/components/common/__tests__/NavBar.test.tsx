import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import NavBar from '../NavBar'

// Mock next/navigation
jest.mock('next/navigation')
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
})

describe('NavBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all navigation items', () => {
    mockUsePathname.mockReturnValue('/')
    
    render(<NavBar />)
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /wardrobe/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /suggestions/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /chat/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /shopping/i })).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    mockUsePathname.mockReturnValue('/')
    
    render(<NavBar />)
    
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /wardrobe/i })).toHaveAttribute('href', '/wardrobe')
    expect(screen.getByRole('link', { name: /suggestions/i })).toHaveAttribute('href', '/suggestions')
    expect(screen.getByRole('link', { name: /chat/i })).toHaveAttribute('href', '/chat')
    expect(screen.getByRole('link', { name: /shopping/i })).toHaveAttribute('href', '/shopping')
  })

  it('highlights active navigation item for home page', () => {
    mockUsePathname.mockReturnValue('/')
    
    render(<NavBar />)
    
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveClass('text-primary')
  })

  it('highlights active navigation item for wardrobe page', () => {
    mockUsePathname.mockReturnValue('/wardrobe')
    
    render(<NavBar />)
    
    const wardrobeLink = screen.getByRole('link', { name: /wardrobe/i })
    expect(wardrobeLink).toHaveClass('text-primary')
  })

  it('highlights active navigation item for wardrobe subpages', () => {
    mockUsePathname.mockReturnValue('/wardrobe/123')
    
    render(<NavBar />)
    
    const wardrobeLink = screen.getByRole('link', { name: /wardrobe/i })
    expect(wardrobeLink).toHaveClass('text-primary')
  })

  it('highlights active navigation item for suggestions page', () => {
    mockUsePathname.mockReturnValue('/suggestions')
    
    render(<NavBar />)
    
    const suggestionsLink = screen.getByRole('link', { name: /suggestions/i })
    expect(suggestionsLink).toHaveClass('text-primary')
  })

  it('highlights active navigation item for chat page', () => {
    mockUsePathname.mockReturnValue('/chat')
    
    render(<NavBar />)
    
    const chatLink = screen.getByRole('link', { name: /chat/i })
    expect(chatLink).toHaveClass('text-primary')
  })

  it('highlights active navigation item for shopping page', () => {
    mockUsePathname.mockReturnValue('/shopping')
    
    render(<NavBar />)
    
    const shoppingLink = screen.getByRole('link', { name: /shopping/i })
    expect(shoppingLink).toHaveClass('text-primary')
  })

  it('has proper semantic structure', () => {
    mockUsePathname.mockReturnValue('/')
    
    render(<NavBar />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders icons for each navigation item', () => {
    mockUsePathname.mockReturnValue('/')
    
    render(<NavBar />)
    
    // Check that icons are present (they should be rendered as SVG elements)
    const icons = screen.getAllByRole('img', { hidden: true })
    expect(icons.length).toBeGreaterThanOrEqual(5) // At least one icon per nav item
  })

  it('applies correct styling to navigation container', () => {
    mockUsePathname.mockReturnValue('/')
    
    render(<NavBar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0')
  })

  it('maintains consistent navigation item structure', () => {
    mockUsePathname.mockReturnValue('/')
    
    render(<NavBar />)
    
    const navLinks = screen.getAllByRole('link')
    expect(navLinks).toHaveLength(5)
    
    navLinks.forEach(link => {
      // Each nav item should have proper structure
      expect(link).toHaveClass('flex', 'flex-col', 'items-center')
    })
  })

  it('handles inactive navigation items correctly', () => {
    mockUsePathname.mockReturnValue('/profile')
    
    render(<NavBar />)
    
    const homeLink = screen.getByRole('link', { name: /home/i })
    const wardrobeLink = screen.getByRole('link', { name: /wardrobe/i })
    
    expect(homeLink).toHaveClass('text-muted-foreground')
    expect(wardrobeLink).toHaveClass('text-muted-foreground')
  })
})
