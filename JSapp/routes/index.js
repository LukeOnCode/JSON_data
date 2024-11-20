const express = require('express');
const router = express.Router();
const { wikimap } = require('../config')

// @route GET /
router.get('/', (req, res) => { 
  res.render(
    'index', 
    {
      title: "Javascript - Exercise",
      h1: "Hello to Javascript Exercise!",
      lead: "I made a lot of different exercise.",
      leadlist: "See all list of exercise",
      nav: [
        {title: 'Home', link: '#'},
        {title: 'Exercise list', link: '#'},
        {title:'Resources used', link: '#'}
      ],
      exercise: [
        {title: 'Exercise 1', description: 'Descrizione del servizio', link:'/index/exercise_1', button: 'Visit'},
        {title: 'Exercise 2', description: 'Descrizione del servizio', link:'/index/exercise_2', button: 'Visit'},
        {title: 'Exercise 3', description: 'Descrizione del servizio', link:'/index/exercise_3', button: 'Visit'}
      ]
    }
  )
})

router.get('/KEY', (req, res) => {
  res.json({key: wikimap})
})

module.exports = router;