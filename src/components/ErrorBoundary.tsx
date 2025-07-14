import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="h-screen text-center flex flex-col gap-4 items-center justify-center">
          <img
            className="w-80"
            src="./assets/page-error.jpg"
            alt="Page error"
          />
          <h2 className="text-lg">Oops! Something went wrong.</h2>
          <p>{this.state.error.message}</p>
          <button
            className="w-24 text-white bg-primary rounded-md p-2"
            onClick={this.handleReload}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
