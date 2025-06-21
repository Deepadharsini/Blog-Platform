import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/select-role");
  };

  return (
    <header className="bg-black text-white px-6 py-5 flex justify-between items-center" style={{ minHeight: '68px' }}>
      <Link to="/" className="font-bold text-2xl">FeedFlow</Link>
      <nav className="flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-4">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <FaUserCircle className="w-10 h-10 text-white" />
            )}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-colors"
              >
                Hi, {user.name}
              </button>
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 py-2 w-48 bg-black rounded-md shadow-xl z-20"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-white hover:bg-orange-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/read-history"
                    className="block px-4 py-2 text-sm text-white hover:bg-orange-700"
                  >
                    Read History
                  </Link>
                  {user.role === "creator" && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-white hover:bg-orange-700"
                    >
                      Your Blogs
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-orange-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Link 
              to="/select-role" 
              className="bg-white hover:bg-orange-600 text-black px-3 py-1 rounded transition font-semibold"
              style={{ minWidth: '100px', textAlign: 'center' }}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-white hover:bg-orange-600 text-black px-3 py-1 rounded transition font-semibold ml-2"
              style={{ minWidth: '100px', textAlign: 'center' }}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; 