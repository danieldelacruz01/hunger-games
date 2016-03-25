var $ = require('jquery')
var h = require('hyperscript')

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

module.exports = {
  appendResults: appendResults,
  createDiv: createDiv
}
