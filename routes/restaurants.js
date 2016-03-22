var express = require('express');
var router = express.Router();
var request = require('superagent')
var dotenv = require('dotenv')

var testLat = -41.2969092
var testLon = 174.7720306

//load environment variables
dotenv.load()

restaurants = []

function searchZomato(obj, callback){
	request
		.get('https://developers.zomato.com/api/v2.1/search')
		.set('user-key', process.env.ZOMATO)
		.query(obj)
		.end(function(err,res){
			// console.log(res.body)
			callback(res.body)
		})	
}

/* GET restaurants listing. */
router.get('/', function(req, res, next) {

	var queryObj = {
		count: 10,
		lat: -41.2969092,
		lon: 174.7720306,
		radius: 500,
		sort: 'real_distance',
		order: 'asc'
	}

	searchZomato(queryObj, function(result) {
		res.send(result)
	})
});


module.exports = router;
