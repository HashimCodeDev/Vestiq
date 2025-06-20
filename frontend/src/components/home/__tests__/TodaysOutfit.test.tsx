import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TodaysOutfit from '../TodaysOutfit';

describe('TodaysOutfit Component', () => {
  it('renders the main heading', () => {
    render(<TodaysOutfit />);

    expect(
      screen.getByRole('heading', { name: "Today's Perfect Match" }),
    ).toBeInTheDocument();
  });

  it('displays outfit mood badge', () => {
    render(<TodaysOutfit />);

    expect(
      screen.getByRole('status', { name: 'Outfit mood: Professional' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
  });

  it('renders all outfit items', () => {
    render(<TodaysOutfit />);

    expect(screen.getByText('Navy Blazer')).toBeInTheDocument();
    expect(screen.getByText('White Blouse')).toBeInTheDocument();
    expect(screen.getByText('Black Jeans')).toBeInTheDocument();
    expect(screen.getByText('Leather Boots')).toBeInTheDocument();
  });

  it('displays confidence score', () => {
    render(<TodaysOutfit />);

    expect(screen.getByText('95% Confidence')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<TodaysOutfit />);

    expect(
      screen.getByRole('button', {
        name: /shuffle to get a new outfit recommendation/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /mark this outfit as loved and save to favorites/i,
      }),
    ).toBeInTheDocument();
  });

  it('handles shuffle button click', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const user = userEvent.setup();

    render(<TodaysOutfit />);

    const shuffleButton = screen.getByRole('button', {
      name: /shuffle outfit/i,
    });
    await user.click(shuffleButton);

    expect(consoleSpy).toHaveBeenCalledWith('Shuffling outfit...');

    consoleSpy.mockRestore();
  });

  it('handles love it button click', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const user = userEvent.setup();

    render(<TodaysOutfit />);

    const loveButton = screen.getByRole('button', { name: /love it/i });
    await user.click(loveButton);

    expect(consoleSpy).toHaveBeenCalledWith('Loved outfit!');

    consoleSpy.mockRestore();
  });

  it('has proper semantic structure', () => {
    render(<TodaysOutfit />);

    expect(
      screen.getByRole('region', { name: "Today's outfit items" }),
    ).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4); // One for each outfit item
  });

  it('displays weather information', () => {
    render(<TodaysOutfit />);

    expect(screen.getByText('22°C, Sunny')).toBeInTheDocument();
  });

  it('renders confidence progress bar', () => {
    render(<TodaysOutfit />);

    const progressBar = screen.getByRole('progressbar', {
      name: 'Outfit confidence level',
    });
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '95');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('applies correct styling to outfit items', () => {
    render(<TodaysOutfit />);

    const outfitGrid = screen.getByRole('list');
    expect(outfitGrid.parentElement).toHaveClass(
      'grid',
      'grid-cols-2',
      'sm:grid-cols-4',
    );
  });

  it('has accessible button labels', () => {
    render(<TodaysOutfit />);

    const shuffleButton = screen.getByRole('button', {
      name: /shuffle outfit/i,
    });
    const loveButton = screen.getByRole('button', { name: /love it/i });

    expect(shuffleButton).toHaveAttribute('aria-label');
    expect(loveButton).toHaveAttribute('aria-label');
  });

  it('renders emojis for outfit items', () => {
    render(<TodaysOutfit />);

    // Check that emojis are present for each item type
    expect(screen.getByText('🧥')).toBeInTheDocument(); // Blazer
    expect(screen.getByText('👔')).toBeInTheDocument(); // Blouse
    expect(screen.getByText('👖')).toBeInTheDocument(); // Jeans
    expect(screen.getByText('🥾')).toBeInTheDocument(); // Boots
  });

  it('maintains consistent card structure', () => {
    render(<TodaysOutfit />);

    const card = screen
      .getByRole('region', { name: "Today's outfit items" })
      .closest('.bg-white\\/40');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('backdrop-blur-sm', 'rounded-xl');
  });
});
