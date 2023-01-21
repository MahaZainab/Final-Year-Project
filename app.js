var http = require('http');
var express = require('express');
var bodyParser= require('body-parser');
var methodOverride= require('method-override');
var path = require('path');
var Syndication = require("syndication");
var natural = require("natural");
var app = express();

var tokenizer = new natural.WordTokenizer();
//console.log(tokenizer.tokenize("your dog has fleas."));
//natural.LancasterStemmer.attach();
app.get('/test/:string', function(req, res){
  var string = req.params.string;
  //var query = string.tokenizeAndStem();
  var queryString = query.toString();
  var temp = queryString.replace(/,\s?/g, " ");
  //console.log(temp);
  db('data').find().exec(function(err, models){
    for(var i = 0; i < models.length; i++){
      if(models[i].description != null){
        //console.log(tokenizer.tokenize(models[i].description));

        var s1 = models[i].description.tokenizeAndStem();
        var s2 = s1.toString();
        var s3 = s2.replace(/,\s?/g, " ");
        //console.log(s3);
        console.log(natural.DiceCoefficient(temp, s3));
      console.log("=======================================================");
      }
      
    }
  });
});

app.get('/insert', function(req, res){
  var feeds = new Syndication();
var fetchedFeeds1 = feeds.fetch('http://rss.cnn.com/rss/edition.rss');
 
Promise.all([
    fetchedFeeds1
]).then((val) => {
    var j = 0;
    for(var i = 0; i < val[0].length; i++){
      //console.log(val[0][i].title);
      var data = {};
      data.title = val[0][i].title;
      data.description = val[0][i].description;
      data.link = val[0][i].link;
      data.date = val[0][i].date;
      db('data').create(data, function(err){
        if(err){
          throw err;
        }else{
          j++;
          console.log(j);
        }
      });
    }
}).catch((error) => {
    console.log(error)
});
});

/*var feeds = new Syndication();
var fetchedFeeds1 = feeds.fetch('http://rss.cnn.com/rss/edition.rss');
 
Promise.all([
    fetchedFeeds1
]).then((val) => {
    var j = 0;
    for(var i = 0; i < val[0].length; i++){
      //console.log(val[0][i].title);
      var data = {};
      data.title = val[0][i].title;
      data.description = val[0][i].description;
      data.link = val[0][i].link;
      data.date = val[0][i].date;
      db('data').create(data, function(err){
        if(err){
          throw err;
        }else{
          j++;
          console.log(j);
        }
      });
    }
}).catch((error) => {
    console.log(error)
});
*/





//Middlewares
app.use(bodyParser());
app.use(methodOverride());


var waterlineConfig = require('./config/waterline')
, waterlineOrm = require('./init/models').waterlineOrm;
var modelPath = path.join(__dirname, '/models');
require('./init/models')(modelPath);

waterlineOrm.initialize(waterlineConfig, function (err, models) {
    if (err) throw err;

    db = function (table) { return models['collections'][table];
     };
    db.collections = models.collections;
    db.connections = models.connections;
    var server = http.createServer(app).listen(8080, function () {
    console.log('Express server listening on port ' + 8080);
  });
    
});


