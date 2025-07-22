import { render, screen } from '@testing-library/react';
import ProductList from '../../src/components/ProductList/ProductList';
import type { ProductType } from '../../src/types/types';

describe('ProductList Component', () => {
  const mockProducts: ProductType[] = [
    {
      id: 1,
      name: 'Phone',
      description: 'Smartphone',
      price: 300,
      image:
        'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Laptop',
      description: 'Gaming laptop',
      price: 1500,
      image:
        'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
      rating: 4.8,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correct number of product cards when data is provided', () => {
    render(
      <ProductList products={mockProducts} loading={false} error={null} />
    );
    const cards = screen.getAllByTestId('product-card');

    expect(cards).toHaveLength(2);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('displays "no products" message when product array is empty', () => {
    render(<ProductList products={[]} loading={false} error={null} />);

    expect(screen.getByText(/no products matched/i)).toBeInTheDocument();
    expect(screen.getByAltText(/item not found/i)).toBeInTheDocument();
  });

  it('shows loader when loading is true', () => {
    render(<ProductList products={[]} loading={true} error={null} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays product names correctly', () => {
    render(
      <ProductList products={mockProducts} loading={false} error={null} />
    );

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Gaming laptop')).toBeInTheDocument();
  });

  it('handles empty product list gracefully', () => {
    render(<ProductList products={[]} loading={false} error={null} />);

    expect(screen.getByText(/no products matched/i)).toBeInTheDocument();
  });

  it('displays error message when error is present', () => {
    render(
      <ProductList products={[]} loading={false} error="Failed to fetch" />
    );

    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
    expect(screen.getByAltText(/page error/i)).toBeInTheDocument();
  });

  it('prioritizes loading over error and product list', () => {
    render(
      <ProductList products={mockProducts} loading={true} error="Some error" />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText(/error:/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
  });
});
