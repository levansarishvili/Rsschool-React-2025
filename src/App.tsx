import { Component } from 'react';
import Search from './components/Search/Search.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import ErrorButton from './components/ErrorButton.tsx';

class App extends Component {
  // const siteUrl = import.meta.env.VITE_API_BASE_URL;
  render() {
    return (
      <div>
        <h1>rs-react-app</h1>
        <Search />
        <ProductList />
        <ErrorButton />
      </div>
    );
  }
}

export default App;
