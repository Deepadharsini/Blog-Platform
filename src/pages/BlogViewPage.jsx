import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const BlogViewPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setBlog(data);
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch blog");
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : blog ? (
          <>
            <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
            <div className="text-sm text-gray-500 mb-2">
              By {blog.author?.name || "Unknown"} | {blog.views || 0} views
            </div>
            <div className="mb-4">
              {blog.tags && blog.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">
                  #{tag}
                </span>
              ))}
            </div>
            <div
              className="text-gray-800 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BlogViewPage; 