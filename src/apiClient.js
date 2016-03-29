var request = require('superagent')
var $ = require('jquery')

var view = require('./view')

var getGoogleMapData = function() {
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

var getRestaurantData = function(filters) {
	console.log(filters.cuisines)
  var query = {
    count: 3,
    radius: filters.radius,
    sort: 'rating',
    order: 'desc',
    lat:  $('input#lat').val(),
    lon:  $('input#lon').val(),
    cuisines: filters.cuisines
  }

  request
    .get('../restaurants')
    .query(query)
    .end(function(err,res){
      view.createDiv()
      view.appendResults(res.body)
    })
}

module.exports = {
  getRestaurantData: getRestaurantData, 
  getGoogleMapData: getGoogleMapData
}
