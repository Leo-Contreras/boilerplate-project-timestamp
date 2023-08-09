// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment'); // Asegúrate de instalar moment con npm install moment


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/favicon.ico', express.static('public/favicon.ico'));

app.use(express.static('public'));

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  var inputDate = req.params.date;
  var unixTime, utcTime;

  // Si la entrada es un número, trátala como un timestamp UNIX
  if (!isNaN(inputDate)) {
    unixTime = parseInt(inputDate);
  } else {
    // Si no, trátala como una fecha en formato de cadena
    unixTime = new Date(inputDate).getTime();
  }

  // Convertir el timestamp UNIX a formato UTC
  utcTime = new Date(unixTime).toUTCString();

  res.json({unix: unixTime, utc: utcTime});
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
