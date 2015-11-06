/**
 * Created by ronsa on 11/5/2015.
 */

var page = new WebPage(), output = { errors: [], results: null };
if (phantom.args.length == 0) {
    console.log('Specify a city, e.g. "Baltimore, Maryland"');
    phantom.exit(1);
}

page.open('http://www.reddit.com/r/' + phantom.args[0], function(status) {
   if (status !== 'success') {
       output.errors.push('Unable to access network');
   } else {
       var cells = page.evaluate(function() {
           try {
               var cells = document.querySelectorAll('p.title a.title');
               return Array.prototype.map.call(cells, function(cell) {
                   return { post_title: cell.innerText };
               })}
           catch (e) {
               return [];
           }

       });
       if (!cells || !cells.length > 0) {
           output.errors.push('No data');
       } else {
           output.results = {
               subreddit: phantom.args[0],
               posts: cells
           };
       }
       console.log(JSON.stringify(output, null, '   '));
   }
    phantom.exit();
});