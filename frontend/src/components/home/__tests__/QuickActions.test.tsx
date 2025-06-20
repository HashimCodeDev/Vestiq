import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import QuickActions from '../QuickActions';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('QuickActions Component', () => {
  it('renders all quick action items', () => {
    render(<QuickActions />);

    // Check for all action titles
    expect(screen.getByText('Add Items')).toBeInTheDocument();
    expect(screen.getByText('Outfit Builder')).toBeInTheDocument();
    expect(screen.getByText('Style Insights')).toBeInTheDocument();
    expect(screen.getByText('AI Stylist')).toBeInTheDocument();
  });

  it('renders action descriptions', () => {
    render(<QuickActions />);

    expect(screen.getByText('Snap & categorize')).toBeInTheDocument();
    expect(screen.getByText('Mix & match')).toBeInTheDocument();
    expect(screen.getByText('Trends & analytics')).toBeInTheDocument();
    expect(screen.getByText('Get personalized tips')).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    render(<QuickActions />);

    expect(screen.getByRole('link', { name: /add items/i })).toHaveAttribute(
      'href',
      '/wardrobe',
    );
    expect(
      screen.getByRole('link', { name: /outfit builder/i }),
    ).toHaveAttribute('href', '/suggestions');
    expect(
      screen.getByRole('link', { name: /style insights/i }),
    ).toHaveAttribute('href', '/analytics');
    expect(screen.getByRole('link', { name: /ai stylist/i })).toHaveAttribute(
      'href',
      '/chat',
    );
  });

  it('renders with proper semantic structure', () => {
    render(<QuickActions />);

    expect(
      screen.getByRole('heading', { name: 'Quick Actions' }),
    ).toBeInTheDocument();
  });

  it('has accessible action cards', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);

    const addItemsLink = screen.getByRole('link', { name: /add items/i });

    // Check that the link is focusable
    await user.tab();
    expect(addItemsLink).toHaveFocus();
  });

  it('renders icons for each action', () => {
    render(<QuickActions />);

    // Check that SVG icons are present
    const { container } = render(<QuickActions />);
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('applies correct styling classes', () => {
    render(<QuickActions />);

    const { container } = render(<QuickActions />);
    const mainContainer = container.querySelector('.space-y-6');
    expect(mainContainer).toBeInTheDocument();
  });

  it('has proper grid layout for actions', () => {
    render(<QuickActions />);

    const { container } = render(<QuickActions />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });

  it('renders action cards with hover effects', () => {
    render(<QuickActions />);

    const actionCards = screen.getAllByRole('link');
    actionCards.forEach((card) => {
      expect(card).toHaveClass('group');
    });
  });

  it('maintains consistent action structure', () => {
    render(<QuickActions />);

    const actionLinks = screen.getAllByRole('link');
    expect(actionLinks).toHaveLength(4);

    // Each action should have a title and description
    actionLinks.forEach((link) => {
      const title = link.querySelector('h4');
      const description = link.querySelector('p');
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });
});
