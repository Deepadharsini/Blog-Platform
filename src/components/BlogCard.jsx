import React from "react";
import { useNavigate } from "react-router-dom";

function truncateHtml(html, maxLength) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const BlogCard = ({ blog, onClick }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer hover:shadow-xl transition border border-gray-200 relative"
      onClick={onClick}
      style={{ minHeight: 180 }}
    >
      <h2 className="text-2xl font-bold mb-2 text-black">{blog.title}</h2>
      <div className="text-gray-700 mb-3 text-base">
        {blog.content ? truncateHtml(blog.content, 180) : ""}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {blog.tags?.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        By {blog.author?.name || "Unknown"} | {blog.views} views
      </div>
      <button
        className="absolute bottom-4 right-6 text-blue-700 hover:underline font-semibold text-sm bg-transparent"
        onClick={e => {
          e.stopPropagation();
          navigate(`/blog/${blog._id}`);
        }}
      >
        Read More
      </button>
    </div>
  );
};

export default BlogCard; 