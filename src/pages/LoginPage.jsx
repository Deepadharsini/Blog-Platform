import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Role-based redirect
      if (data.user.role === "creator") {
        navigate("/creator-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
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
          <button type="submit" className="bg-blue-700 text-white py-2 rounded">
            Login
          </button>
        </form>
        <div className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-700">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 