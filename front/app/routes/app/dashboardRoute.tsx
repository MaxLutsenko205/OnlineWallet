import { DashboardPage } from "~/pages/app/dashboardPage";
import type { Route } from "./+types/dashboardRoute";
import { useTrade } from "~/hooks/useTrades";
import { fetchAllTrade } from "~/services/api/TradeApi";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const data = await fetchAllTrade();
  return data;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  if (formData.get("action") === "delete") {
    const id = formData.get("id") as string;
    console.log("Delete trade with id:", id);
  } else if (formData.get("action") === "put") {
    const id = formData.get("id") as string;
    console.log("Edit trade with id:", id);
  } else if (formData.get("action") === "post") {
    console.log("Add trade");
  } else {
    console.log("Unknown action");
  }
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { trades, initializeTrades } = useTrade();
  initializeTrades(loaderData);
  console.log("DashboardRoute", trades);
  return <DashboardPage trades={loaderData}></DashboardPage>;
}
