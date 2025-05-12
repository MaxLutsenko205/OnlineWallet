import { Link, Outlet } from "react-router";
import { Footer } from "./Footer";

export default function AuthLayout() {
  return (
    <>
      <nav className=" shadow-md rounded-lg p-4 flex justify-center space-x-6">
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
