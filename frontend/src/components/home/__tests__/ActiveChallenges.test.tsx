import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActiveChallenges from '../ActiveChallenges';

describe('ActiveChallenges Component', () => {
  it('renders the main heading', () => {
    render(<ActiveChallenges />);

    expect(
      screen.getByRole('heading', { name: 'Active Challenges' }),
    ).toBeInTheDocument();
  });

  it('renders all challenge cards', () => {
    render(<ActiveChallenges />);

    expect(screen.getByText('Monochrome Monday')).toBeInTheDocument();
    expect(screen.getByText('Color Pop Week')).toBeInTheDocument();
    expect(screen.getByText('Sustainable Style')).toBeInTheDocument();
  });

  it('displays challenge descriptions', () => {
    render(<ActiveChallenges />);

    expect(screen.getByText('Wear a single color outfit')).toBeInTheDocument();
    expect(
      screen.getByText('Use eco-friendly fashion choices'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Add vibrant colors to your outfits'),
    ).toBeInTheDocument();
  });

  it('shows challenge difficulty levels', () => {
    render(<ActiveChallenges />);

    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('displays progress information', () => {
    render(<ActiveChallenges />);

    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('renders progress bars with correct values', () => {
    render(<ActiveChallenges />);

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(3);

    // Check specific progress values
    expect(progressBars[0]).toHaveAttribute('aria-valuenow', '75');
    expect(progressBars[1]).toHaveAttribute('aria-valuenow', '40');
    expect(progressBars[2]).toHaveAttribute('aria-valuenow', '20');
  });

  it('has proper semantic structure', () => {
    render(<ActiveChallenges />);

    expect(
      screen.getByRole('region', { name: 'Active challenges' }),
    ).toBeInTheDocument();

    const challengeCards = screen.getAllByRole('article');
    expect(challengeCards).toHaveLength(3);
  });

  it('applies correct difficulty styling', () => {
    render(<ActiveChallenges />);

    const easyBadge = screen.getByText('Easy');
    const mediumBadge = screen.getByText('Medium');
    const hardBadge = screen.getByText('Hard');

    expect(easyBadge).toHaveClass('bg-green-100');
    expect(mediumBadge).toHaveClass('bg-yellow-100');
    expect(hardBadge).toHaveClass('bg-red-100');
  });

  it('renders reward information', () => {
    render(<ActiveChallenges />);

    expect(screen.getByText('🏆 50 XP')).toBeInTheDocument();
    expect(screen.getByText('🎨 75 XP')).toBeInTheDocument();
    expect(screen.getByText('⭐ 100 XP')).toBeInTheDocument();
  });

  it('has accessible challenge cards', async () => {
    const user = userEvent.setup();
    render(<ActiveChallenges />);

    const challengeCards = screen.getAllByRole('article');

    // Check that cards are interactive
    await user.hover(challengeCards[0]);
    expect(challengeCards[0]).toHaveClass('cursor-pointer');
  });

  it('displays time remaining for challenges', () => {
    render(<ActiveChallenges />);

    expect(screen.getByText('4 days left')).toBeInTheDocument();
    expect(screen.getByText('5 days left')).toBeInTheDocument();
    expect(screen.getByText('2 weeks left')).toBeInTheDocument();
  });

  it('renders challenge icons', () => {
    render(<ActiveChallenges />);

    // Check for emoji icons in challenges
    expect(screen.getByText('✨')).toBeInTheDocument();
    expect(screen.getByText('🌈')).toBeInTheDocument();
    expect(screen.getByText('👗')).toBeInTheDocument();
  });

  it('has consistent card layout', () => {
    render(<ActiveChallenges />);

    const challengeCards = screen.getAllByRole('article');

    challengeCards.forEach((card) => {
      expect(card).toHaveClass('group', 'cursor-pointer');

      // Each card should have a header and content
      const header = card.querySelector('.flex.items-start.justify-between');
      const content = card.querySelector('.space-y-4');

      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  it('maintains proper spacing and layout', () => {
    render(<ActiveChallenges />);

    const challengesContainer = screen.getByRole('region', {
      name: 'Active challenges',
    });
    const challengesList = challengesContainer.querySelector('.space-y-4');

    expect(challengesList).toBeInTheDocument();
    expect(challengesList).toHaveClass('space-y-4');
  });
});
