const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jsPath = path.join(path.resolve(__dirname, '..'), '/exercise')
// @route GET /exercise_1

function getDirectoryContent(req, res, next) {
    fs.readdir(jsPath , function (err, jsfiles) {
      if (err) { return next(err); }
      res.locals.filenames = jsfiles;
      console.log(res.locals.filenames);
      next();
    });
  }
function getStringTo(req, res, next){
    const jsPath = req.baseUrl;
    res.locals.path = jsPath;
    next();
}

router.get('/', getDirectoryContent,getStringTo, ( req, res ) => { 
    console.log(req.baseUrl);
    console.log(`${res.locals.filenames} and ${res.locals.path}`);
    res.send('exercise 1');
    
})

module.exports = router;