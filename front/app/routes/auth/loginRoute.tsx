import { LoginPage } from "~/pages/auth/loginPage";
import type { Route } from "../+types/indexRoute";
import { redirect } from "react-router";
import { login } from "~/services/api/UserApi";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const response = await login({ email, password });
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
    
    return redirect("/dashboard");
  } else {
    throw new Error(response.error);
  }
}

export default function LoginRoute() {
  return <LoginPage></LoginPage>;
}
