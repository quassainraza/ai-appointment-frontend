export class TokenManager {
  private static STORAGE_KEY = "token"; // Matches key in DevTools

  public static setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(TokenManager.STORAGE_KEY, token);
    } else {
      TokenManager.clearToken();
    }
  }

  public static getToken(): string | null {
    return localStorage.getItem(TokenManager.STORAGE_KEY);
  }

  public static clearToken(): void {
    localStorage.removeItem(TokenManager.STORAGE_KEY);
  }
}
