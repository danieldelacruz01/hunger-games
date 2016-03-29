var $ = require('jquery')
var h = require('hyperscript')
var request = require('superagent')

var client = require('./apiClient')
var view = require('./view')

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
	
		$('#get-coords').click(function(event){
		console.log($('#searchTextField').val())
		$('#searchTextField').addClass('has-success has-feedback')
	})
	$('#get-coords').click(function(){
		client.getGoogleMapData
		scrollToAnchor('select-cuisines')
	})
	//$('#submit-query').click(client.getRestaurantData)

  $('#submit-query').click(function() {
      var cuisineIds = [];
      $('input[name=cuisine]:checked').each(function() {
          cuisineIds.push(this.id)
      });
  		var distance = parseInt($('input[name=transport]:checked').attr("value"))
      var filters = {
      	cuisines: cuisineIds.join(","),
      	radius: distance
      }
      client.getRestaurantData(filters)
  });

  $('#test').click(function(){
	  view.loadCuisines()
	})
	function scrollToAnchor(id){
    var anchor = $("div#"+id);
    $('html,body').animate({scrollTop: id.offset().top},'slow');
	}
});
