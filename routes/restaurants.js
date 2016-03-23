var express = require('express');
var router = express.Router();
var request = require('superagent')
var dotenv = require('dotenv')

//load environment variables
dotenv.load()

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

	// var queryObj = {
	// 	// count: 10,
	// 	// lat: -41.2969092,
	// 	// lon: 174.7720306,
	// 	// radius: 500,
	// 	// sort: 'real_distance',
	// 	// order: 'asc'
	// }

	searchZomato(req.query, function(result) {
		var resultaurants = []

		for (var i = 0; i < result.restaurants.length; i++){
			var resultaurant = result.restaurants[i].restaurant
			var resultsObj = {
				"name": resultaurant.name,
				"location": resultaurant.location,
				"cuisines": resultaurant.cuisines,
				"rating": resultaurant.user_rating.aggregate_rating,
				"photos": resultaurant.photos_url,
				"menu": resultaurant.menu_url
			}
			resultaurants.push(resultsObj)
		}

		res.send(resultaurants)
	})
});

module.exports = router;