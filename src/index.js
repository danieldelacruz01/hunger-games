var $ = require('jquery')
var request = require('superagent')
var h = require('hyperscript')

$(document).ready(function() {
	var query = {
		count: 3,
		radius: 500,
		sort: 'real_distance',
		order: 'asc'
	}

	$('#submit-query').click(function(){
		query['lat'] = $('input#lat').val()
		query['lon'] = $('input#lon').val()
		
		request
			.get('../restaurants')
			.query(query)
			.end(function(err,res){
				console.log(res.body)
			})
	})

});