import type { Route } from "./+types";
import { StatsPage } from "~/pages/app/statsPage";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const transactions = [
    {
      id: "UUID",
      sum: 100,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      creation_date: "2023-10-01",
      type: "income",
      category: {
        id: 1,
        name: "Salary",
        icon: "https://example.com/icon.png",
        text_hex: "#000000",
        background_hex: "#FFFFFF",
      },
    },
    {
      id: "UUID",
      sum: 100,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      creation_date: "2023-10-01",
      type: "income",
      category: {
        id: 1,
        name: "Salary",
        icon: "https://example.com/icon.png",
        text_hex: "#000000",
        background_hex: "#FFFFFF",
      },
    },
  ];
  return transactions;
}
export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return <StatsPage trades={loaderData}></StatsPage>;
}
