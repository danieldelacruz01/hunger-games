var express = require('express');
var router = express.Router();
var request = require('superagent')
var dotenv = require('dotenv')

//load environment variables
dotenv.load()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('restaurants');
});

module.exports = router;
