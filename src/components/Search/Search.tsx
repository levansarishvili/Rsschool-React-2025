import { Component } from 'react';

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

  // Handle input change
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  // Handle form submit
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = this.state.input.trim();
    this.props.onSearch(query);

    // Store searchQuery in local storage
    localStorage.setItem('searchQuery', query);
  };

  render() {
    return (
      <form
        className="flex gap-6 md:gap-12 justify-between"
        onSubmit={this.handleSubmit}
      >
        <input
          className="w-full border rounded-md px-4 py-2 text-sm outline-primary placeholder:text-sm placeholder:italic"
          type="text"
          placeholder="Search for products (e.g. Samsung, Apple, Watch, Ball, Sport)"
          value={this.state.input}
          onChange={this.handleChange}
        />
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
