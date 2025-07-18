import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const CreatorDashboard = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: 'url(/blog_bg.jpeg)' }}
    >
      <Header style={{ minHeight: '90px' }} />
      <div className="flex flex-1 items-center justify-start pl-16">
        <div className="flex gap-6">
          <Link
            to="/create"
            className="px-8 py-4 rounded-lg font-bold text-lg bg-black text-white border-2 border-black transition hover:bg-white hover:text-black shadow-lg"
          >
            Write Now
          </Link>
          <Link
            to="/home"
            className="px-8 py-4 rounded-lg font-bold text-lg bg-black text-white border-2 border-black transition hover:bg-white hover:text-black shadow-lg"
          >
            Read Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard; 