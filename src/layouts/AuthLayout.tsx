import React from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

export const AuthLayout: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#3b82f6",
          borderRadius: 8,
          colorBgContainer: "#1e293b",
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(circle at 50% 30%, #1e293b 0%, #0f172a 100%)",
          padding: 16,
        }}
      >
        {/* The Login or Signup card will render right here */}
        <Outlet />
      </div>
    </ConfigProvider>
  );
};
