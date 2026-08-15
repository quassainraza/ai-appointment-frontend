import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { useAuthStore } from "./store/useAuthStore";

import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Dashboard } from "./pages/Dashboard/Dashboard";

const { Header, Content } = Layout;

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#001529",
            padding: "0 32px",
          }}
        >
          <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            AI Appointment App
          </div>
          {isAuthenticated && (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#fff" }}>Welcome, {user?.name}</span>
              <Button type="primary" danger size="small" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </Header>

        <Content>
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
