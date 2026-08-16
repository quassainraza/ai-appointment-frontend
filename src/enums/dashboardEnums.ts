import { theme } from "antd";
import type { ThemeConfig } from "antd";
import type { CSSProperties } from "react";

export const DASHBOARD_THEME: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#3b82f6", // Blue primary
    borderRadius: 8,
    colorBgContainer: "#1e293b", // Slate background
  },
};

export const CONTENT_STYLE: CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
};
