import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";

const ReadHistoryPage = () => {
  const [readHistory, setReadHistory] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReadHistory = async () => {
      if (!user) {
        navigate("/select-role");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/dashboard/read-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.message || "Failed to fetch read history");
          setReadHistory([]);
        } else {
          setReadHistory(data.readHistory || []);
          setCategoryCounts(data.categoryCounts || {});
        }
      } catch (err) {
        setError("Failed to fetch read history");
        setReadHistory([]);
      }
      setLoading(false);
    };

    fetchReadHistory();
  }, [user, navigate]);

  const getCategoryFromTags = (tags) => {
    if (!tags || tags.length === 0) return "Uncategorized";
    
    const categoryKeywords = {
      "AI": ["ai", "artificial intelligence", "machine learning", "ml", "neural network", "deep learning"],
      "Technology": ["tech", "technology", "computer", "software", "programming", "coding", "blockchain", "cloud computing"],
      "Health": ["health", "fitness", "wellness", "medical", "medicine", "nutrition", "exercise"],
      "Finance": ["finance", "money", "banking", "investment", "trading", "cryptocurrency"],
      "Travel": ["travel", "trip", "vacation", "journey", "tourism", "destination"],
      "Education": ["education", "learning", "teaching", "school", "university", "course"],
      "Food": ["food", "cooking", "recipe", "cuisine", "kitchen", "chef"],
      "Sports": ["sport", "sports", "athletic", "game", "fitness", "football", "basketball"],
      "Art": ["art", "painting", "drawing", "creative", "design", "artist", "music"],
      "Science": ["science", "research", "experiment", "scientific", "laboratory", "study"]
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const tag of tags) {
        if (keywords.some(keyword => tag.toLowerCase().includes(keyword.toLowerCase()))) {
          return category;
        }
      }
    }
    
    return "Uncategorized";
  };

  if (!user) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/gray.jpeg')" }}
      >
        <Header />
        <div className="max-w-2xl mx-auto mt-8 text-center bg-white/80 backdrop-blur-sm p-6 rounded shadow">
          <div className="text-gray-700 mb-4">Please log in to view your read history.</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gray.jpeg')" }}
    >
      <Header user={user} />
      <div className="max-w-6xl mx-auto mt-8 p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-6">Your Read History</h1>
          
          {/* Category Counts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Reading Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="bg-orange-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-700">{count}</div>
                  <div className="text-sm text-gray-600">{category}</div>
                </div>
              ))}
              {Object.keys(categoryCounts).length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  No reading statistics available yet.
                </div>
              )}
            </div>
          </div>

          {/* Read History List */}
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading your read history...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : readHistory.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg mb-4">You haven't read any blogs yet.</p>
              <button 
                onClick={() => navigate("/recommendations")}
                className="bg-orange-700 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
              >
                Start Reading
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recently Read ({readHistory.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {readHistory.map((blog) => (
                  <div key={blog._id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        {getCategoryFromTags(blog.tags)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>By {blog.author?.name || "Unknown"}</span>
                      <span>{blog.views || 0} views</span>
                    </div>
                    <button 
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (token) {
                          await fetch(`http://localhost:5000/api/blogs/${blog._id}/view`, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${token}` },
                          });
                        }
                        navigate(`/blog/${blog._id}`);
                      }}
                      className="mt-3 w-full bg-orange-700 hover:bg-orange-600 text-white py-2 rounded transition"
                    >
                      Read Again
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadHistoryPage; 