/**
 * Created by ronsa on 11/5/2015.
 */

var page = require('webpage').create();
page.onConsoleMessage = function (msg) {
    console.log('Page title is ' + msg);
};

page.open('http://google.com', function(status) {
    page.evaluate( function(){
        console.log(document.title);
    });

    phantom.exit();
});

