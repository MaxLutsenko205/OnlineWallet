import type { Category } from "~/types/Category";
import { api } from "./Api";

const ROUTE = "/categories";
export type createCategoryDto = Omit<Category, "id">;

export async function fetchAllCategory(): Promise<Category[]> {
  const response = await api.getAll<Category>(ROUTE);
  return response.data ?? [];
}

export async function getOneCategory(id: number): Promise<Category> {
  const response = await api.getById<Category>(ROUTE, id);
  return response.data ?? ({} as Category);
}

export async function createCategory(
  body: createCategoryDto
): Promise<Category> {
  const formData = new FormData();
  console.log("body", body);
  formData.append(
    "category",
    JSON.stringify({
      name: body.name,
      bgHex: body.bgHex,
      textHex: body.textHex,
    })
  );

  const response = await api.create<FormData, Category>(ROUTE, formData);

  return response.data ?? ({} as Category);
}

export async function update(
  id: number,
  body: Partial<createCategoryDto>
): Promise<Category> {
  const formData = new FormData();

  formData.append(
    "category",
    JSON.stringify({
      name: body.name,
      bgHex: body.bgHex,
      textHex: body.textHex,
    })
  );
  const response = await api.update<FormData, Category>(ROUTE, id, formData);
  return response.data ?? ({} as Category);
}

export async function deleteCategoryById(id: number): Promise<number> {
  const response = await api.remove(ROUTE, id);
  return id;
}
