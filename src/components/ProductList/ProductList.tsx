import { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard.tsx';
import type { ProductType } from '../../types/types.ts';

type Props = {
  products: ProductType[];
  loading: boolean;
  error: string | null;
};

class ProductList extends Component<Props> {
  render() {
    const { products, loading, error } = this.props;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} productObj={product} />
        ))}
      </section>
    );
  }
}

export default ProductList;
