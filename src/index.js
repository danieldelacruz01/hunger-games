var $ = require('jquery')
var h = require('hyperscript')
var request = require('superagent')

var client = require('./apiClient')
var view = require('./view')
var location = require('./location')

$(document).ready(function() {
	$('#filter, #submit-query, #results, #map').hide()

	//prompt user for geolocation data
	if(navigator.geolocation){
		location.getLocation()
	} 
	//autocomplete address lookup
	location.autocompleteAddress()

	//load next step - cuisines div
	$('#next').click(function(event){
		event.preventDefault();

		var validlocation = location.validateAddressField()		
		if(validlocation){	
			$('#filter, #submit-query').show()
		  view.loadCuisines()
		  //scroll to cuisines
	    view.scrollToElement("#select-filters", 500)
		}
	})
	var restaurants = []
	var displayedResult = 0

  $('#submit-query').click(function(event) {
  	event.preventDefault()
  	$('#result').remove()
	  
	  var userFilters = client.getUserParams()

	  client.getRestaurantData(userFilters, function(restaurantData){
	  	restaurants = restaurantData.restaurants
	  	$('#results').show()
	  	view.appendResults(restaurants[displayedResult])
	  	displayedResult++

	 		view.scrollToElement("#results", 500)
	 	})
  })

	$("div#results").delegate("#nah", "click", function(){
    $('#result, #results-button').remove()
		if (displayedResult > restaurants.length - 1){
			$('#results').append(
				h('h2', 'No more results. Try searching again!')
			)
			displayedResult = 0
			return
		}
  	view.appendResults(restaurants[displayedResult])
  	view.scrollToElement("#results", 1)
    displayedResult++
	});
	$("div#results").delegate("#yeah", "click", function(){
    location.displayDirections()
    $('#map').show()
    view.scrollToElement("#map", 500)
	});
});
