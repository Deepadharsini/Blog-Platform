import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const RecommendationsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError("");
      try {
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
      } catch (err) {
        setError("Failed to fetch recommendations");
        setBlogs([]);
      }
      setLoading(false);
    };
    fetchRecommendations();
  }, []);

  if (!user) {
    return (
      <div>
        <Header />
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <div className="text-gray-700 mb-4">Please log in to see personalized recommendations.</div>
          <Link to="/login" className="bg-black hover:bg-orange-700 text-white px-4 py-2 rounded transition font-semibold">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header user={user} />
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Your Personalized Recommendations</h1>
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No recommendations found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="flex items-stretch">
                <div className="w-full h-full flex flex-col justify-between" style={{ minHeight: 320, maxHeight: 420 }}>
                  <BlogCard blog={blog} onClick={() => {}} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage; 