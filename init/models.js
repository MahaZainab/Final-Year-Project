var fs = require('fs')
, Waterline = require('waterline')
, path = require('path')
, waterlineOrm = new Waterline();


module.exports = function (modelsDir){
  var model,name,init;

  fs.readdirSync(modelsDir).forEach(function(file) {
    model = require(path.join(modelsDir, file));
    name = file.substring(0,file.indexOf('.js'));
    init = Waterline.Collection.extend(model);;

    waterlineOrm.loadCollection(init);
    //console.log('Load model '+name);
  });
};

module.exports.waterlineOrm = waterlineOrm;
