import DashboardPage from "~/pages/app/dashboardPage";

// export async function clientLoader({ params }: Route.ClientLoaderArgs) {
//   const data = await fetchAllTrade();
//   return data;
// }

// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const formData = await request.formData();
//   const action = formData.get("action");
//   const id = formData.get("id") ? Number(formData.get("id")) : null;
//   const sum = formData.get("sum") as string;
//   const comment = formData.get("comment") as string;
//   const type = formData.get("type") as string;
//   const categoryId = formData.get("category_id") as string;
//   console.log("formData", action, id, comment, sum, type, categoryId);
//   const payload = formData.get("payload")
//     ? JSON.parse(formData.get("payload") as string)
//     : null;
//   try {
//     switch (action) {
//       case "delete":
//         if (id != null) {
//           await deleteTradeById(id);
//           return { success: true, message: `Deleted trade ${id}` };
//         }
//         break;

//       case "put":
//         if (id != null && payload) {
//           const updatedTrade = await updateTrade(id, payload);
//           return { success: true, trade: updatedTrade };
//         }
//         break;

//       case "post":
//         if (payload) {
//           const newTrade = await createTrade(payload);
//           return { success: true, trade: newTrade };
//         }
//         break;

//       default:
//         return { success: false, error: "Unknown action" };
//     }
//   } catch (error: any) {
//     console.error("Error in clientAction:", error);
//     return { success: false, error: error.message || "Action failed" };
//   }

//   return { success: false, error: "Invalid input" };
// }

export default function DashboardRoute() {
  return <DashboardPage></DashboardPage>;
}
