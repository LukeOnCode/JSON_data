const express = require('express')
const jsonServer = require('json-server')
const app = express()
const path = require('path')
const exercise_1 = require('./routes/exercise_1')
const exercise_2 = require('./routes/exercise_2')
const exercise_3 = require('./routes/exercise_3')
const exercise_4 = require('./routes/exercise_4')
const exercise_5 = require('./routes/exercise_5')
const PORT = 5000;
const files = require('./middleware/javascript_fn')
const bodyParser = require('body-parser')

app.use(express.static('exercise'))
app.use('/api', jsonServer.router('db.json'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//app.use('/api', jsonServer.defaults());

//define routes
app.use('/index/exercise_1', exercise_1)
app.use('/index/exercise_2', exercise_2)
app.use('/index/exercise_3', exercise_3)
app.use('/index/exercise_4', exercise_4)
app.use('/index/exercise_5', exercise_5)

app.listen(PORT, (err)=>{
    if (err) throw err;
    console.log(`APP LISTENING ON ${PORT}`);
})