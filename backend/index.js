var bodyparser = require('body-parser');
var express = require('express');
var uuid = require('node-uuid');
var fs = require('fs');
var Buffer = require('buffer').Buffer;

var IMAGE_DIR = __dirname + '/images';

var app = express();

app.use(bodyparser.json());

app.get('/', function(req, res) {
  res.status(200).json({msg: 'hello!'});
});

app.post('/', function(req, res) {
  console.log('Incoming...');
  console.log(req.headers);

  var id = uuid.v4();
  var out = fs.createWriteStream(IMAGE_DIR + '/' + id + '.png');
  
  out.on('finish', function() { 
    console.log('Upload complete');
    res.status(201).json({msg: 'created'}); 
  });
  out.on('error', function(err) { 
    console.error(err);
    res.status(500).json({err: err}); 
  });

  // Simplest possible solution if we don't need to do anything spedific with the incoming data
  // and just need to store them somewhere that can be written to like a Writable stream: just
  // pipe the bytes from request (acts as Readable) to wherever we want to put them.
  req.pipe(out);
});

app.post('/buffered', function(req, res) {

  console.log('Incoming buffered...');
  var fileId = IMAGE_DIR + '/' + uuid.v4() + '.png';

  // This is important: bytes come in chunks, so if we want them in a single buffer we need
  // to collect the chunks and concatenate them later. Luckily Node has some handy tool for this
  var chunks = [];
  req.on('data', function(chunk) {
    console.log('chunk');
    chunks.push(chunk);
  });

  // See http://nodejs.org/api/stream.html for documentation on stream-related events. Request
  // acts as a ReadableStream so 'data' and 'end' events are available.
  req.on('end', function() {
    console.log('Upload complete');
    var data = Buffer.concat(chunks);
    fs.writeFile(fileId, data, function(err) {
      if (err) return res.status(500).json({err: err});
      console.log('File written');
      res.status(201).json({msg: 'created'});
    })
  });
});

// Start server, create output dir if necessary.
function startApp(app, port) {
  app.listen(port, function() {
    console.log('Listening on port 3000');
  });  
}

function chkDir(dir, callback) {
  fs.exists(dir, function(exists) {
    return !exists ? fs.mkdir(IMAGE_DIR, callback) : callback();
  });
}

chkDir(IMAGE_DIR, function(err) {
  if (err) throw err;
  startApp(app, 3000);
});
