import { Component } from 'react';

class ErrorButton extends Component {
  throwError = () => {
    throw new Error('Simulated crash');
  };

  render() {
    return (
      <section className="">
        <button className="" onClick={this.throwError}>
          Throw Error
        </button>
      </section>
    );
  }
}

export default ErrorButton;
