import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/ApiService";
import { useAuthStore } from "../store/useAuthStore"; // Import your auth store
import type { Appointment, AppointmentPayload } from "../types";

// 1. Create a dynamic key generator instead of a hardcoded constant
export const appointmentKeys = {
  all: (userId?: string) => ["appointments", userId] as const,
};

export const useGetAppointments = () => {
  // 2. Extract the user and auth state from Zustand
  const { user, isAuthenticated } = useAuthStore();

  return useQuery<Appointment[], Error>({
    // 3. The cache is now isolated per user (e.g., ["appointments", "user_123"])
    queryKey: appointmentKeys.all(user?.id),
    queryFn: () => apiService.getAppointments(),
    // 4. Ensure it ONLY fetches if a user is actively logged in
    enabled: isAuthenticated && !!user?.id,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore(); // Get the user ID here too

  return useMutation<Appointment, Error, AppointmentPayload>({
    mutationFn: (payload: AppointmentPayload) =>
      apiService.createAppointment(payload),
    onSuccess: () => {
      // 5. Invalidate ONLY the current user's specific cache when they book a new appointment
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.all(user?.id),
      });
    },
  });
};
