import React from "react";
import Header from "../components/Header";

const UserDashboard = () => {
  // TODO: Fetch real user stats and history
  const user = { name: "John Doe" };
  const history = [
    { title: "AI in Healthcare", date: "2024-06-01" },
    { title: "Travel with AI", date: "2024-05-28" },
  ];

  return (
    <div>
      <Header user={user} />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Your Reading Stats</h2>
        <div className="mb-4">Total Blogs Read: {history.length}</div>
        <h3 className="font-semibold mb-2">Reading History</h3>
        <ul className="list-disc pl-5">
          {history.map((item, idx) => (
            <li key={idx} className="mb-1">
              {item.title} <span className="text-xs text-gray-500">({item.date})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard; 