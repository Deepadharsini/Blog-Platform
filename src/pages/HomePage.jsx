import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch blogs");
        } else {
          setBlogs(data);
        }
      } catch (err) {
        setError("Failed to fetch blogs");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/gray.jpeg')" }}
    >
      <Header />
      <div className="container mx-auto mt-10 p-4">
        <div className="flex items-center mb-8 ml-4">
          <Link to="/recommendations" className="flex-shrink-0">
            <button className="bg-orange-700 hover:bg-orange-600 text-white font-bold rounded-full w-32 h-32 flex items-center justify-center text-center shadow-lg">
              Personalised
              <br />
              for you
            </button>
          </Link>
          <h2 className="text-3xl font-bold text-black ml-8">
            Uncover what others are sharing!!!
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 