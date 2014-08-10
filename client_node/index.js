var fs = require('fs');
var request = require('request');

var IMG = __dirname + '/sample.png'
fs.createReadStream(IMG).pipe(request.post('http://localhost:3000'))
  .on('error', function(err) { 
    console.error(err); 
  })
  .on('finish', function() { 
    console.log('done'); 
  });
