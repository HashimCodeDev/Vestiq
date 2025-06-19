import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuickActions from '../QuickActions'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
})

describe('QuickActions Component', () => {
  it('renders all quick action items', () => {
    render(<QuickActions />)

    // Check for all action titles
    expect(screen.getByText('Add Items')).toBeInTheDocument()
    expect(screen.getByText('Outfit Builder')).toBeInTheDocument()
    expect(screen.getByText('Style Chat')).toBeInTheDocument()
    expect(screen.getByText('Challenges')).toBeInTheDocument()
  })

  it('renders action descriptions', () => {
    render(<QuickActions />)

    expect(screen.getByText('Snap & categorize')).toBeInTheDocument()
    expect(screen.getByText('Mix & match')).toBeInTheDocument()
    expect(screen.getByText('AI styling tips')).toBeInTheDocument()
    expect(screen.getByText('Daily style goals')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<QuickActions />)

    expect(screen.getByRole('link', { name: /add items/i })).toHaveAttribute('href', '/wardrobe')
    expect(screen.getByRole('link', { name: /outfit builder/i })).toHaveAttribute('href', '/suggestions')
    expect(screen.getByRole('link', { name: /style chat/i })).toHaveAttribute('href', '/chat')
    expect(screen.getByRole('link', { name: /challenges/i })).toHaveAttribute('href', '/challenges')
  })

  it('renders with proper semantic structure', () => {
    render(<QuickActions />)

    expect(screen.getByRole('region', { name: 'Quick actions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Quick Actions' })).toBeInTheDocument()
  })

  it('has accessible action cards', async () => {
    const user = userEvent.setup()
    render(<QuickActions />)

    const addItemsLink = screen.getByRole('link', { name: /add items/i })
    
    // Check that the link is focusable
    await user.tab()
    expect(addItemsLink).toHaveFocus()
  })

  it('renders icons for each action', () => {
    render(<QuickActions />)

    // Check that icons are present (they should be rendered as SVG elements)
    const icons = screen.getAllByRole('img', { hidden: true })
    expect(icons).toHaveLength(4) // One icon per action
  })

  it('applies correct styling classes', () => {
    render(<QuickActions />)

    const quickActionsSection = screen.getByRole('region', { name: 'Quick actions' })
    expect(quickActionsSection).toHaveClass('space-y-6')
  })

  it('has proper grid layout for actions', () => {
    render(<QuickActions />)

    // Check that the grid container exists
    const gridContainer = screen.getByRole('region', { name: 'Quick actions' }).querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('grid-cols-2')
  })

  it('renders action cards with hover effects', () => {
    render(<QuickActions />)

    const actionCards = screen.getAllByRole('link')
    actionCards.forEach(card => {
      expect(card).toHaveClass('group')
    })
  })

  it('maintains consistent action structure', () => {
    render(<QuickActions />)

    const actionLinks = screen.getAllByRole('link')
    expect(actionLinks).toHaveLength(4)

    // Each action should have a title and description
    actionLinks.forEach(link => {
      const title = link.querySelector('h3')
      const description = link.querySelector('p')
      expect(title).toBeInTheDocument()
      expect(description).toBeInTheDocument()
    })
  })
})
