import { HttpClient } from "./HttpClient";
import type {
  AuthResponse,
  ChatResponse,
  Appointment,
  AppointmentPayload,
  BackendResponse,
  LoginPayload,
  SignupPayload,
} from "../types";

class ApiService extends HttpClient {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  // Auth Endpoints
  public async login(credentials: LoginPayload): Promise<AuthResponse> {
    const res = await this.post<BackendResponse<AuthResponse> | AuthResponse>(
      "/auth/login",
      credentials,
    );
    return "data" in res && res.data?.token ? res.data : (res as AuthResponse);
  }

  public async signup(payload: SignupPayload): Promise<AuthResponse> {
    const res = await this.post<BackendResponse<AuthResponse> | AuthResponse>(
      "/auth/signup",
      payload,
    );
    return "data" in res && res.data?.token ? res.data : (res as AuthResponse);
  }

  // Chat Endpoint
  public async sendMessage(
    message: string,
    sessionId?: string | null,
  ): Promise<ChatResponse> {
    const payload: { message: string; sessionId?: string } = { message };
    if (sessionId) {
      payload.sessionId = sessionId;
    }

    const res = await this.post<BackendResponse<ChatResponse> | ChatResponse>(
      "/chat/send",
      payload,
    );
    return "data" in res ? res.data : res;
  }

  // Appointment Endpoints
  public async createAppointment(
    payload: AppointmentPayload,
  ): Promise<Appointment> {
    const res = await this.post<BackendResponse<Appointment> | Appointment>(
      "/appointments",
      payload,
    );
    return "data" in res ? res.data : res;
  }

  public async getAppointments(): Promise<Appointment[]> {
    const res = await this.get<BackendResponse<Appointment[]> | Appointment[]>(
      "/appointments",
    );
    return "data" in res ? res.data : res;
  }
}

export const apiService = new ApiService();
