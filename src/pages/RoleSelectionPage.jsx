import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
        <div className="flex flex-col gap-6">
          <button
            className="bg-black hover:bg-orange-700 text-white py-3 rounded text-lg font-semibold"
            onClick={() => handleSelect("reader")}
          >
            Reader Login
          </button>
          <button
            className="bg-black hover:bg-orange-700 text-white py-3 rounded text-lg font-semibold"
            onClick={() => handleSelect("creator")}
          >
            Creator Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage; 