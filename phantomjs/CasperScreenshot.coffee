casper = require('casper').create()

casper.start 'http://www.google.com/images?q=ghost', ->
  @.capture 'google-ghosts.png'
  @.captureSelector 'google-ghosts-selected.png', '#search'


casper.run()