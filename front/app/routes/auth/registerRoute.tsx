import { RegisterPage } from "~/pages/auth/registerPage";
import type { Route } from "../app/+types";


export async function clientAction({
    request,
  }: Route.ClientActionArgs) {
    // let formData = await request.formData();
    // return await processPayment(formData);
  }

export default function RegisterRoute() {
  return <RegisterPage ></RegisterPage>;
}
