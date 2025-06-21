const Blog = require("../models/Blog");
const { extractKeywords, getSentiment, textToVector } = require("../utils/nlp");

exports.createBlog = async (req, res) => {
  const { title, content, tags, category } = req.body;
  // Backend validation
  if (!title || !content || !category) {
    return res.status(400).json({ message: "Title, content, and category are required." });
  }
  try {
    // Get all existing blogs to build a comprehensive keyword bank
    const allBlogs = await Blog.find();
    let allKeywords = [];
    
    // Collect keywords from all existing blogs
    allBlogs.forEach(blog => {
      if (blog.keywords && blog.keywords.length > 0) {
        allKeywords = allKeywords.concat(blog.keywords);
      }
      if (blog.tags && blog.tags.length > 0) {
        allKeywords = allKeywords.concat(blog.tags);
      }
    });
    
    // Add current blog's tags to the keyword bank
    if (tags && tags.length > 0) {
      allKeywords = allKeywords.concat(tags);
    }
    
    // Remove duplicates and create final keyword bank
    allKeywords = Array.from(new Set(allKeywords));
    
    // NLP enrichment
    const keywords = extractKeywords(content);
    const sentiment = getSentiment(content);
    
    // Create vector using the comprehensive keyword bank
    const blogText = `${title} ${content} ${tags.join(" ")}`;
    const vector = textToVector(blogText, allKeywords);

    const blog = new Blog({
      title,
      content,
      tags,
      category,
      author: req.user._id,
      keywords,
      sentiment,
      vector,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation error:", err);
    res.status(500).json({ message: "Error creating blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (String(blog.author) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    // Get all existing blogs to build a comprehensive keyword bank
    const allBlogs = await Blog.find();
    let allKeywords = [];
    
    // Collect keywords from all existing blogs
    allBlogs.forEach(existingBlog => {
      if (existingBlog.keywords && existingBlog.keywords.length > 0) {
        allKeywords = allKeywords.concat(existingBlog.keywords);
      }
      if (existingBlog.tags && existingBlog.tags.length > 0) {
        allKeywords = allKeywords.concat(existingBlog.tags);
      }
    });
    
    // Add current blog's new tags to the keyword bank
    if (req.body.tags && req.body.tags.length > 0) {
      allKeywords = allKeywords.concat(req.body.tags);
    }
    
    // Remove duplicates and create final keyword bank
    allKeywords = Array.from(new Set(allKeywords));
    
    // Update blog fields
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.tags = req.body.tags;
    blog.category = req.body.category;
    
    // Regenerate keywords and vector
    const keywords = extractKeywords(req.body.content);
    const sentiment = getSentiment(req.body.content);
    const blogText = `${req.body.title} ${req.body.content} ${req.body.tags.join(" ")}`;
    const vector = textToVector(blogText, allKeywords);
    
    blog.keywords = keywords;
    blog.sentiment = sentiment;
    blog.vector = vector;
    
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error("Blog update error:", err);
    res.status(500).json({ message: "Error updating blog" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (String(blog.author) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};

exports.incrementView = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    // Add to user readHistory if not already present
    const User = require("../models/User");
    const user = await User.findById(req.user._id);
    if (user && !user.readHistory.some(id => id.equals(blog._id))) {
      user.readHistory.push(blog._id);
      await user.save();
    }
    res.json({ views: blog.views });
  } catch (err) {
    res.status(500).json({ message: "Error incrementing view" });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    const userId = req.user._id;
    const hasLiked = blog.likedBy.some(id => id.equals(userId));
    if (hasLiked) {
      blog.likedBy.pull(userId);
      blog.likes = Math.max((blog.likes || 1) - 1, 0);
    } else {
      blog.likedBy.push(userId);
      blog.likes = (blog.likes || 0) + 1;
    }
    await blog.save();
    res.json({ likes: blog.likes, liked: !hasLiked });
  } catch (err) {
    res.status(500).json({ message: "Error toggling like" });
  }
};
