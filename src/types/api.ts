export interface BackendResponse<T> {
  message?: string;
  data: T;
  token?: string;
}
