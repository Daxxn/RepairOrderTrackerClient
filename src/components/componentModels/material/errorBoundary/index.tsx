import React, { Component, ErrorInfo, ReactNode } from 'react';
import './errorBoundary.css';

interface ErrorBoundryProps {
  children?: ReactNode;
  error?: Error;
  errorInfo?: ErrorInfo;
}

type ErrorBoundryState = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

class ErrorBoundary extends Component<ErrorBoundryProps, ErrorBoundryState> {
  constructor(props: ErrorBoundryProps) {
    super(props);
    this.state = { error: props.error, errorInfo: props.errorInfo };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      // Error path
      return (
        <div className="Base-error-boundary">
          <h2>Something went wrong.</h2>
          <details className="Details-error-boundary">
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return <>{children}</>;
  }
}

export default ErrorBoundary;
