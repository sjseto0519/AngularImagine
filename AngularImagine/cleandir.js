var cleandir = require('clean-dir');

cleandir('wwwroot', function (err) { console.log(err) });
