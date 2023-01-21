var FeedParserPromise = require('../lib/index.js');

var feeds = new FeedParserPromise();
var fetchedFeedsPromise=feeds.fetchAll([
    'http://feeds.reuters.com/reuters/INtopNews',
    'http://feeds.reuters.com/reuters/INbusinessNews',
    'http://feeds.reuters.com/reuters/INsouthAsiaNews',
    'http://feeds.reuters.com/reuters/INworldNews'
    ]);
Promise.all(fetchedFeedsPromise).then((item)=>{
    console.log(item);
}).catch((e)=>{
    console.log(error)
});
