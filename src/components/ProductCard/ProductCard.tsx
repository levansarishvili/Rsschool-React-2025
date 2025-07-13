import { Component } from 'react';
import type { ProductType } from '../../types/types.ts';

type Props = {
  productObj: ProductType;
};

class ProductCard extends Component<Props> {
  render() {
    const { productObj } = this.props;

    return (
      <div className="flex flex-col gap-2 justify-between items-center min-w-56 border p-4 rounded-md hover:shadow hover:bg-[#fff7ed] transition-all duration-200 cursor-pointer">
        <img
          src={productObj.image}
          alt={productObj.name}
          className="w-16 h-auto object-cover"
        />
        <h2 className="text-base md:text-lg font-semibold">
          {productObj.name}
        </h2>
        <p
          title={productObj.description}
          className="text-xs md:text-sm text-gray-600 line-clamp-4"
        >
          {productObj.description}
        </p>

        <p className="text-sm md:text-base   font-semibold">
          ${productObj.price}
        </p>
      </div>
    );
  }
}

export default ProductCard;
