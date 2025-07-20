import { Component } from 'react';
import Search from './components/Search/Search.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import ErrorButton from './components/ErrorButton.tsx';
import type { AppState } from './types/types.ts';
import { IoLogoGithub } from 'react-icons/io';
import { fetchProductsApi } from './services/api.ts';
import { transformProducts } from './utils/transform.ts';

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

  fetchProducts = async (query = 'ball') => {
    try {
      const data = await fetchProductsApi(query);
      const productsData = transformProducts(data.products);
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

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, loading: true }, () => {
      this.fetchProducts(query);
    });
  };

  render() {
    const { products, loading, error, searchQuery } = this.state;

    return (
      <div className="font-inter text-base w-full px-4 md:px-8 pt-4 md:pt-6 flex flex-col gap-6 md:gap-10 justify-center min-h-screen">
        <header className="flex flex-col gap-6 md:gap-10">
          <h1 className="text-lg md:text-xl text-center font-semibold">
            RS-React-App
          </h1>

          <Search searchQuery={searchQuery} onSearch={this.handleSearch} />
        </header>

        <main className="w-full flex-1 flex justify-center items-center min-h-[300px]">
          <ProductList products={products} loading={loading} error={error} />
        </main>

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
