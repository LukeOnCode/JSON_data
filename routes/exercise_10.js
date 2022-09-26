const express = require("express");
const router = express.Router();
const path = require("path");
const htmlPath = path.join(path.resolve(__dirname, "..", "html/index_10.htm"));
// @route GET /exercise_10

router.get("/", (req, res) => {
  res.sendFile(htmlPath);
});

module.exports = router;
