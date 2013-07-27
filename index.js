var es = require('event-stream'),
	cleanCSS  = require('clean-css'),
  clone = require('clone');

module.exports = function(opt){
  if (!opt) opt = {};

  function modifyContents(file, cb){
    var newFile = clone(file);

    var newContents = cleanCSS.process(String(newFile.contents), opt);
    newFile.contents = new Buffer(newContents);
    cb(null, newFile);
  }
  return es.map(modifyContents);
}