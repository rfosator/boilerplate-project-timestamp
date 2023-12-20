// index.js
// where your node app starts
require('dotenv').config();

// init project
var express = require('express');
var app = express();

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

app.get("/api", function(req, res) {
  var now = Date.now();
  res.json({unix: now, utc: new Date(now).toUTCString()});
});

app.get("/api/:date", function(req, res) {
  try {
    var timestamp = Date.parse(req.params.date);
    let date = timestamp ? new Date(timestamp) : 
      new Date(parseInt(req.params.date));
    
    if (date == "Invalid Date")
      throw new Error("Invalid Date");
    
    res.json({utc: date.toUTCString(), unix: date.getTime()});
  } catch(error) {
    res.json({error: error.message});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
