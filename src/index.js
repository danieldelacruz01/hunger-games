var $ = require('jquery')
var h = require('hyperscript')
var request = require('superagent')

var client = require('./apiClient')
var view = require('./view')

$(document).ready(function() {
	$('#filter, #submit-query, #results').hide()

	//prompt user for geolocation data
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(pos){
			request
				.get('https://maps.googleapis.com/maps/api/geocode/json')
				.query({
					"latlng": pos.coords.latitude+','+pos.coords.longitude
				})
				.end(function(err,res){
					var address = res.body.results[0].formatted_address
					$('#searchTextField').val(address)
				})
			$('#lat').val(pos.coords.latitude)
			$('#lon').val(pos.coords.longitude)
		})
	} 

	//autocomplete address lookup
	var input = document.getElementById('searchTextField');
	var options = {
		types: ['geocode']
	}
	autocomplete = new google.maps.places.Autocomplete(input, options);

	//load next step - cuisines div
	$('#next').click(function(event){
		event.preventDefault();

  	if(!$('#lat').val()){
  		if(!$('#searchTextField').val()) {
  			$('#no-address').remove()

				$('#location-form').prepend(
					h('div#no-address.alert.alert-warning', "Please type in your location", {role:"alert"})
				)
			} else {
				client.getCoords($('#searchTextField').val())
			}
		} else {		
			$('#filter, #submit-query').show()
		  view.loadCuisines()
		  //scroll to cuisines
	    view.scrollToElement("#select-filters")
		}
	})

	var restaurants = []
	var displayedResult = 0

  $('#submit-query').click(function(event) {
  	event.preventDefault()
  	$('#result').remove()

    var cuisineIds = [];
    $('input[name=cuisine]:checked').each(function() {
        cuisineIds.push(this.id)
    });
    
		var distance = parseInt($('input[name=transport]:checked').attr("value"))

    var filters = {
    	cuisines: cuisineIds.join(","),
    	radius: distance,
    	price: $('#price').val()
    }

    client.getRestaurantData(filters, function(restaurantData){
    	restaurants = restaurantData.restaurants
    	$('#results').show()
    	view.appendResults(restaurants[displayedResult])
    	displayedResult++

   		view.scrollToElement("#results")
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
    displayedResult++
	});
});
