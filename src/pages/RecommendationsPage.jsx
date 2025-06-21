import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const CARD_WIDTH = 480;
const CARD_HEIGHT = 340;

const RecommendationsPage = () => {
  const [newRecommendations, setNewRecommendations] = useState([]);
  const [readHistory, setReadHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch recommendations");
          setNewRecommendations([]);
          setReadHistory([]);
        } else {
          setNewRecommendations(data.newRecommendations || []);
          setReadHistory(data.readHistory || []);
        }
      } catch (err) {
        setError("Failed to fetch recommendations");
        setNewRecommendations([]);
        setReadHistory([]);
      }
      setLoading(false);
    };
    fetchRecommendations();
  }, []);

  if (!user) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/gray.jpeg')" }}
      >
        <Header />
        <div className="max-w-2xl mx-auto mt-8 text-center bg-white/80 backdrop-blur-sm p-6 rounded shadow">
          <div className="text-gray-700 mb-4">Please log in to see personalized recommendations.</div>
          <Link to="/login" className="bg-black hover:bg-orange-700 text-white px-4 py-2 rounded transition font-semibold">Login</Link>
        </div>
      </div>
    );
  }

  const hasNewRecommendations = newRecommendations.length > 0;
  const recommendationsToDisplay = hasNewRecommendations ? newRecommendations : readHistory;
  const hasAnyRecommendations = recommendationsToDisplay.length > 0;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gray.jpeg')" }}
    >
      <Header user={user} />
      <div className="max-w-6xl mx-auto mt-8 flex flex-col items-center px-4">
        {loading ? (
          <div className="text-center text-gray-500 py-8 bg-white/80 backdrop-blur-sm rounded shadow px-6">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8 bg-white/80 backdrop-blur-sm rounded shadow px-6">{error}</div>
        ) : hasAnyRecommendations ? (
          <>
            <div className=" backdrop-blur-sm p-6 rounded shadow mb-6 w-full max-w-2xl text-center">
              <h1 className="text-2xl font-bold">Your Personalized Recommendations</h1>
              {!hasNewRecommendations && (
                <p className="text-center text-gray-600 mt-2">
                  No new posts match your interests right now, so here are some you've enjoyed before.
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
              {recommendationsToDisplay.map((blog) => (
                <div
                  key={blog._id}
                  className="flex items-stretch justify-center"
                  style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    <BlogCard blog={blog} onClick={() => {}} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full max-w-2xl text-center">
            <div className=" backdrop-blur-sm p-6 rounded shadow mb-6">
                <h1 className="text-2xl font-bold text-center">Your Personalized Recommendations</h1>
            </div>
            <div className="text-center text-gray-500 py-8 bg-white/80 backdrop-blur-sm rounded shadow px-6">
                No recommendations found. Start reading some blogs to get personalized suggestions!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage; 