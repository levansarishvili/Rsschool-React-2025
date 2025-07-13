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

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="h-screen text-center flex flex-col gap-4 items-center justify-center">
          <h2 className="text-lg">Something went wrong!</h2>
          <img className="w-72" src="./assets/page-error.jpg" alt="" />
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
