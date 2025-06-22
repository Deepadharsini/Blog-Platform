const User = require("../models/User");

// Helper to construct full URL
const getFullImageUrl = (req, path) => {
  if (!path) return "";
  const protocol = req.secure ? 'https' : 'http';
  return `${protocol}://${req.get("host")}${path}`;
};

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");
  if (user) {
    const userWithFullUrl = user.toObject();
    userWithFullUrl.profilePicture = getFullImageUrl(req, user.profilePicture);
    res.json(userWithFullUrl);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.interests = req.body.interests || user.interests;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      interests: updatedUser.interests,
      profilePicture: getFullImageUrl(req, updatedUser.profilePicture),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Upload profile picture
// @route   POST /api/user/profile/upload
// @access  Private
const uploadProfilePicture = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({
      message: "Profile picture uploaded successfully",
      profilePicture: getFullImageUrl(req, user.profilePicture),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = { getUserProfile, updateUserProfile, uploadProfilePicture }; 