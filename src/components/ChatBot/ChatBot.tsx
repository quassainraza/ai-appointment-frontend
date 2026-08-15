import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  List,
  Typography,
  Spin,
  theme,
  message,
} from "antd";
import {
  SendOutlined,
  RobotOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useChatStore } from "../../store/useChatStore";
import { useCreateAppointment } from "../../hooks/useAppointments";
import { apiService } from "../../services/ApiService";

const { Text } = Typography;

export const ChatBot: React.FC = () => {
  const { token } = theme.useToken();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Zustand Store
  const {
    messages,
    addMessage,
    sessionId,
    setSessionId,
    isComplete,
    extractedData,
  } = useChatStore();

  // React Query Mutation
  const { mutate: createAppointment, isPending: isBooking } =
    useCreateAppointment();

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    addMessage({ sender: "user", text: userText });
    setIsLoading(true);

    try {
      const response = await apiService.sendMessage(userText, sessionId);

      if (response.sessionId) setSessionId(response.sessionId);

      addMessage({ sender: "ai", text: response.aiReply });

      useChatStore.setState({
        isComplete: response.isComplete,
        extractedData: response.extractedData,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addMessage({
        sender: "ai",
        text: "Sorry, I encountered an error connecting to the server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInlineConfirm = () => {
    if (!extractedData?.date || !extractedData?.time || !extractedData?.title) {
      messageApi.error("Missing appointment details.");
      return;
    }

    const [hours, minutes] = extractedData.time.split(":");
    const appointmentDate = dayjs(extractedData.date)
      .hour(Number(hours))
      .minute(Number(minutes))
      .second(0)
      .toISOString();

    createAppointment(
      { title: extractedData.title, appointmentDate },
      {
        onSuccess: () => {
          messageApi.success("Appointment booked successfully via Chat!");
          addMessage({
            sender: "ai",
            text: "✅ Excellent! I have successfully saved your appointment in the system. You will see it in your Booked Appointments list.",
          });
          setSessionId(null);
          useChatStore.setState({
            isComplete: false,
            extractedData: undefined,
          });
        },
        onError: () => {
          messageApi.error("Failed to book appointment via chat.");
        },
      },
    );
  };

  return (
    <>
      {contextHolder}
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <RobotOutlined
              style={{ color: token.colorPrimary, fontSize: 20 }}
            />
            <span>AI Booking Assistant</span>
          </div>
        }
        style={{ height: 550, display: "flex", flexDirection: "column" }}
        styles={{
          body: {
            flex: 1,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Fixes flexbox overflow pushing the input box out
            minHeight: 0, // Enforces boundaries for the scrollable child
          },
        }}
      >
        {/* Scrollable Message Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <List
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item
                style={{
                  borderBottom: "none",
                  padding: "4px 0",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius: 12,
                    background:
                      msg.sender === "user"
                        ? token.colorPrimary
                        : token.colorBgContainer,
                    color: msg.sender === "user" ? "#fff" : token.colorText,
                    border:
                      msg.sender === "ai"
                        ? `1px solid ${token.colorBorder}`
                        : "none",
                  }}
                >
                  {msg.sender === "ai" && (
                    <RobotOutlined style={{ marginRight: 8 }} />
                  )}
                  <Text style={{ color: "inherit" }}>{msg.text}</Text>
                </div>
              </List.Item>
            )}
          />

          {isComplete && extractedData && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                background: token.colorFillAlter,
                borderRadius: 8,
                border: `1px solid ${token.colorBorder}`,
              }}
            >
              <Text strong style={{ display: "block", marginBottom: 12 }}>
                Ready to confirm your {extractedData.title}?
              </Text>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={handleInlineConfirm}
                loading={isBooking}
                block
              >
                Yes, Book This Appointment
              </Button>
            </div>
          )}

          {isLoading && (
            <div style={{ padding: "8px 0" }}>
              <Spin size="small" />{" "}
              <Text type="secondary" style={{ marginLeft: 8 }}>
                AI is typing...
              </Text>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (Pinned to bottom) */}
        <div
          style={{
            padding: 16,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            flexShrink: 0,
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type your message..."
            disabled={isLoading || isComplete}
            suffix={
              <Button
                type="text"
                icon={
                  <SendOutlined
                    style={{
                      color:
                        input.trim() && !isLoading && !isComplete
                          ? token.colorPrimary
                          : undefined,
                    }}
                  />
                }
                onClick={handleSend}
                disabled={!input.trim() || isLoading || isComplete}
              />
            }
          />
        </div>
      </Card>
    </>
  );
};
