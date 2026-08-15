import React, { useMemo } from "react";
import {
  Row,
  Col,
  Typography,
  Layout,
  ConfigProvider,
  theme,
  Grid,
} from "antd";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { AppointmentForm } from "../../components/AppointmentForm/AppointmentForm";
import { AppointmentList } from "../../components/AppointmentList/AppointmentList";

const { Title } = Typography;
const { Content } = Layout;
const { useBreakpoint } = Grid;

// 1. Move static theme config outside the component to preserve reference equality
const DASHBOARD_THEME = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#3b82f6",
    borderRadius: 8,
    colorBgContainer: "#1e293b",
  },
};

// 2. Move static container styles outside component scope
const CONTENT_STYLE: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
};

export const Dashboard: React.FC = () => {
  const screens = useBreakpoint();

  // 3. Memoize dynamic layout styles dependent on viewport width
  const wrapperStyle = useMemo<React.CSSProperties>(
    () => ({
      minHeight: "100vh",
      width: "100%",
      background:
        "radial-gradient(circle at 50% 30%, #1e293b 0%, #0f172a 100%)",
      padding: screens.md ? "40px 48px" : "24px 16px",
    }),
    [screens.md],
  );

  const titleStyle = useMemo<React.CSSProperties>(
    () => ({
      marginBottom: 32,
      color: "#f8fafc",
      textAlign: screens.md ? "left" : "center",
    }),
    [screens.md],
  );

  const gutter = useMemo<[number, number]>(
    () => (screens.md ? [24, 24] : [16, 16]),
    [screens.md],
  );

  return (
    <ConfigProvider theme={DASHBOARD_THEME}>
      <div style={wrapperStyle}>
        <Content style={CONTENT_STYLE}>
          <Title level={2} style={titleStyle}>
            Appointment Booking Portal
          </Title>

          <Row gutter={gutter}>
            <Col xs={24} lg={8}>
              <ChatBot />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <AppointmentForm />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <AppointmentList />
            </Col>
          </Row>
        </Content>
      </div>
    </ConfigProvider>
  );
};
