const path = require('path')
const express = require('express')
const can = require('rawcan');
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const motorsId = 456;

var socket = can.createSocket('can0');
var canlog = {};
var candumps = []
canlog.candump = candumps;



  app.use('/', express.static(__dirname + '/'));

  app.post('/form', function (req, res) {
    console.log("recieved form");
    var cansignal = req.body.cansignal;
    var parsedCan = cansignal.split('#');

    socket.send(parseInt(parsedCan[0], 16), parsedCan[1].substring(0, 8));
    console.log(parseInt(parsedCan[0], 16) + "#" + parsedCan[1].substring(0, 8));
  });

  socket.on('message', (id, buffer) => {
    var tempstring = 'received frame [' + id.toString(16) + '] ' + buffer.toString('hex');
    console.log(tempstring);
    var dump = {
      "id" : id.toString(16),
      "frame" : buffer.toString('hex')
    }
    canlog.candump.unshift(dump);
  });

  app.post('/dump', function (req, res) {
    console.log("dumped");
    res.send("candumps : " + candumps);
  });

  app.post('/stop', function (req, res) {
    console.log("stopped");
    socket.send(parseInt(motorsId, 16), "00000000");
    res.send("status : success");
  });

  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`)
  });
