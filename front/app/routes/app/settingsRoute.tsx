import type { Route } from "./+types";
import { SettingsPage } from "~/pages/app/settingsPage";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const categories = [
    {
      id: 1,
      name: "Salary",
      icon: "https://example.com/icon.png",
      text_hex: "#000000",
      background_hex: "#FFFFFF",
    },

    {
      id: 2,
      name: "Salary",
      icon: "https://example.com/icon.png",
      text_hex: "#000000",
      background_hex: "#FFFFFF",
    },
  ];
  return categories;
}
export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return <SettingsPage categories={loaderData}></SettingsPage>;
}
