const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createBlog, getAllBlogs, getBlogById, deleteBlog, updateBlog, incrementView, likeBlog } = require("../controllers/blogController");

router.post("/create", auth, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", auth, deleteBlog);
router.put("/:id", auth, updateBlog);
router.post("/:id/view", auth, incrementView);
router.post("/:id/like", auth, likeBlog);

module.exports = router;
