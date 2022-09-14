const express = require('express')
const jsonServer = require('json-server')
const app = express()
const exercise_1 = require('./routes/exercise_1')
const exercise_2 = require('./routes/exercise_2')
const exercise_3 = require('./routes/exercise_3')
const exercise_4 = require('./routes/exercise_4')
const PORT = 5000;

app.use('/api', jsonServer.router('db.json'));
//app.use('/api', jsonServer.defaults());

app.get('/index', (req, res)=>{
    res.status(200).json('')
})

//define routes
app.use('/index/exercise_1', exercise_1)
app.use('/index/exercise_2', exercise_2)
app.use('/index/exercise_3', exercise_3)
app.use('/index/exercise_4', exercise_4)

app.listen(PORT, ()=>{
    console.log(`APP LISTENING ON ${PORT}`);
})