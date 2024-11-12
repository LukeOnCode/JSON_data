const express = require('express');
const router = express.Router();
const path = require('path');
const { wikimap } = require('../config')
const htmlPath = path.join(path.resolve(__dirname, '..', 'html/index.html'));

// @route GET /exercise_1
console.log(wikimap)

router.get('/', (req, res) => { 
  res.sendFile(htmlPath)
})

router.get('/KEY', (req, res) => {
  res.json({key: wikimap})
})

module.exports = router;