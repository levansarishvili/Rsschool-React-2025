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
      <section>
        {products.map((product) => (
          // <div key={product.id}>{product.title}</div>
          <ProductCard key={product.id} productObj={product} />
        ))}
      </section>
    );
  }
}

export default ProductList;
