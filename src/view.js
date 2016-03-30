var $ = require('jquery')
var h = require('hyperscript')

function loadCuisines(){
  $('.selectImg').remove()
  for (var i = 0; i < cuisines.length; i++){
    $('#cuisines').append(
      h('div.col-xs-3.col-sm-2.selectImg', 
        h('input', {type: "radio", name: "cuisine", id: cuisines[i].id}),
        h('label', {htmlFor: cuisines[i].id},
          h('img.img-thumbnail', {src: "/images/" + cuisines[i].id + ".jpg"}),
          cuisines[i].type
        )
      )
    )
  }
}

var cuisines = [ 
  {"id": "152","type": "African"},
  {"id": "1","type": "American"},
  {"id": "133","type": "British"},
  {"id": "25","type": "Chinese"},
  {"id": "112","type": "Filipino"},
  {"id": "45","type": "French"},
  {"id": "134","type": "German"},
  {"id": "156","type": "Greek"},
  {"id": "148","type": "Indian"},
  {"id": "55","type": "Italian"},
  {"id": "60","type": "Japanese"},
  {"id": "136","type": "Latin"},
  {"id": "69","type": "Malaysian"},
  {"id": "73","type": "Mexican"},
  {"id": "147","type": "Moroccan"},
  {"id": "321","type": "Pacific"},
  {"id": "89","type": "Spanish"},
  {"id": "95","type": "Thai"},
  {"id": "142","type": "Turkish"},
  {"id": "99","type": "Vietnamese"}
]

function scrollToElement(elem){
  var offset = $(elem).offset();
  $("html, body").animate({
    scrollTop: offset.top
  }, 500);
}


function createDiv(){
  $('div#results').remove()
  $('body').append(
    h('div#results.container',
      h('div#results-row.row', 
        h('h2', 'How about...')
      )
    )
  )
}

function appendResults(resObj){
  $('div#results').append(
    h('div#result.row',
      h('div.col-xs-4.col-xs-offset-2',
        h('img.restaurant-img.img-thumbnail', {src: resObj.photo})
      ),
      h('div.col-xs-4',
        h('h3.restaurant', resObj.name),
        h('p', resObj.location.address),
        h('ul',
          h('li', 'Cuisine: '+resObj.cuisines),
          h('li', 'Rating: '+resObj.rating),
          h('li',
            h('a','View Menu',{'href':resObj.menu})
          )
        )
      )
    ),
    h('div#results-button.row',
      h('br'),
      h('div.col-xs-4.col-xs-offset-2.col-sm-2.col-sm-offset-4',
        h('button#yeah.btn.btn-primary.btn-lg.next-step', 'Yeah!', {type: 'button'})
      ),
      h('div.col-xs-4.col-sm-2',
        h('button#nah.btn.btn-default.btn-lg.next-step', 'Nah', {type: 'button'})
      )
    )
  )
}

module.exports = {
  scrollToElement: scrollToElement,
  appendResults: appendResults,
  createDiv: createDiv,
  loadCuisines: loadCuisines
}
