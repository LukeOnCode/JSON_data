const express = require('express');
const router = express.Router();
const path = require('path');

const htmlPath = path.join(path.resolve(__dirname, '..', 'html/index_1.htm'));
// @route GET /exercise_1

router.get('/', ( req, res ) => { 
  res.sendFile(htmlPath)
})

module.exports = router;