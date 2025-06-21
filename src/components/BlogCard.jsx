import React from "react";
import { useNavigate } from "react-router-dom";

function truncateHtml(html, maxLength) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const CARD_HEIGHT = 300;

const BlogCard = ({ blog, onClick }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer hover:shadow-2xl hover:scale-105 hover:bg-orange-50 transition-all duration-300 border border-gray-200 relative flex flex-col justify-between"
      onClick={onClick}
      style={{ minHeight: CARD_HEIGHT, maxHeight: CARD_HEIGHT, height: CARD_HEIGHT }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-2 text-black">{blog.title}</h2>
        <div className="text-gray-700 mb-3 text-base overflow-hidden" style={{ maxHeight: 90 }}>
          {blog.content ? truncateHtml(blog.content, 180) : ""}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags?.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between mt-2">
        <div className="text-xs text-gray-500">
          By {blog.author?.name || "Unknown"} | {blog.views} views
        </div>
        <button
          className="text-blue-700 hover:underline font-semibold text-sm bg-transparent"
          onClick={async e => {
            e.stopPropagation();
            const token = localStorage.getItem("token");
            if (token) {
              await fetch(`http://localhost:5000/api/blogs/${blog._id}/view`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
              });
            }
            navigate(`/blog/${blog._id}`);
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};
export default BlogCard; 