import React, { useState } from "react"; // Added useEffect
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
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UserAddOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../store/useAuthStore";

const { Title, Text } = Typography;

export const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const signup = useAuthStore((state) => state.signup);

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      message.success("Account created successfully!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // ONLY turn off the loading state if the signup FAILED
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Failed to create account";
      message.error(errorMessage);
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
            width: 460,
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
              Create Account
            </Title>
            <Text style={{ color: "#94a3b8" }}>
              Sign up to start booking appointments with AI
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              label={<span style={{ color: "#cbd5e1" }}>Full Name</span>}
              name="name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#64748b" }} />}
                placeholder="John Doe"
                size="large"
              />
            </Form.Item>

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
                { required: true, message: "Please enter a password" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#64748b" }} />}
                placeholder="Create password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#cbd5e1" }}>Confirm Password</span>}
              name="confirm"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match"),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#64748b" }} />}
                placeholder="Confirm password"
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 28, marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<UserAddOutlined />}
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
                Register
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text style={{ color: "#94a3b8" }}>Already have an account? </Text>
            <Link to="/login" style={{ color: "#60a5fa", fontWeight: 500 }}>
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
};
