import { Component } from 'react';
import { X } from 'lucide-react';

type Props = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

type State = {
  input: string;
};

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.state = { input: savedQuery };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = this.state.input.trim();
    this.props.onSearch(query);

    localStorage.setItem('searchQuery', query);
  };

  render() {
    return (
      <form
        className="flex gap-6 md:gap-12 justify-between"
        onSubmit={this.handleSubmit}
      >
        <div className="relative w-full">
          <input
            className="w-full border rounded-md px-4 py-2 text-sm outline-primary placeholder:text-sm placeholder:italic pr-10"
            type="text"
            aria-label="Search for products"
            placeholder="Search for products (e.g. Samsung, Apple, Watch, Ball, Sport)"
            value={this.state.input}
            onChange={this.handleChange}
          />

          {this.state.input && (
            <button
              type="button"
              onClick={() => this.setState({ input: '' })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Clear input"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        <button
          className="bg-primary text-white text-sm w-28 rounded-md hover:bg-secondary transition-all duration-200"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
