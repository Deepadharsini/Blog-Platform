import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import RecommendationsPage from "./RecommendationsPage";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/dashboard/creator", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch blogs");
          setBlogs([]);
        } else {
          setBlogs(data.blogs || []);
        }
      } catch (err) {
        setError("Failed to fetch blogs");
        setBlogs([]);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete blog");
      }
    } catch {
      alert("Failed to delete blog");
    }
  };

  // If user is a reader, show only recommendations
  if (user && user.role === "reader") {
    return <RecommendationsPage />;
  }

  // If user is a creator, show their blogs dashboard (original content)
  return (
    <div className="min-h-screen bg-black-200">
      <Header user={user} />
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-200 rounded-2xl shadow-xl border border-[#f5f5dc]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-black tracking-tight">All Blogs</h2>
          <Link to="/create" className="bg-black hover:bg-orange-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md border border-yellow-600 transition">
            + Create Blog
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No blogs found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 font-bold text-black rounded-l-lg">Title</th>
                  <th className="py-3 px-4 font-bold text-black">Author</th>
                  <th className="py-3 px-4 font-bold text-black">Views</th>
                  <th className="py-3 px-4 font-bold text-black">Likes</th>
                  <th className="py-3 px-4 font-bold text-black rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} className="bg-[#fff] border border-[#f5f5dc] shadow-sm hover:bg-gray-100 transition">
                    <td className="py-3 px-4 text-black font-medium rounded-l-lg cursor-pointer hover:underline" onClick={() => navigate(`/blog/${blog._id}`)}>{blog.title}</td>
                    <td className="py-3 px-4 text-black">{blog.author?.name || "Unknown"}</td>
                    <td className="py-3 px-4 text-black">{blog.views}</td>
                    <td className="py-3 px-4 text-black">{blog.likes || 0}</td>
                    <td className="py-3 px-4 flex gap-4 rounded-r-lg">
                      <span
                        className="cursor-pointer text-xl hover:text-yellow-700"
                        title="Edit"
                        onClick={() => navigate(`/edit/${blog._id}`)}
                      >
                        ✏️
                      </span>
                      <span
                        className="cursor-pointer text-xl hover:text-red-600"
                        title="Delete"
                        onClick={() => handleDelete(blog._id)}
                      >
                        🗑️
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 