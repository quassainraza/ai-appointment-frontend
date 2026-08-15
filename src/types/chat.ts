export interface ChatMessage {
  id?: string;
  sender: "user" | "ai" | string;
  content?: string;
  text?: string;
}

export interface ExtractedAppointmentData {
  title?: string;
  date?: string;
  time?: string;
}

export interface ChatResponse {
  sessionId: string;
  aiReply: string;
  isComplete: boolean;
  extractedData?: ExtractedAppointmentData;
}
