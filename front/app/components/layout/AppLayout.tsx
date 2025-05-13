import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUser } from "~/hooks/useUser";
import RequireAuth from "~/routes/guards/requireAuth";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export default function AppLayout() {
  const { loginUser, user } = useUser();
  const navigate = useNavigate();

  // Прочитаем токен из localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user.isAuth) {
      loginUser(token, 0);
    }
  }, [token, user.isAuth, loginUser]);

  useEffect(() => {
    if (user.isAuth && token) {
      navigate("/dashboard");
    }
  }, [user.isAuth, navigate, token]);

  return (
    <RequireAuth>
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </RequireAuth>
  );
}
