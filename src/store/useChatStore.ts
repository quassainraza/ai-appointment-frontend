import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, ExtractedAppointmentData } from "../types";

interface ChatState {
  messages: ChatMessage[];
  sessionId: string | null;
  isComplete: boolean;
  extractedData?: ExtractedAppointmentData;
  addMessage: (message: ChatMessage) => void;
  setSessionId: (id: string | null) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      // Initial State
      messages: [
        {
          sender: "ai",
          text: "Hello! How can I assist you with booking an appointment today?",
        },
      ],
      sessionId: null,
      isComplete: false,
      extractedData: undefined,

      // Actions
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      setSessionId: (id) => set({ sessionId: id }),

      clearChat: () =>
        set({
          messages: [
            {
              sender: "ai",
              text: "Hello! How can I assist you with booking an appointment today?",
            },
          ],
          sessionId: null,
          isComplete: false,
          extractedData: undefined,
        }),
    }),
    {
      name: "chat-booking-storage", // The unique key used in localStorage
    },
  ),
);
