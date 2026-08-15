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
  appointmentDate: string;
  createdAt?: string;
}
