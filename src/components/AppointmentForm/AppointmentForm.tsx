import React from "react";
import {
  Card,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  message,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useCreateAppointment } from "../../hooks/useAppointments";
import type { AppointmentFormValues } from "../../types";

export const AppointmentForm: React.FC = () => {
  const [form] = Form.useForm<AppointmentFormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  // React Query Mutation
  const { mutate: createAppointment, isPending } = useCreateAppointment();

  const handleSubmit = (values: AppointmentFormValues) => {
    const appointmentDate = values.date
      .hour(values.time.hour())
      .minute(values.time.minute())
      .second(0)
      .toISOString();

    const payload = {
      title: values.title.trim(),
      appointmentDate,
    };

    createAppointment(payload, {
      onSuccess: () => {
        messageApi.success("Appointment booked successfully!");
        form.resetFields();
      },
      onError: (error) => {
        messageApi.error(
          error instanceof Error
            ? error.message
            : "Failed to book appointment.",
        );
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CalendarOutlined style={{ color: "#52c41a", fontSize: 20 }} />
            <span>Manual / Fallback Booking Form</span>
          </div>
        }
        style={{ height: 550 }}
      >
        <Form<AppointmentFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Appointment Reason / Title"
            name="title"
            rules={[
              { required: true, message: "Please enter a title or reason" },
            ]}
          >
            <Input
              placeholder="e.g., General Dental Checkup"
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              disabled={isPending}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker
              style={{ width: "100%" }}
              format="HH:mm"
              disabled={isPending}
              minuteStep={15}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isPending}
              disabled={isPending}
            >
              {isPending
                ? "Booking Appointment..."
                : "Confirm & Book Appointment"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
