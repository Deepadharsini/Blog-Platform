const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { userDashboard, creatorDashboard, getReadHistory } = require("../controllers/dashboardController");

router.get("/user", auth, userDashboard);
router.get("/creator", auth, creatorDashboard);
router.get("/read-history", auth, getReadHistory);

module.exports = router;
