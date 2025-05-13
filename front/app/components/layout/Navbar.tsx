import { Link, useNavigate } from "react-router";
import { useUser } from "~/hooks/useUser";

export function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 sm:px-6 md:px-10 rounded-b-2xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 text-base font-medium text-blue-600">
          <Link
            to="/dashboard"
            className="hover:text-blue-800 transition-colors"
          >
            Dashboard
          </Link>
          <Link to="/stats" className="hover:text-blue-800 transition-colors">
            Stats
          </Link>
          <Link
            to="/settings"
            className="hover:text-blue-800 transition-colors"
          >
            Settings
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm sm:text-base font-semibold text-gray-700">
            Budget: <span className="text-green-600">${user.budget}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}