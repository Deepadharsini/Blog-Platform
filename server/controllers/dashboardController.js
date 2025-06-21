const Blog = require("../models/Blog");
const User = require("../models/User");

exports.userDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("readHistory");
    res.json({
      name: user.name,
      email: user.email,
      interests: user.interests,
      readHistory: user.readHistory,
      totalRead: user.readHistory.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard" });
  }
};

exports.creatorDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate("author", "name");
    res.json({
      totalBlogs: blogs.length,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard" });
  }
};

exports.getReadHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "readHistory",
      populate: { path: "author", select: "name" }
    });

    const readHistory = user.readHistory || [];
    
    // Calculate category counts
    const categoryCounts = {};
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

    readHistory.forEach(blog => {
      let categoryFound = false;
      
      if (blog.tags && blog.tags.length > 0) {
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
          for (const tag of blog.tags) {
            if (keywords.some(keyword => tag.toLowerCase().includes(keyword.toLowerCase()))) {
              categoryCounts[category] = (categoryCounts[category] || 0) + 1;
              categoryFound = true;
              break;
            }
          }
          if (categoryFound) break;
        }
      }
      
      if (!categoryFound) {
        categoryCounts["Uncategorized"] = (categoryCounts["Uncategorized"] || 0) + 1;
      }
    });

    res.json({
      readHistory: readHistory,
      categoryCounts: categoryCounts,
      totalRead: readHistory.length
    });
  } catch (err) {
    console.error("Read history error:", err);
    res.status(500).json({ message: "Error fetching read history" });
  }
};
