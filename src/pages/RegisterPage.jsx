import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import InterestSelector from "../components/InterestSelector";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          interests,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
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
      setError("Registration failed");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <div>
            <div className="mb-2 font-medium">Select Role:</div>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="reader">Reader</option>
              <option value="creator">Creator</option>
            </select>
          </div>
          <div>
            <div className="mb-2 font-medium">Select Interests:</div>
            <InterestSelector selected={interests} setSelected={setInterests}/>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-black hover:bg-orange-700 text-white font-semibold py-2 rounded transition">
            Register
          </button>
        </form>
        <div className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-700">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 