const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ["reader", "creator"] },
  interests: [String],
  profilePicture: { type: String, default: "" },
  readHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
