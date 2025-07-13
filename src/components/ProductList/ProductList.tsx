import { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard';

class ProductList extends Component {
  render() {
    return (
      <section className="">
        <ul className="">
          <li>
            <ProductCard />
          </li>
        </ul>
      </section>
    );
  }
}

export default ProductList;
