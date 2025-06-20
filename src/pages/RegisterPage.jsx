import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import InterestSelector from "../components/InterestSelector";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Add real register logic
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    alert("Registered (mock)");
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
            <div className="mb-2 font-medium">Select Interests:</div>
            <InterestSelector selected={interests} setSelected={setInterests} />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-blue-700 text-white py-2 rounded">
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