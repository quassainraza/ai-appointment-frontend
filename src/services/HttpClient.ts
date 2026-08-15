import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { TokenManager } from "./TokenManager";

export abstract class HttpClient {
  protected readonly client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors(): void {
    // Dynamic In-Memory Token Injection
    this.client.interceptors.request.use((config) => {
      const token = TokenManager.getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Global Error Handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          TokenManager.clearToken();
        }
        return Promise.reject(error);
      },
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config,
    );
    return response.data;
  }
}
