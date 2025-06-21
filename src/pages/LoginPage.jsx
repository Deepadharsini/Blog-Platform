import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedRole = params.get("role") || "reader";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      // Enforce role-based login
      if (data.user.role !== selectedRole) {
        setError(`You are not registered as a ${selectedRole}.`);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "creator") {
        navigate("/creator-dashboard");
      } else {
        navigate("/recommendations");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/wallpaper.png')" }}
    >
      <Header />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white opacity-60 backdrop-blur-sm rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          {selectedRole === "creator" ? "Creator Login" : "Reader Login"}
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-orange-700 hover:bg-orange-600 text-white font-semibold py-2 rounded transition">
            Login
          </button>
        </form>
        <div className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-700 font-semibold">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 