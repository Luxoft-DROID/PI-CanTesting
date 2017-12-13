const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const motorsId = 456;

var canlog = {}
var candumps = []
  canlog.candump = candumps;

  function moveCode(direction) { 
   if (direction == "up")
	return "VICTORYGY";
} 

  app.use('/', express.static(__dirname + '/'));

  app.post('/form', function (req, res) {
    console.log("recieved form");
    var cansignal = req.body.cansignal;
	if (cansignal == null)
		cansignal = moveCode(req.body.cancommand);
    var parsedCan = cansignal.split('#');

    console.log(parseInt(parsedCan[0], 16) + "#" + parsedCan[1].substring(0, 8));
  });

 

  app.post('/dump', function (req, res) {
    console.log(canlog);
    res.send(canlog);
	canlog = {};
  });

  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`)
  });
