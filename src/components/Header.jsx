import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Optionally clear user state from Redux here
    navigate("/login");
  };

  return (
    <header className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">FeedFlow</Link>
      <nav className="flex gap-4">
        {user ? (
          <>
            <Link to={user.role === "creator" ? "/creator-dashboard" : "/dashboard"}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className="bg-white text-blue-700 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-white text-blue-700 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; 