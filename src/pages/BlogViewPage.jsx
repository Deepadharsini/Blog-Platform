import React from "react";
import Header from "../components/Header";

const BlogViewPage = () => {
  // TODO: Fetch blog by ID from backend
  const blog = {
    title: "AI in Healthcare",
    content: "AI is transforming healthcare by... (full content)",
    tags: ["AI", "Health"],
    author: { name: "Alice" },
    views: 120,
  };

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
        <div className="text-sm text-gray-500 mb-2">
          By {blog.author?.name || "Unknown"} | {blog.views} views
        </div>
        <div className="mb-4">
          {blog.tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-gray-800 whitespace-pre-line">{blog.content}</div>
      </div>
    </div>
  );
};

export default BlogViewPage; 