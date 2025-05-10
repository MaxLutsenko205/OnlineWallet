import { Link, useNavigate } from "react-router";
import { logout } from "~/features/user/userSlice";
import { useAppDispatch } from "~/hooks/reduxHooks";

export function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md rounded-lg p-4 flex justify-center space-x-6">
      <Link to="/dashboard" className="text-blue-500 hover:underline">
        Dashboard
      </Link>
      <Link to="/stats" className="text-blue-500 hover:underline">
        Stats
      </Link>
      <Link to="/settings" className="text-blue-500 hover:underline">
        Settings
      </Link>
      <button onClick={handleLogout} className="text-blue-500 hover:underline">
        Logout
      </button>
    </nav>
  );
}
