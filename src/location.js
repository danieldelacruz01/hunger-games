var $ = require('jquery')
var request = require('superagent')
var h = require('hyperscript')

var getLocation = function(){
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

var autocompleteAddress = function(){
	var input = document.getElementById('searchTextField');
	var options = {
		types: ['geocode']
	}
	autocomplete = new google.maps.places.Autocomplete(input, options);
}

var validateAddressField = function(){
	if(!$('#lat').val()){
		if(!$('#searchTextField').val()) {
			$('#no-address').remove()

			$('#location-form').prepend(
				h('div#no-address.alert.alert-warning', "Please type in your location", {role:"alert"})
			)
			return false	
		}
		getCoords($('#searchTextField').val())
	}
	return true
}

var getCoords = function(address) {
  request
    .get('http://maps.googleapis.com/maps/api/geocode/json')
    .query({
      address: address,
      key: process.env.GMAPS
    })
    .end(function(err,res){
      var coords = res.body.results[0].geometry.location
      $('#lat').val(coords.lat)
      $('#lon').val(coords.lng)
    })
}

var displayDirections = function(){
	var myLat = $('#lat').val()
	var myLon = $('#lon').val()

	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	var map;

	calcRoute()
	initialize()

	function initialize() {
	  directionsDisplay = new google.maps.DirectionsRenderer();
	  var myLocation = new google.maps.LatLng(myLat, myLon);
	  var mapOptions = {
	    zoom:15,
	    center: myLocation, 
	    styles: mapStyle
	  }
	  map = new google.maps.Map(document.getElementById("map"), mapOptions);
	  directionsDisplay.setMap(map);
	}

	function calcRoute() {
	  var query = {
	    origin: myLat+","+myLon,
	    destination:$('#restaurant-address').html(),
	    travelMode: google.maps.TravelMode.DRIVING
	  }
	  directionsService.route(query, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(result);
	    }
	  });
	}
}

var mapStyle = [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]

module.exports = {
	getLocation: getLocation,
	autocompleteAddress: autocompleteAddress,
	validateAddressField: validateAddressField,
	displayDirections: displayDirections
}