import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optionally clear user state from Redux here
    navigate("/select-role");
  };

  return (
    <header className="bg-black text-white px-6 py-5 flex justify-between items-center" style={{ minHeight: '68px' }}>
      <Link to="/" className="font-bold text-2xl">FeedFlow</Link>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="ml-2 text-lg font-semibold">Hi, {user.name}</span>
            {user.role === "creator" ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-white hover:bg-orange-600 text-black px-3 py-1 rounded transition font-semibold"
                  style={{ minWidth: '100px', textAlign: 'center' }}
                >
                  Your Blogs
                </Link>
              </>
            ) : null}
            <button onClick={handleLogout} className="bg-white hover:bg-orange-600 text-black px-3 py-1 rounded transition font-semibold ml-2" style={{ minWidth: '100px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-white hover:bg-orange-600 text-black px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; 