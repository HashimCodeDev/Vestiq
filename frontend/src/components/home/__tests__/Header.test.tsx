import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUserInfo } from '@/hooks/useUserInfo';
import Header from '../Header';

// Mock the useUserInfo hook
jest.mock('@/hooks/useUserInfo');
const mockUseUserInfo = useUserInfo as jest.MockedFunction<typeof useUserInfo>;

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

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock Date to ensure consistent greeting
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01 10:00:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders morning greeting correctly', () => {
    mockUseUserInfo.mockReturnValue({
      displayName: 'John Doe',
      photoURL: 'https://example.com/photo.jpg',
      email: 'john@example.com',
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText('Good Morning, John Doe')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Good Morning emoji' }),
    ).toBeInTheDocument();
  });

  it('renders afternoon greeting correctly', () => {
    jest.setSystemTime(new Date('2024-01-01 14:00:00'));

    mockUseUserInfo.mockReturnValue({
      displayName: 'Jane Smith',
      photoURL: null,
      email: 'jane@example.com',
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText('Good Afternoon, Jane Smith')).toBeInTheDocument();
  });

  it('renders evening greeting correctly', () => {
    jest.setSystemTime(new Date('2024-01-01 19:00:00'));

    mockUseUserInfo.mockReturnValue({
      displayName: 'Bob Wilson',
      photoURL: null,
      email: 'bob@example.com',
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText('Good Evening, Bob Wilson')).toBeInTheDocument();
  });

  it('renders default name when displayName is not available', () => {
    mockUseUserInfo.mockReturnValue({
      displayName: null,
      photoURL: null,
      email: 'user@example.com',
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText('Good Morning, Fashionista')).toBeInTheDocument();
  });

  it('renders user level badge', () => {
    mockUseUserInfo.mockReturnValue({
      displayName: 'Test User',
      photoURL: null,
      email: 'test@example.com',
      loading: false,
    });

    render(<Header />);

    expect(
      screen.getByRole('status', {
        name: 'User level: Level 3 Sartorial Sorcerer',
      }),
    ).toBeInTheDocument();
  });

  it('renders profile link with correct accessibility attributes', () => {
    mockUseUserInfo.mockReturnValue({
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      email: 'test@example.com',
      loading: false,
    });

    render(<Header />);

    const profileLink = screen.getByRole('link', {
      name: 'Go to Test User profile',
    });
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '/profile');
  });

  it('renders avatar with user photo when available', () => {
    mockUseUserInfo.mockReturnValue({
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      email: 'test@example.com',
      loading: false,
    });

    render(<Header />);

    const avatar = screen.getByRole('img', {
      name: 'Test User profile picture',
    });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('renders fallback avatar when photo is not available', () => {
    mockUseUserInfo.mockReturnValue({
      displayName: 'Test User',
      photoURL: null,
      email: 'test@example.com',
      loading: false,
    });

    render(<Header />);

    // Avatar fallback should show initials
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    mockUseUserInfo.mockReturnValue({
      displayName: 'Test User',
      photoURL: null,
      email: 'test@example.com',
      loading: false,
    });

    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
