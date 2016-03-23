var $ = require('jquery')
var request = require('superagent')
var h = require('hyperscript')

$(document).ready(function() {
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

	function appendResults(resArr){
		for (var i = 0; i < resArr.length; i++){
			$('div#results').append(		
				h('h3', resArr[i].name),
				h('ul',
					h('li', 'Cuisine: '+resArr[i].cuisines),
					h('li', 'Rating: '+resArr[i].rating)
				)
			)
		}
	}
});