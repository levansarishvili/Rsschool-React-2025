import type { ProductsApiResponse } from '../types/types.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsApi = async (
  query = 'ball'
): Promise<ProductsApiResponse> => {
  const term = localStorage.getItem('searchQuery') || query;

  const response = await fetch(
    `${API_URL}products/search?q=${encodeURIComponent(term)}&limit=12`
  );

  if (!response.ok) {
    throw new Error(
      `${response.status} (${response.statusText}): Unable to fetch products for "${term}".`
    );
  }

  return await response.json();
};
