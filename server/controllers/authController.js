const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getFullImageUrl = (req, path) => {
  if (!path) return "";
  return `${req.protocol}://${req.get("host")}${path}`;
};

exports.register = async (req, res) => {
  const { name, email, password, role, interests } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    user = new User({ name, email, passwordHash, role, interests });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const userResponse = user.toObject();
    userResponse.profilePicture = getFullImageUrl(req, user.profilePicture);
    delete userResponse.passwordHash;
    
    res.json({ user: userResponse, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Backend validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const userResponse = user.toObject();
    userResponse.profilePicture = getFullImageUrl(req, user.profilePicture);
    delete userResponse.passwordHash;

    res.json({ user: userResponse, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
