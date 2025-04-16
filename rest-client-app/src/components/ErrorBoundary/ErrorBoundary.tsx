'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  fallbackTitle: string;
  fallbackDescription: string;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { fallbackTitle, fallbackDescription } = this.props;

    if (this.state.hasError) {
      return (
        <div className="flex items-start justify-center max-w-7xl mx-auto w-full px-4 m-auto">
          <div className="flex flex-col items-center gap-4 max-w-2xl w-full p-4 bg-red-100 text-red-800 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">{fallbackTitle}</h2>
            <p>{fallbackDescription}</p>
            <pre className="text-sm text-red-600">
              {this.state.error?.message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
