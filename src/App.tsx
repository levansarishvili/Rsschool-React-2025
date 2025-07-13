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
  fetchProducts = async (query = 'phone') => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    // const searchQuery = localStorage.getItem('searchQuery') && '';

    try {
      const response = await fetch(`${apiUrl}products/search?q=${query}`);
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
          image: product.thumbnail,
          price: product.price,
        };
      });
      console.log(productsData);

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
        <div>
          <h1>rs-react-app</h1>
          <Search searchQuery={searchQuery} onSearch={this.handleSearch} />
          <div>
            {loading && <div className="loader"></div>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
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
