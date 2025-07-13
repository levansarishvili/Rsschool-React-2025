export interface ProductsApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  sku: string;
  minimumOrderQuantity: number;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  reviews: Review[];
}

export interface Review {
  user: string;
  comment: string;
  rating: number;
  date: string;
  reviewerEmail: string;
  reviewerName: string;
}
