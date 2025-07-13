import { Component } from 'react';
import type { ProductType } from '../../types/types.ts';

type Props = {
  productObj: ProductType;
};

class ProductCard extends Component<Props> {
  render() {
    const { productObj } = this.props;

    return (
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-semibold">{productObj.name}</h2>
        <p className="text-sm text-gray-600">{productObj.description}</p>
        <img
          src={productObj.image}
          alt={productObj.name}
          className="mt-2 w-10 h-auto object-cover"
        />
        <p className="mt-2 font-bold">${productObj.price}</p>
      </div>
    );
  }
}

export default ProductCard;
