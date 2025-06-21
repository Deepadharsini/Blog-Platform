const Blog = require("../models/Blog");
const User = require("../models/User");
const { cosineSimilarity } = require("../utils/similarity");
const { textToVector } = require("../utils/nlp");
const fs = require('fs');
const path = require('path');

// Load word categories from JSON file
const wordCategoriesPath = path.join(__dirname, '../data.json');
const wordCategories = JSON.parse(fs.readFileSync(wordCategoriesPath, 'utf8')).wordCategories;

exports.getRecommendations = async (req, res) => {
  try {
    // 1. Get the user and their full read history with all necessary details.
    const user = await User.findById(req.user._id).populate({
      path: "readHistory",
      populate: { path: "author", select: "name" } // Populate author within each blog
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Create a combined interest profile from explicit interests and read history.
    const userInterestProfile = new Set(user.interests.map(i => i.toLowerCase()));
    user.readHistory.forEach(blog => {
      if (blog.category) {
        userInterestProfile.add(blog.category.toLowerCase());
      }
    });

    const combinedInterests = Array.from(userInterestProfile);

    // If user has no interests and no history, return an empty response.
    if (combinedInterests.length === 0) {
      return res.json({ newRecommendations: [], readHistory: user.readHistory });
    }

    // 3. Find all blogs that match the user's combined interest profile, case-insensitively.
    const allMatchingBlogs = await Blog.find({ 
      category: { $in: combinedInterests.map(interest => new RegExp(`^${interest}$`, 'i')) } 
    })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    // 4. Exclude blogs the user has already read to get new recommendations.
    const readHistoryIds = new Set(user.readHistory.map(blog => blog._id.toString()));
    const newRecommendations = allMatchingBlogs.filter(blog => !readHistoryIds.has(blog._id.toString()));

    res.json({ 
      newRecommendations: newRecommendations.slice(0, 20),
      readHistory: user.readHistory 
    });

  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: "Error generating recommendations" });
  }
};
