var $ = require('jquery')
var request = require('superagent')
var h = require('hyperscript')

$(document).ready(function() {

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(pos){
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
	$('button#get-coords').click(function(){
		request
			.get('http://maps.googleapis.com/maps/api/geocode/json')
			.query({
				address: $('#searchTextField').val(),
				key: process.env.GMAPS
			})
			.end(function(err,res){
				console.log(res.body.results[0].geometry.location)
			})
	})

	var query = {
		count: 3,
		radius: 500,
		sort: 'rating',
		order: 'desc'
	}

	$('#submit-query').click(function(){
		query['lat'] = $('input#lat').val()
		query['lon'] = $('input#lon').val()
		
		request
			.get('../restaurants')
			.query(query)
			.end(function(err,res){
				createDiv()
				appendResults(res.body)
			})
	})

	function createDiv(){
		$('body').append(
			h('div#results',
				h('h2', 'You should try:')
			)
		)
	}

	function appendResults(resObj){
		for (var i = 0; i < resObj.restaurants.length; i++){
			$('div#results').append(		
				h('h3', resObj.restaurants[i].name),
				h('p', resObj.restaurants[i].location.address),
				h('ul',
					h('li', 'Cuisine: '+resObj.restaurants[i].cuisines),
					h('li', 'Rating: '+resObj.restaurants[i].rating),
					h('li', 'Menu: ',
						h('a','Click here',{'href':resObj.restaurants[i].menu})
					)
				)
			)
		}
	}
});