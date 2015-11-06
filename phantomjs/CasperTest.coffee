

getLinks = ->
        links = document.querySelectorAll "h3.r a"
        Array::map.call links, (e) -> e.getAttribute "href"

links = []
casper = require('casper').create()

casper.start "http://google.com/", ->
 @fill "form[action='/search']", q: "casperjs", true

casper.then ->
 links = @evaluate getLinks
 @fill "form[action='/search']", q: "phantomjs", true

casper.then ->
 links = links.concat @evaluate(getLinks)

casper.run ->
 @echo links.length + "links found:"
 @echo(" - " + links.join("\n - ")).exit()

