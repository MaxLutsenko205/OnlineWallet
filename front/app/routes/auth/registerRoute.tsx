import { RegisterPage } from "~/pages/auth/registerPage";
import type { Route } from "../+types/indexRoute";
import { register } from "~/services/api/UserApi";
import { redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await register({ email, password });

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
    console.log("Token saved to local storage:", localStorage.getItem("token"));
    return redirect("/dashboard");
  } else {
    throw new Error(response.error);
  }
}

export default function RegisterRoute() {
  return <RegisterPage />;
}
