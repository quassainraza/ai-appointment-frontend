import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  ConfigProvider,
  theme,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  LoginOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../store/useAuthStore";

const { Title, Text } = Typography;

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values);
      message.success("Login successful!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Invalid email or password";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        <Card
          style={{
            width: 420,
            borderRadius: 16,
            borderColor: "rgba(255, 255, 255, 0.1)",
            background: "rgba(30, 41, 59, 0.7)",
            backdropFilter: "blur(16px)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header & Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
              }}
            >
              <RobotOutlined style={{ fontSize: 24, color: "#fff" }} />
            </div>
            <Title level={3} style={{ marginBottom: 4, color: "#f8fafc" }}>
              Welcome Back
            </Title>
            <Text style={{ color: "#94a3b8" }}>
              Sign in to manage your appointments
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              label={<span style={{ color: "#cbd5e1" }}>Email Address</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#64748b" }} />}
                placeholder="name@example.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#cbd5e1" }}>Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#64748b" }} />}
                placeholder="Enter password"
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 28, marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<LoginOutlined />}
                block
                size="large"
                loading={loading}
                style={{
                  height: 44,
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  border: "none",
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text style={{ color: "#94a3b8" }}>Don't have an account? </Text>
            <Link to="/signup" style={{ color: "#60a5fa", fontWeight: 500 }}>
              Create one now
            </Link>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
};
