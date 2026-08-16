import { Component, type ErrorInfo, type ReactNode } from "react";
import { Result, Button } from "antd";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to an external service like Sentry or LogRocket
    console.error("Uncaught React Error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#0f172a",
          }}
        >
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong with the interface."
            extra={
              <Button type="primary" onClick={this.handleReset}>
                Reload Application
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
