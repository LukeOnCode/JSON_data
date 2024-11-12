const express = require("express");
//const jsonServer = require("json-server");
const app = express();
const path = require("path");
require('dotenv').config()

const index = require("./routes/index")
const exercise_1 = require("./routes/exercise_1");
const exercise_2 = require("./routes/exercise_2");
const exercise_3 = require("./routes/exercise_3");
const exercise_4 = require("./routes/exercise_4");
const exercise_5 = require("./routes/exercise_5");
const exercise_6 = require("./routes/exercise_6");
const exercise_7 = require("./routes/exercise_7");
const exercise_8 = require("./routes/exercise_8");
const exercise_9 = require("./routes/exercise_9");
const exercise_10 = require("./routes/exercise_10");
const exercise_11 = require("./routes/exercise_11");
const exercise_12 = require("./routes/exercise_12");

const files = require("./middleware/javascript_fn");
const bodyParser = require("body-parser");

app.use(express.static("exercise"));
//app.use("/api", jsonServer.router("db.json"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api', jsonServer.defaults());

//define routes
app.use("/", index);
app.use("/index/exercise_1", exercise_1);
app.use("/index/exercise_2", exercise_2);
app.use("/index/exercise_3", exercise_3);
app.use("/index/exercise_4", exercise_4);
app.use("/index/exercise_5", exercise_5);
app.use("/index/exercise_6", exercise_6);
app.use("/index/exercise_7", exercise_7);
app.use("/index/exercise_8", exercise_8);
app.use("/index/exercise_9", exercise_9);
app.use("/index/exercise_10", exercise_10);
app.use("/index/exercise_11", exercise_11);
app.use("/index/exercise_12", exercise_12);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`APP LISTENING ON ${process.env.PORT}`);
});
