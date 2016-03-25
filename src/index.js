var $ = require('jquery')
var h = require('hyperscript')
var request = require('superagent')

var client = require('./apiClient')

$(document).ready(function() {

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
	
	$('#get-coords').click(client.getGoogleMapData)
	$('#submit-query').click(client.getRestaurantData)
});
