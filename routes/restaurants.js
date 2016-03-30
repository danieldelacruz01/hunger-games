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
			callback(res.body)
		})	
}

function formatResults(result, queryPrice){
	var resultaurants = {'restaurants':[]}

	for (var i = 0; i < result.restaurants.length; i++){
		var resultaurant = result.restaurants[i].restaurant
		var resultObj = {
			"name": resultaurant.name,
			"location": resultaurant.location,
			"cuisines": resultaurant.cuisines,
			"rating": resultaurant.user_rating.aggregate_rating,
			"photo": resultaurant.featured_image,
			"menu": resultaurant.menu_url,
			"price": resultaurant.price_range
		}
		resultaurants.restaurants.push(resultObj)
	}

	var filteredResultaurants = resultaurants.restaurants.filter(function(restaurant){
		return restaurant.price == queryPrice
	})

	return resultaurants
}

/* GET restaurants listing. */
router.get('/', function(req, res, next) {

	console.log(req.query.price, "this is the price set by the user")

	var query = {
		count: 10,
		radius: req.query.radius,
		sort: 'rating',
		order: 'desc',
		lat: req.query.lat,
		lon: req.query.lon,
		cuisines: req.query.cuisines
	}

	searchZomato(query, function(apiResult) {
		// console.log(req.query)
		var resultaurants = formatResults(apiResult, req.query.price)
		
		res.send(resultaurants)
	})
});

module.exports = router;