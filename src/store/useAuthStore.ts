import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiService } from "../services/ApiService";
import { TokenManager } from "../services/TokenManager";
import { useChatStore } from "./useChatStore"; // 1. Import the chat store
import type { User, LoginPayload, SignupPayload } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: Boolean(TokenManager.getToken()),

      checkAuth: () => {
        const token = TokenManager.getToken();
        set({ isAuthenticated: Boolean(token) });
      },

      login: async (credentials: LoginPayload) => {
        try {
          const response = await apiService.login(credentials);

          if (!response.token) {
            throw new Error(
              "Authentication failed: No token returned by server.",
            );
          }

          TokenManager.setToken(response.token);
          set({ user: response.user, isAuthenticated: true });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },

      signup: async (payload: SignupPayload) => {
        try {
          const response = await apiService.signup(payload);

          if (response.token) {
            TokenManager.setToken(response.token);
          }
          set({ user: response.user, isAuthenticated: true });
        } catch (error) {
          console.error("Signup error:", error);
          throw error;
        }
      },

      logout: () => {
        TokenManager.clearToken();
        set({ user: null, isAuthenticated: false });

        // 2. Clear the chat session data from the other store
        useChatStore.getState().clearChat();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
