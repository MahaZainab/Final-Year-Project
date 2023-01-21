var FeedParserPromise = require('../lib/index.js');

var feeds = new FeedParserPromise(500);
var fetchedFeeds=feeds.fetch('http://thing.live/rss');

fetchedFeeds.then((val)=>{
    console.log(val);
    console.log("=====================");
}).catch((error)=>{
    console.log(error)
});

