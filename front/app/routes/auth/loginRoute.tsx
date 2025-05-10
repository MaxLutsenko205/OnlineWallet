import { LoginPage } from "~/pages/auth/loginPage";
import type { Route } from "../+types/indexRoute";
import { useNavigate } from "react-router";
import { login } from "~/services/api/UserApi";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const navigate= useNavigate();
  let formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await login({ email, password });

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
    console.log("Token saved to local storage:", localStorage.getItem("token"));
    navigate("/dashboard");
  } else {
    throw new Error(response.error);
  }
  
}

export default function LoginRoute() {
  return <LoginPage ></LoginPage>;
}
