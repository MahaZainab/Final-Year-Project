/**
 * Require Statements to get the two dependencies
 * 1. Require Module
 * 2. FeedParser Module
 */

var request = require('request'),
    FeedParser = require('feedparser');

/**
 * Represents a FeedParserPromise
 * @constructor
 */
var FeedParserPromise = function() {

};

/**
 * This is an instance member of FeedParserPromise class, FeedParserPromise#fetch.
 * @memberof FeedParserPromise.prototype
 * @param {string} URL for which the feed is required. 
 * @return {Promise}
 */
FeedParserPromise.prototype.fetch = function(options) {
    return new Promise(function(resolve, reject) {
        const feedparser = new FeedParser();
        var items = [];

        feedparser.on('error', (error) => {
            reject(error);
        });
        feedparser.on('readable', () => {
            var item;
            while (item = feedparser.read()) {
                items.push(item);
            }
            return items;
        });

        request.get(options)
            .on('error', (error) => {
                reject(error);
            })
            .pipe(feedparser)
            .on('end', () => {
                return resolve(items);
            });
    });
}

/**
 * This function returns a list of Promises
 * @memberof FeedParserPromise.prototype
 * @param {Array} URLs for which the feed is required. 
 * @return {Promise[]}
 */
FeedParserPromise.prototype.fetchAll = function(urls) {
    var PromiseArray = new Array();
    if (urls.length > 0) {
        for (var i = 0; i < urls.length; i++) {
            PromiseArray.push(this.fetch(urls[i]));
        }
    }
    return PromiseArray;
}

module.exports = FeedParserPromise;
