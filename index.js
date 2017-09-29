var component = require('ractive/lib/component.js');
var fs = require('fs');
var path = require('path');

module.exports = function(source) {
  var self = this;
  this.async();

  function readFile(file) {
    var f = path.join(self.context, file);
    self.addDependency(f);
    return new Promise((ok, fail) => {
      fs.readFile(f, { encoding: 'utf8' }, function(err, data) {
        if (err) return fail(err);
        ok(data);
      });
    });
  }

  return component.build(source, self.query || {}, readFile).then(out => {
    self.callback(null, out);
  }, err => self.callback(err));
};
