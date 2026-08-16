import { theme } from "antd";
import type { ThemeConfig } from "antd";
import type { CSSProperties } from "react";

export const globalTheme: ThemeConfig = {
  // Apply dark mode across all components globally
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#3b82f6", // Blue primary
    borderRadius: 8, // Rounded corners globally
    colorBgContainer: "#1e293b", // Slate background for cards/modals
  },
};

export const LAYOUT_CONSTANTS = {
  contentStyle: {
    maxWidth: 1400,
    margin: "0 auto",
  } as CSSProperties,
};
