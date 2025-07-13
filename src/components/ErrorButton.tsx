import { Component } from 'react';
import { TriangleAlert } from 'lucide-react';

class ErrorButton extends Component {
  state = { crash: false };

  // Handle error button click
  handleClick = () => this.setState({ crash: true });

  render() {
    if (this.state.crash) {
      throw new Error(
        'Simulated render crash: This error was thrown intentionally to test the Error Boundary.'
      );
    }

    return (
      <button
        className="flex gap-2 bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition-colors"
        onClick={this.handleClick}
      >
        <TriangleAlert />
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
