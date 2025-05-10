export interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode?: number;
}

const BASE_URL = "/api";

// Функция для получения заголовков авторизации
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

// Улучшенная универсальная функция для fetch-запросов
export async function apiFetch<T, TBody = unknown>(
  path: string,
  method: string = "GET",
  body?: TBody
): Promise<ApiResponse<T>> {
  try {
    const url = `${BASE_URL}/${path}`;
    const options: RequestInit = {
      method,
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    };
    console.log("url", url);
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка запроса");
    }

    return { data };
  } catch (error) {
    console.error(error);

    // Типизация ошибки как строка или объект
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export const api = {
  // Получение всех элементов
  getAll: <T>(route: string = "", params?: string) =>
    apiFetch<T[]>(params ? `${route}/${params}` : route),
  

  // Получение элемента по ID
  getById: <T>(route: string, id: number | string) =>
    apiFetch<T>(`${route}/${id}`),

  // Создание элемента: TInput - данные запроса, TOutput - данные ответа
  create: <TInput, TOutput = TInput>(route: string, data: TInput) =>
    apiFetch<TOutput>(route, "POST", data),

  // Обновление элемента: TInput - данные запроса, TOutput - данные ответа
  update: <TInput, TOutput = TInput>(
    route: string,
    id: number | string,
    data: Partial<TInput>
  ) => apiFetch<TOutput>(`${route}/${id}`, "PUT", data),

  // Удаление элемента: только ID
  remove: (route: string, id: number | string) =>
    apiFetch<null>(`${route}/${id}`, "DELETE"),
};
