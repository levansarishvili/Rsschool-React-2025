import { Component } from 'react';

class ErrorButton extends Component {
  throwError = () => {
    throw Error();
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
