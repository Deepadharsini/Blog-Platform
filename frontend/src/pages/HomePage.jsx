import React, { useEffect, useState, useMemo } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest-to-oldest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`);
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

  const categories = useMemo(() => {
    const allCategories = blogs
      .map((blog) => blog.category)
      .filter(Boolean);
    return ["All", ...new Set(allCategories)];
  }, [blogs]);

  const sortedAndFilteredBlogs = useMemo(() => {
    let result = [...blogs];

    if (selectedCategory !== "All") {
      result = result.filter((blog) => blog.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "oldest-to-newest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "newest-to-oldest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "most-viewed":
        result.sort((a, b) => b.views - a.views);
        break;
      case "most-liked":
        result.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    return result;
  }, [blogs, selectedCategory, sortOption, searchQuery]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/gray.jpeg')" }}
    >
      <Header />
      <div className="container mx-auto mt-10 p-4">
        <div className="flex items-center justify-between mb-8 mx-4">
          <div className="flex items-center">
            {isAuthenticated && (
              <Link to="/recommendations" className="flex-shrink-0">
                <button className="bg-orange-700 hover:bg-orange-600 text-white font-bold rounded-full w-32 h-32 flex items-center justify-center text-center shadow-lg">
                  Personalised
                  <br />
                  for you
                </button>
              </Link>
            )}
            <h2 className="text-3xl font-bold text-black ml-8">
              Uncover what others are sharing!!!
            </h2>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black-500 mr-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black-500"
              >
                <option value="newest-to-oldest">Newest to Oldest</option>
                <option value="oldest-to-newest">Oldest to Newest</option>
                <option value="most-viewed">Most Viewed</option>
                <option value="most-liked">Most Liked</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAndFilteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 