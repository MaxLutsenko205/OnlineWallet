import { api, type ApiResponse } from "./Api";

const ROUTE = "auth";

interface AuthDto {
  email: string;
  password: string;
}

export async function login(
  body: AuthDto
): Promise<ApiResponse<{ token: string }>> {
   console.log("Login function called with body:", body);
  const response = await api.create<AuthDto, { token: string }>(
    ROUTE + "/login",
    body,
      {}
  );
  console.log("Login response:", response);
  return response;
}

export async function register(
  body: AuthDto
): Promise<ApiResponse<{ token: string }>> {
  const response = await api.create<AuthDto, { token: string }>(
    ROUTE + "/reg",
    body
  );
  return response;
}
