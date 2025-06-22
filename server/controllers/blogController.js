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
    console.log("--- UPDATE BLOG: START ---");

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      console.log("--- UPDATE BLOG: FAILED - Blog not found ---");
      return res.status(404).json({ message: "Blog not found" });
    }
    if (String(blog.author) !== String(req.user._id)) {
      console.log("--- UPDATE BLOG: FAILED - Not authorized ---");
      return res.status(403).json({ message: "Not authorized" });
    }

    console.log("--- UPDATE BLOG: Processing tags ---");
    let tagsArray = [];
    if (Array.isArray(req.body.tags)) {
      console.log("Tags received as an array.");
      tagsArray = req.body.tags;
    } else if (typeof req.body.tags === 'string') {
      console.log("Tags received as a string, splitting it.");
      tagsArray = req.body.tags.split(",").map((t) => t.trim()).filter(Boolean);
    } else {
      console.log("Tags are null or undefined, defaulting to empty array.");
    }
    console.log("Processed tags:", JSON.stringify(tagsArray));


    console.log("--- UPDATE BLOG: Building keyword bank ---");
    const allBlogs = await Blog.find();
    let allKeywords = [];
    allBlogs.forEach(existingBlog => {
      if (existingBlog.keywords && Array.isArray(existingBlog.keywords)) {
        allKeywords = allKeywords.concat(existingBlog.keywords);
      }
      if (existingBlog.tags && Array.isArray(existingBlog.tags)) {
        allKeywords = allKeywords.concat(existingBlog.tags);
      }
    });
    allKeywords = allKeywords.concat(tagsArray);
    allKeywords = Array.from(new Set(allKeywords));
    console.log("Keyword bank size:", allKeywords.length);


    console.log("--- UPDATE BLOG: Updating blog fields ---");
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.tags = tagsArray;
    blog.category = req.body.category;
    console.log("Blog fields updated in memory.");


    console.log("--- UPDATE BLOG: NLP Enrichment ---");
    const keywords = extractKeywords(req.body.content);
    console.log("Extracted keywords:", JSON.stringify(keywords));

    const sentiment = getSentiment(req.body.content);
    console.log("Determined sentiment:", sentiment);

    const blogText = `${req.body.title} ${req.body.content} ${tagsArray.join(" ")}`;
    const vector = textToVector(blogText, allKeywords);
    console.log("Generated vector. Is it an array?", Array.isArray(vector));
    if(Array.isArray(vector)) {
        console.log("Does vector contain NaN?", vector.some(isNaN));
    }


    blog.keywords = keywords;
    blog.sentiment = sentiment;
    blog.vector = vector;
    console.log("--- UPDATE BLOG: All fields ready for save ---");

    await blog.save();
    console.log("--- UPDATE BLOG: SUCCESS ---");
    res.json(blog);
  } catch (err) {
    console.error("!!! CRITICAL: Blog update failed !!!", err);
    res.status(500).json({ message: "Error updating blog", error: err.message });
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
