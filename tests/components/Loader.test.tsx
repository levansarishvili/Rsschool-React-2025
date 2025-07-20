import { render, screen } from '@testing-library/react';
import Loader from '../../src/components/loader/Loader';

describe('Loader Component', () => {
  it('renders loading spinner', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('has appropriate ARIA attributes for screen readers', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');

    expect(loader).toHaveAttribute('aria-label', 'Loading...');
  });
});
