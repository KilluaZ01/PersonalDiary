import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBookOpen, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-6 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-bold space-x-6">
        <FaBookOpen />
        <span>Personal Diary</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4 items-center">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300 transition">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-white hover:text-gray-300 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center py-6 space-y-4 md:hidden">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white hover:text-gray-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
