import { Component } from 'react';

type Props = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

class Search extends Component<Props> {
  state = { input: this.props.searchQuery };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = this.state.input.trim();
    if (!query) return;
    this.props.onSearch(query);
    localStorage.setItem('searchQuery', query);
    this.setState({ input: '' });
  };

  render() {
    return (
      <form
        className="flex gap-6 md:gap-12 justify-between"
        onSubmit={this.handleSubmit}
      >
        <input
          className="w-full border rounded-md px-4 py-2 text-sm outline-[#6d28d9]"
          type="text"
          placeholder="Search product here"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button
          className="bg-[#6d28d9] text-white text-sm w-28 rounded-md hover:bg-[#7c3aed] transition-all duration-200"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
