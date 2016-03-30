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

module.exports = {
	getLocation: getLocation,
	autocompleteAddress: autocompleteAddress,
	validateAddressField: validateAddressField
}