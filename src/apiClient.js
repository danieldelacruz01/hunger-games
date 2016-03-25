var request = require('superagent')


  const getGoogleMapData = function() {
		request
			.get('http://maps.googleapis.com/maps/api/geocode/json')
			.query({
				address: $('#searchTextField').val(),
				key: process.env.GMAPS
			})
			.end(function(err,res){
				var coords = res.body.results[0].geometry.location
				$('#lat').val(coords.lat)
				$('#lon').val(coords.lng)
			})
  }

const getRestaurantData = function() {
  var query = {
    count: 3,
    radius: 500,
    sort: 'rating',
    order: 'desc',
    lat:  $('input#lat').val(),
    lon:  $('input#lon').val()
  }

  request
    .get('../restaurants')
    .query(query)
    .end(function(err,res){
      createDiv()
      appendResults(res.body)
    })
}

module.exports = {
  getRestaurantData: getRestaurantData, 
  getGoogleMapData: getGoogleMapData
}

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
					h('li',
						h('a','View Menu',{'href':resObj.restaurants[i].menu})
					)
				)
			)
		}
	}
