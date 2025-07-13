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

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.input);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search product here"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
