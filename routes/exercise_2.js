const express = require('express');
const router = express.Router();

// @route GET /exercise_1

router.get('/', ( req, res ) => { 
    res.send('exercise 1')
})

module.exports = router;