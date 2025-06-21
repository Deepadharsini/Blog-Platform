const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${req.user._id}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.post(
  "/profile/upload",
  authMiddleware,
  upload.single("profilePic"),
  uploadProfilePicture
);

module.exports = router; 