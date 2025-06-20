import React from "react";

const BlogCard = ({ blog, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition"
    onClick={onClick}
  >
    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
    <p className="text-gray-700 mb-2">{blog.content.slice(0, 120)}...</p>
    <div className="flex flex-wrap gap-2 mb-2">
      {blog.tags?.map((tag) => (
        <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
          #{tag}
        </span>
      ))}
    </div>
    <div className="text-xs text-gray-500">
      By {blog.author?.name || "Unknown"} | {blog.views} views
    </div>
  </div>
);

export default BlogCard; 