import { render, screen } from '@testing-library/react';
import type { ProductType } from '../../src/types/types';
import ProductCard from '../../src/components/ProductCard/ProductCard';

const mockProduct: ProductType = {
  id: 1,
  name: 'Test Product',
  description: 'This is a test product description.',
  price: 300,
  image:
    'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
  rating: 4.5,
};

describe('ProductCard Component', () => {
  it('renders product name and description correctly', () => {
    render(<ProductCard productObj={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test product description.')
    ).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  it('renders correct number of stars based on rating', () => {
    render(<ProductCard productObj={mockProduct} />);
    const stars = screen.getAllByTestId('star-icon');

    expect(stars.length).toBe(Math.round(mockProduct.rating));
  });

  it('renders image with correct alt text', () => {
    render(<ProductCard productObj={mockProduct} />);
    const img = screen.getByRole('img') as HTMLImageElement;

    expect(img).toHaveAttribute('src', mockProduct.image);
    expect(img).toHaveAttribute('alt', mockProduct.name);
  });

  it('handles missing props gracefully (failsafe)', () => {
    // @ts-expect-error intentionally leaving out props
    expect(() => render(<ProductCard />)).toThrow();
  });
});
