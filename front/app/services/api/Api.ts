export interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode?: number;
}

const BASE_URL = "/api";

// Основная универсальная fetch-функция с поддержкой FormData и кастомных заголовков
export async function apiFetch<T, TBody = unknown>(
    path: string,
    method: string = "GET",
    body?: TBody,
    customHeaders?: HeadersInit
): Promise<ApiResponse<T>> {
  try {
    const url = `${BASE_URL}/${path}`;
    const token = localStorage.getItem("token");

    const isFormData = body instanceof FormData;

    // Не добавлять Authorization для этих маршрутов
    const authFreeRoutes = ["/auth/login", "/auth/register"];
    const shouldAddAuth = token && !authFreeRoutes.includes(`/${path}`);

    const defaultHeaders: HeadersInit = isFormData
        ? shouldAddAuth
            ? { Authorization: `Bearer ${token}` }
            : {}
        : {
          "Content-Type": "application/json",
          ...(shouldAddAuth ? { Authorization: `Bearer ${token}` } : {}),
        };

    const headers: HeadersInit = {
      ...defaultHeaders,
      ...customHeaders,
    };

    const options: RequestInit = {
      method,
      headers,
      body: body
          ? isFormData
              ? (body as BodyInit)
              : JSON.stringify(body)
          : undefined,
    };

    console.log("url", url);
    console.log("options", options);

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      throw new Error(data.message || "Ошибка запроса");
    }

    return { data };
  } catch (error) {
    console.error("API Error:", error);
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}


// Обёртка с методами для CRUD операций
export const api = {
  getAll: <T>(route: string = "", params?: string) =>
    apiFetch<T[]>(params ? `${route}/${params}` : route),

  getById: <T>(route: string, id: number | string) =>
    apiFetch<T>(`${route}/${id}`),

  create: <TInput, TOutput = TInput>(
    route: string,
    data: TInput,
      headers?: HeadersInit
  ) => apiFetch<TOutput>(route, "POST", data, headers),

  update: <TInput, TOutput = TInput>(
    route: string,
    id: number | string,
    data: Partial<TInput>,
    headers?: HeadersInit
  ) => apiFetch<TOutput>(`${route}/${id}`, "PUT", data, headers),

  remove: (route: string, id: number | string) =>
    apiFetch<null>(`${route}/${id}`, "DELETE"),
};
