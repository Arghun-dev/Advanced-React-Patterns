import React from "react";

// This error boundary only catch the errors in rendering phase
// in case you run some code inside useEffect or any other async code you need to catch the error in that code block and handle it accordingly.
export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const Child = () => {
  throw new Error("I crashed!");
  return <h1>Child Component</h1>;
};

export const ErrorBoundaryExample = () => {
  return (
    <div>
      <h1>Parent Component</h1>
      <ErrorBoundary fallback={<div>Error in child level!</div>}>
        <Child />
      </ErrorBoundary>
    </div>
  );
};
