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
      nav: [
        {title: 'Home', link: '#'},
        {title: 'Exercise list', link: '#'},
        {title:'Resources used', link: '#'}
      ],
      exercise: [
        {title: 'Exercise 1',  description: 'Call local json-server - CRUD operations', link:'/index/exercise_1',  button: 'Visit'},
        {title: 'Exercise 2',  description: 'Call Wikipedia research throught FETCH API', link:'/index/exercise_2',  button: 'Visit'},
        {title: 'Exercise 3',  description: 'Call Wikimapia research throught FETCH API', link:'/index/exercise_3',  button: 'Visit'},
        {title: 'Exercise 4',  description: 'Call local json-server and perform word searching query', link:'/index/exercise_4',  button: 'Visit'},
        {title: 'Exercise 5',  description: 'Call randomuser.me that generates desired numbers of users data', link:'/index/exercise_5',  button: 'Visit'},
        {title: 'Exercise 6',  description: '', link:'/index/exercise_6',  button: 'Visit'},
        {title: 'Exercise 7',  description: 'Get what Chuck says', link:'/index/exercise_7',  button: 'Visit'},
        {title: 'Exercise 8',  description: 'Call swapi and search your favourites..', link:'/index/exercise_8',  button: 'Visit'},
        {title: 'Exercise 9',  description: 'You have answears?', link:'/index/exercise_9',  button: 'Visit'},
        {title: 'Exercise 10', description: 'Get your answear with StackExchange', link:'/index/exercise_10', button: 'Visit'},
        {title: 'Exercise 11', description: 'All countries info', link:'/index/exercise_11', button: 'Visit'},
        {title: 'Exercise 12', description: 'Get country info by name', link:'/index/exercise_12', button: 'Visit'}
      ]
    }
  )
})

router.get('/KEY', (req, res) => {
  res.json({key: wikimap})
})

module.exports = router;