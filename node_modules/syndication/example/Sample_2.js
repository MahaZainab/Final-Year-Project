var FeedParserPromise = require('../lib/index.js');

var feeds = new FeedParserPromise();
var fetchedFeeds = feeds.fetch('http://thing.live/rss');
var fetchedFeeds1 = feeds.fetch('http://rss.cnn.com/rss/edition.rss');

/*Using Promise.all() to Resolve*/
Promise.all([
    fetchedFeeds,
    fetchedFeeds1
]).then((val) => {
    console.log(val);
}).catch((error) => {
    console.log(error)
});