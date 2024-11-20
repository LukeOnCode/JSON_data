const express = require('express');
const router = express.Router();

// @route GET /exercise_1
router.get('/', ( req, res ) => { 
  res.render('index_1', {title: 'EXERCISE 1'})
})

module.exports = router;