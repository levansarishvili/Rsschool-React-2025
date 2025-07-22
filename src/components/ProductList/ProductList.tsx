import { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard.tsx';
import type { ProductType } from '../../types/types.ts';
import Loader from '../loader/Loader.tsx';

type Props = {
  products: ProductType[];
  loading: boolean;
  error: string | null;
};

class ProductList extends Component<Props> {
  renderContent() {
    const { products, loading, error } = this.props;

    if (loading) return <Loader />;

    if (error)
      return (
        <div className="flex flex-col gap-4">
          <img className="w-80" src="/assets/page-error.jpg" alt="Page error" />
          <p>Error: {error}</p>
        </div>
      );

    if (products.length === 0)
      return (
        <div className="flex flex-col gap-4 justify-center items-center">
          <img
            className="w-56"
            src="/assets/item-not-found.png"
            alt="Item not found!"
          />
          <p className="text-gray-500">No products matched your search!</p>
        </div>
      );

    return products.map((product) => (
      <ProductCard key={product.id} productObj={product} />
    ));
  }

  render() {
    const { products, loading, error } = this.props;

    return (
      <section
        className={`${!loading && products.length === 0 && !error ? 'flex justify-center items-center' : 'grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}`}
      >
        {this.renderContent()}
      </section>
    );
  }
}

export default ProductList;
