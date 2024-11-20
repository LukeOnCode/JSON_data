const express = require('express');
const router = express.Router();

// @route GET /exercise_1
router.get('/', ( req, res ) => { 
  res.render(
    'index_1', 
    {
      title: 'EXERCISE 1',
      nav: 'JSON PRACTICE EXERCISE',
      h1: 'JSON',
      get: 'get',
      update: 'Update user',
      remove: 'Remove user',
      create: 'Create user'
    }
  )
})

module.exports = router;