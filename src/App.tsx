import { Component } from 'react';
import Search from './components/Search/Search.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import ErrorButton from './components/ErrorButton.tsx';
import type { ProductsApiResponse, AppState } from './types/types.ts';
import ErrorBoundary from './components/ErrorBoundary.tsx';

import './loader.css';

class App extends Component<AppState> {
  state = {
    products: [],
    loading: true,
    error: null,
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchProducts();
  }

  // Product fetch method
  fetchProducts = async (query = 'ball') => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const searchQuery = localStorage.getItem('searchQuery') || '';

    try {
      const term = searchQuery || query;
      const response = await fetch(
        `${apiUrl}products/search?q=${encodeURIComponent(term)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch products!');
      }
      const data: ProductsApiResponse = await response.json();

      // Extract
      const productsData = data.products.map((product) => {
        return {
          id: product.id,
          name: product.title,
          description: product.description,
          image: product.images[0],
          price: product.price,
        };
      });

      this.setState({ products: productsData || [], loading: false });
    } catch (error) {
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Fetch error:', errorMessage);
      this.setState({ error: errorMessage, loading: false });
    }
  };

  // Handle product search
  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, loading: true }, () => {
      this.fetchProducts(query);
    });
  };

  render() {
    const { products, loading, error, searchQuery } = this.state;

    return (
      <ErrorBoundary>
        <div className="font-poppins text-base w-full px-4 md:px-8 py-4 md:py-6 flex flex-col gap-6 md:gap-10 justify-center min-h-screen">
          <h1 className="text-lg md:text-xl text-center font-semibold">
            RS-React-App
          </h1>

          <Search searchQuery={searchQuery} onSearch={this.handleSearch} />

          <div className="w-full flex-1 flex justify-center items-center min-h-[300px]">
            {loading && <div className="loader"></div>}

            {!loading && products.length === 0 && !error && (
              <div className="flex flex-col gap-4 justify-center items-center">
                <img
                  className="w-36"
                  src="./assets/item-not-found.jpg"
                  alt="Item not found!"
                />
                <p className="text-gray-500">
                  No products matched your search!
                </p>
              </div>
            )}

            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && products.length > 0 && (
              <ProductList
                products={products}
                loading={loading}
                error={error}
              />
            )}
          </div>

          <ErrorButton />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
