import React from "react";
import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

const { Header, Content } = Layout;

export const MainLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    queryClient.clear();
  };

  return (
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#fff" }}>Welcome, {user?.name}</span>
          <Button type="primary" danger size="small" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Header>
      <Content>
        {/* <Outlet /> is where your nested routes (like Dashboard) will render */}
        <Outlet />
      </Content>
    </Layout>
  );
};
