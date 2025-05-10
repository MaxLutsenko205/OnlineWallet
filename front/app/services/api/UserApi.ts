import { api, type ApiResponse } from "./Api";

const ROUTE = "/auth";

interface AuthDto {
  email: string;
  password: string;
}

export async function login(
  body: AuthDto
): Promise<ApiResponse<{ token: string }>> {
  const response = await api.create<AuthDto, { token: string }>(
    ROUTE + "/login",
    body
  );
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
