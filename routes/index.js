const express = require('express');
const router = express.Router();
const path = require('path');

const htmlPath = path.join(path.resolve(__dirname, '..', 'html/index.html'));
// @route GET /exercise_1

console.log(process.env.WIKIMAP + ' This ');
router.get('/', ( req, res ) => { 
  res.sendFile(htmlPath)
})

router.get('/KEY', (req,res) => {
  res.json({key: process.env.WIKIMAP})
})

module.exports = router;