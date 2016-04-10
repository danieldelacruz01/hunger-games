module.exports = {
	'user can input their address': function(client){
		client
			.url('http://localhost:3000')
			.waitForElementVisible('body', 1000)
			.setValue('#searchTextField', '275 Cuba Street, Wellington, New Zealand')
			// .pause(2000)
			.click('#next')
	},
	'user can select filters': function(client){
		client
			.waitForElementVisible('#filter', 1000)
			.click('label[for=walk]')
			.setValue('input#price', 4)
			// .pause(2000)
	},
	'user is shown multiple results': function(client){
		client
			.click('#submit-query')
			.waitForElementVisible('#results-row', 3000)
			// .pause(2000)
			.assert.containsText('h3.restaurant', 'Logan Brown Restaurant')
			// .pause(2000)
			.click('#nah')
			// .pause(2000)
			.assert.containsText('h3.restaurant', 'Ekim Burgers')
	},
	'selecting a restaurant returns a map': function(client){
		client
			.click('#yeah')
			// .pause(2000)
			.waitForElementVisible('#map', 1000)
			// .pause(2000)
			.end()
	}
}