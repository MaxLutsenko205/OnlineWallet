import SettingsPage from "~/pages/app/settingsPage";
import {
  createCategory,
  deleteCategoryById,
  fetchAllCategory,
  update,
} from "~/services/api/CategoryApi";
import type { Route } from "./+types/settingsRoute";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const data = await fetchAllCategory();
  return data;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const action = formData.get("action");

  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const name = formData.get("name") as string;
  const bgHex = formData.get("bgHex") as string;
  const textHex = formData.get("textHex") as string;
  const icon = formData.get("icon") as File;

  try {
    switch (action) {
      case "delete":
        if (id == null) {
          return { success: false, error: "ID is required for deletion" };
        }
        await deleteCategoryById(id);
        return { success: true, message: `Deleted category ${id}` };

      case "put":
        if (id == null) {
          return { success: false, error: "ID is required for update" };
        }
        const updatedCategory = await update(id, { name, bgHex, textHex });
        return { success: true, category: updatedCategory };

      case "post":
        const newCategory = await createCategory({
          name,
          bgHex,
          textHex,
        });
        return { success: true, category: newCategory };

      default:
        return { success: false, error: "Unknown action" };
    }
  } catch (error: any) {
    console.error("Error in clientAction:", error);
    return { success: false, error: error.message || "Action failed" };
  }
}

export default function SettingsRoute({ loaderData }: Route.ComponentProps) {
  return <SettingsPage categories={loaderData}></SettingsPage>;
}
