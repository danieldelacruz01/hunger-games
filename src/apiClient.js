var request = require('superagent')
var $ = require('jquery')

var getUserParams = function(){
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
  return filters
}

var getRestaurantData = function(filters, callback) {
  var query = {
    radius: filters.radius || 500,
    lat:  $('input#lat').val(),
    lon:  $('input#lon').val(),
    cuisines: filters.cuisines || null,
    price: filters.price
  }

  request
    .get('../restaurants')
    .query(query)
    .end(function(err,res){
    	callback(res.body)
    })
}

module.exports = {
  getUserParams: getUserParams,
  getRestaurantData: getRestaurantData
}
