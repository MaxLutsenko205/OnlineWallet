import type { Category } from "~/types/Category";
import { api } from "./Api";

const ROUTE = "/category";
export type createCategoryDto = Omit<Category, "id">;

export async function fetchAllCategory(): Promise<Category[]> {
  const response = await api.getAll<Category>(ROUTE);
  return response.data ?? [];
}

export async function getOneCategory(id: number): Promise<Category> {
  const response = await api.getById<Category>(ROUTE, id);
  return response.data ?? ({} as Category);
}

export async function createCategory(body: createCategoryDto): Promise<Category> {
  const response = await api.create<createCategoryDto, Category>(ROUTE, body);
  return response.data ?? ({} as Category);
}

export async function update(
  id: number,
  body: Partial<createCategoryDto>
): Promise<Category> {
  const response = await api.update<Partial<createCategoryDto>, Category>(
    ROUTE,
    id,
    body
  );
  return response.data ?? ({} as Category);
}

export async function deleteCategoryById(id: number): Promise<number> {
  const response = await api.remove(ROUTE, id);
  return id;
}
