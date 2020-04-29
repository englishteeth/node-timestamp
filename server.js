// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoint... 
app.get("/api/timestamp/:date_string?", (req, res) => {
  const { date_string: ds} = req.params;
  if (ds != undefined) {
    let timestamp = Date.parse(ds);
    if (isNaN(timestamp)) {
      res.json({"error" : "Invalid Date" });
    } else {
      res.json(timeObj(new Date(timestamp)));
    }
  } else {
    res.json(timeObj(new Date()));
  }
});

const timeObj = ( date ) => {
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});