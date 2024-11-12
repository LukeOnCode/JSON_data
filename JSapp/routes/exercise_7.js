const express = require("express");
const router = express.Router();
const path = require("path");
const htmlPath = path.join(path.resolve(__dirname, "..", "html/index_7.htm"));
// @route GET /exercise_7

router.get("/", (req, res) => {
  res.sendFile(htmlPath);
});

module.exports = router;
