import { Component } from 'react';
import type { ProductType } from '../../types/types.ts';
import { Star } from 'lucide-react';

type Props = {
  productObj: ProductType;
};

class ProductCard extends Component<Props> {
  render() {
    const { productObj } = this.props;

    return (
      <div
        data-testid="product-card"
        className="flex flex-col gap-2 justify-between items-center min-w-56 border p-4 rounded-md hover:shadow hover:bg-[#f5f3ff] transition-all duration-200 cursor-pointer"
      >
        <img
          src={productObj.image}
          alt={productObj.name}
          className="w-24 h-auto object-cover"
        />
        <h2 className="text-base font-semibold">{productObj.name}</h2>
        <p
          title={productObj.description}
          className="text-xs md:text-sm text-gray-600 line-clamp-4"
        >
          {productObj.description}
        </p>

        <p className="text-sm md:text-base   font-semibold">
          ${Math.round(productObj.price)}
        </p>

        <div className="flex">
          {Array.from({ length: Math.round(productObj?.rating) }, (_, i) => (
            <Star
              className="size-4 stroke-yellow-600 fill-yellow-600"
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductCard;
