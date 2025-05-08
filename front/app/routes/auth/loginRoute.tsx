import { LoginPage } from "~/pages/auth/loginPage";
import type { Route } from "../app/+types";


export async function clientAction({
    request,
  }: Route.ClientActionArgs) {
    // let formData = await request.formData();
    // return await processPayment(formData);
  }

export default function LoginRoute() {
  return <LoginPage ></LoginPage>;
}
