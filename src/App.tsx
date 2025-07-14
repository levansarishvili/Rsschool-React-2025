import { Component } from 'react';
import Search from './components/Search/Search.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import ErrorButton from './components/ErrorButton.tsx';
import type { ProductsApiResponse, AppState } from './types/types.ts';
import { IoLogoGithub } from 'react-icons/io';
import './loader.css';

class App extends Component {
  state: AppState = {
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
        `${apiUrl}products/search?q=${encodeURIComponent(term)}&limit=12`
      );

      // If data fetching failed throw error message
      if (!response.ok) {
        throw new Error(
          `${response.status} (${response.statusText}): Unable to fetch products for "${term}".`
        );
      }
      const data: ProductsApiResponse = await response.json();

      // Extract only necessary properties
      const productsData = data.products.map((product) => {
        return {
          id: product.id,
          name: product.title,
          description: product.description,
          image: product.images[0],
          price: product.price,
          rating: product.rating,
        };
      });

      // Update component state
      this.setState({ products: productsData || [], loading: false });
    } catch (error) {
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Fetch error:', errorMessage);
      // Update state
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
      <div className="font-inter text-base w-full px-4 md:px-8 pt-4 md:pt-6 flex flex-col gap-6 md:gap-10 justify-center min-h-screen">
        {/* Search component */}
        <header className="flex flex-col gap-6 md:gap-10">
          <h1 className="text-lg md:text-xl text-center font-semibold">
            RS-React-App
          </h1>

          <Search searchQuery={searchQuery} onSearch={this.handleSearch} />
        </header>

        {/* Product list component */}
        <main className="w-full flex-1 flex justify-center items-center min-h-[300px]">
          {loading && <div className="loader"></div>}

          {!loading && products.length === 0 && !error && (
            <div className="flex flex-col gap-4 justify-center items-center">
              <img
                className="w-56"
                src="./assets/item-not-found.png"
                alt="Item not found!"
              />
              <p className="text-gray-500">No products matched your search!</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col gap-4">
              <img
                className="w-80"
                src="./assets/page-error.jpg"
                alt="Page error"
              />
              <p className="">Error: {error}</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <ProductList products={products} loading={loading} error={error} />
          )}
        </main>

        {/* Footer with error button */}
        <footer className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 text-sm">
          <a href="https://rs.school/" target="_blank" rel="noreferrer">
            <img
              className="w-8"
              src="./assets/rs-logo.svg"
              alt="Rs school logo"
            />
          </a>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/levansarishvili"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              <IoLogoGithub className="text-2xl" />
            </a>
            <p>&copy; Tbilisi 2025</p>
          </div>
          <div className="flex gap-4">
            <ErrorButton />
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
