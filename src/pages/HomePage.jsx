import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  // TODO: Replace with real user/auth logic
  const user = null;

  useEffect(() => {
    // Replace with real API call
    setBlogs([
      {
        _id: 1,
        title: "AI in Healthcare",
        content: "AI is transforming healthcare by...",
        tags: ["AI", "Health"],
        author: { name: "Alice" },
        views: 120,
      },
      {
        _id: 2,
        title: "Travel with AI",
        content: "Discover how AI helps you plan trips...",
        tags: ["AI", "Travel"],
        author: { name: "Bob" },
        views: 80,
      },
    ]);
  }, []);

  return (
    <div>
      <Header user={user} />
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Recommended Blogs</h1>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default HomePage; 