import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const BlogViewPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setBlog(data);
          if (user && data.likedBy && data.likedBy.some(uid => uid === user._id || (uid._id && uid._id === user._id))) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch blog");
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/blogs/${id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setBlog((prev) => ({ ...prev, likes: data.likes }));
      setLiked(data.liked);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gray.jpeg')" }}
    >
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white/80 backdrop-blur-sm rounded shadow relative">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : blog ? (
          <>
            {/* Heart icon in top right */}
            <div className="absolute top-8 right-8 flex flex-col items-center z-10">
              <button
                onClick={handleLike}
                className="focus:outline-none"
                aria-label="Like"
              >
                {liked ? (
                  <AiFillHeart className="w-10 h-10 text-red-500 transition-colors duration-200" />
                ) : (
                  <AiOutlineHeart className="w-10 h-10 text-gray-400 hover:text-red-500 transition-colors duration-200" />
                )}
              </button>
              <span className="text-md text-gray-700 mt-1 font-semibold">{blog.likes || 0}</span>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="text-2xl font-bold mr-4">{blog.title}</h1>
            </div>
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