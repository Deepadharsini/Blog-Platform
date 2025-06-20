import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        if (user && localStorage.getItem("token")) {
          // Fetch personalized recommendations
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:5000/api/recommendations", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.message || "Failed to fetch recommendations");
            setBlogs([]);
          } else {
            setBlogs(data);
          }
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setError("Failed to fetch blogs");
        setBlogs([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % blogs.length);
  };

  return (
    <div>
      <Header user={user} />
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">
          {user ? "Personalized Recommendations" : "Personalized Recommendations"}
        </h1>
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : !user ? (
          <div className="text-center py-8">
            <div className="text-gray-700 mb-4">Please log in to see personalized recommendations.</div>
            <Link to="/login" className="bg-black hover:bg-orange-700 text-white px-4 py-2 rounded transition font-semibold">Login</Link>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No recommendations found.</div>
        ) : (
          <div>
            <BlogCard blog={blogs[current]} onClick={() => {}} />
            {blogs.length > 1 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleNext}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 