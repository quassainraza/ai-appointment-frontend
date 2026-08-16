import { Dayjs } from "dayjs";

export interface AppointmentFormValues {
  title: string;
  date: Dayjs;
  time: Dayjs;
}

export interface AppointmentPayload {
  title: string;
  appointmentDate: string;
}

export interface Appointment {
  id: string;

  title: string;
  appointment_date: string; // The crucial fix!
  status: string;
  created_at: string; // Updated to snake_case
}
