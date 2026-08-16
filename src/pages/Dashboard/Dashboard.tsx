import React, { useMemo } from "react";
import { Row, Col, Typography, Layout, Grid, Card } from "antd";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { AppointmentForm } from "../../components/AppointmentForm/AppointmentForm";
import { AppointmentList } from "../../components/AppointmentList/AppointmentList";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary";
import { CONTENT_STYLE } from "../../enums/dashboardEnums";

const { Title } = Typography;
const { Content } = Layout;
const { useBreakpoint } = Grid;

const WidgetFallback = ({ title }: { title: string }) => (
  <Card
    style={{ textAlign: "center", padding: "20px 0", borderColor: "#ef4444" }}
  >
    <h3 style={{ color: "#ef4444", marginTop: 0 }}>{title} Unavailable</h3>
    <p style={{ color: "#94a3b8", marginBottom: 0 }}>Failed to load widget.</p>
  </Card>
);

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
    <div style={wrapperStyle}>
      <Content style={CONTENT_STYLE}>
        <Title level={2} style={titleStyle}>
          Appointment Booking Portal
        </Title>

        <Row gutter={gutter}>
          <Col xs={24} lg={8}>
            <ErrorBoundary fallback={<WidgetFallback title="AI Chat" />}>
              <ChatBot />
            </ErrorBoundary>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <ErrorBoundary fallback={<WidgetFallback title="Booking Form" />}>
              <AppointmentForm />
            </ErrorBoundary>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <ErrorBoundary
              fallback={<WidgetFallback title="Appointment List" />}
            >
              <AppointmentList />
            </ErrorBoundary>
          </Col>
        </Row>
      </Content>
    </div>
  );
};
