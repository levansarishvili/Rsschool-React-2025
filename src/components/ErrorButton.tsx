import { Component } from 'react';
import { TriangleAlert } from 'lucide-react';

class ErrorButton extends Component {
  throwError = () => {
    throw new Error('Simulated crash');
  };

  render() {
    return (
      <section className="flex justify-end">
        <button
          className="flex gap-2 bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition-colors"
          onClick={this.throwError}
        >
          <TriangleAlert />
          Throw Error
        </button>
      </section>
    );
  }
}

export default ErrorButton;
