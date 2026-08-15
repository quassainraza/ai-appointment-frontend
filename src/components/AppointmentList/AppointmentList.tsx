import React, { useMemo } from "react";
import { Card, List, Tag, Spin, Alert, Typography, theme, Button } from "antd";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetAppointments } from "../../hooks/useAppointments";
import type { Appointment } from "../../types";

const { Text } = Typography;

export const AppointmentList: React.FC = () => {
  const { token } = theme.useToken();

  // 1. Extract refetch and isRefetching from React Query
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetAppointments();

  // Memoize header title UI
  const cardTitle = useMemo(
    () => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <UnorderedListOutlined
          style={{ color: token.colorPrimary, fontSize: 20 }}
        />
        <span>Booked Appointments</span>
      </div>
    ),
    [token.colorPrimary],
  );

  // 2. Create the refresh button UI
  const refreshButton = (
    <Button
      type="text"
      icon={<ReloadOutlined />}
      onClick={() => refetch()}
      loading={isRefetching}
      size="small"
      style={{ color: token.colorPrimary }}
    >
      Refresh
    </Button>
  );

  return (
    <Card
      title={cardTitle}
      extra={refreshButton} // 3. Add to the Card's extra prop
      style={{ height: 550, display: "flex", flexDirection: "column" }}
      styles={{
        body: {
          flex: 1,
          overflowY: "auto",
          padding: 16,
        },
      }}
    >
      {isLoading && !isRefetching ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spin size="large" tip="Loading appointments..." />
        </div>
      ) : isError ? (
        <Alert
          type="error"
          message="Failed to load appointments"
          description={error?.message || "An unexpected error occurred."}
          showIcon
        />
      ) : (
        <List<Appointment>
          itemLayout="horizontal"
          dataSource={appointments}
          locale={{ emptyText: "No appointments booked yet." }}
          renderItem={(item) => {
            const formattedDate = dayjs(item.appointmentDate).format(
              "MMM DD, YYYY",
            );
            const formattedTime = dayjs(item.appointmentDate).format("hh:mm A");
            const isPast = dayjs(item.appointmentDate).isBefore(dayjs());

            return (
              <List.Item
                style={{
                  padding: "12px 16px",
                  marginBottom: 12,
                  borderRadius: 8,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  background: token.colorBgContainer,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <List.Item.Meta
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text strong style={{ fontSize: 15 }}>
                        {item.title}
                      </Text>
                      <Tag color={isPast ? "default" : "green"}>
                        {isPast ? "Completed" : "Upcoming"}
                      </Tag>
                    </div>
                  }
                  description={
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        marginTop: 6,
                        color: token.colorTextSecondary,
                      }}
                    >
                      <span>
                        <CalendarOutlined style={{ marginRight: 6 }} />
                        {formattedDate}
                      </span>
                      <span>
                        <ClockCircleOutlined style={{ marginRight: 6 }} />
                        {formattedTime}
                      </span>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};
