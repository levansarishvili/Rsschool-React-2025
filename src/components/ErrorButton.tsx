import { Component } from 'react';

class ErrorButton extends Component {
  state = { crash: false };

  handleClick = () => this.setState({ crash: true });

  render() {
    if (this.state.crash) {
      throw new Error(
        'Simulated render crash: This error was thrown intentionally to test the Error Boundary.'
      );
    }

    return (
      <button
        className="text-sm flex gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors"
        onClick={this.handleClick}
      >
        Test Error Boundary
      </button>
    );
  }
}

export default ErrorButton;
