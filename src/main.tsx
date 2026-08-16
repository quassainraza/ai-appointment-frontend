import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { ConfigProvider } from "antd";
import { globalTheme } from "./theme";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache queries for 5 minutes
      gcTime: 1000 * 60 * 15, // Garbage collect unused data after 15 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Prevent unnecessary refetches on browser tab focus
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConfigProvider theme={globalTheme}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
