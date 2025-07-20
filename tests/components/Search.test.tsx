// import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from '../../src/components/Search/Search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the input and button', () => {
    render(<Search searchQuery="" onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText(/search for products/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('loads saved query from localStorage', () => {
    localStorage.setItem('searchQuery', 'laptop');
    render(<Search searchQuery="" onSearch={() => {}} />);
    expect(screen.getByDisplayValue('laptop')).toBeInTheDocument();
  });
});
