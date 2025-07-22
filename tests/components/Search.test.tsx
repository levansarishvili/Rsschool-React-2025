import { render, screen } from '@testing-library/react';
import Search from '../../src/components/Search/Search';
import userEvent from '@testing-library/user-event';

describe('Search Component', () => {
  const user = userEvent.setup();
  const getInput = () => screen.getByPlaceholderText(/search for products/i);
  const getSearchButton = () => screen.getByRole('button', { name: /search/i });

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and button', () => {
    render(<Search searchQuery="" onSearch={() => {}} />);

    expect(getInput()).toBeInTheDocument();
    expect(getSearchButton()).toBeInTheDocument();
  });

  it('displays saved search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'phone');
    render(<Search searchQuery="" onSearch={() => {}} />);

    expect(getInput()).toHaveValue('phone');
  });

  it('shows empty input if no saved term exists', () => {
    render(<Search searchQuery="" onSearch={() => {}} />);

    expect(getInput()).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    render(<Search searchQuery="" onSearch={() => {}} />);
    await user.type(getInput(), 'laptop');

    expect(getInput()).toHaveValue('laptop');
  });

  it('clears input when clear button is clicked', async () => {
    render(<Search searchQuery="" onSearch={() => {}} />);
    await user.type(getInput(), 'apple');
    const clearButton = screen.getByRole('button', { name: /clear input/i });
    await user.click(clearButton);

    expect(getInput()).toHaveValue('');
  });

  it('trims whitespace before saving and calling onSearch', async () => {
    const mockSearch = vi.fn();
    render(<Search searchQuery="" onSearch={mockSearch} />);
    await user.type(getInput(), '   macbook   ');
    await user.click(getSearchButton());

    expect(mockSearch).toHaveBeenCalledWith('macbook');
    expect(localStorage.getItem('searchQuery')).toBe('macbook');
  });

  it('saves search term to localStorage on submit', async () => {
    render(<Search searchQuery="" onSearch={() => {}} />);
    await user.type(getInput(), 'tablet');
    await user.click(getSearchButton());

    expect(localStorage.getItem('searchQuery')).toBe('tablet');
  });

  it('overwrites existing localStorage value with new search', async () => {
    localStorage.setItem('searchQuery', 'old value');
    render(<Search searchQuery="" onSearch={() => {}} />);
    await user.clear(getInput());
    await user.type(getInput(), 'new value');
    await user.click(getSearchButton());

    expect(localStorage.getItem('searchQuery')).toBe('new value');
  });

  it('calls onSearch with correct query', async () => {
    const mockSearch = vi.fn();
    render(<Search searchQuery="" onSearch={mockSearch} />);
    await user.type(getInput(), 'samsung');
    await user.click(getSearchButton());

    expect(mockSearch).toHaveBeenCalledWith('samsung');
  });
});
