import { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard.tsx';

type Product = {
  id: number;
  title: string;
  // etc.
};

type Props = {
  products: Product[];
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
          <ProductCard nameproduct />
        ))}
      </section>
    );
  }
}

export default ProductList;
