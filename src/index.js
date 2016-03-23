var $ = require('jquery')
var request = require('superagent')
var h = require('hyperscript')

$(document).ready(function() {

	navigator.geolocation.getCurrentPosition(function(pos){
		$('#lat').val(pos.coords.latitude)
		$('#lon').val(pos.coords.longitude)
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