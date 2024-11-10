// index.js
// where your node app starts

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//timestamp without date parmater
app.get('/api/', function (req, res) {
  const date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

//Timestamp API with date parmeter provided
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  //handle unix timestamp
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam, 10));
  }

  //handlet utc timestamp
  else {
    date = new Date(dateParam);
  }

  //check for invalid date

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  //return formatted response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// app.get("/api/:date_string", function(req, res) {
//   const dateString = req.params.date_string;
//   let date;
  
//   // Try to create date object
//   if (/^\d+$/.test(dateString)) {
//       date = new Date(parseInt(dateString));
//   } else {
//       date = new Date(dateString);
//   }

//   // Check if date is invalid
//   if (date.toString() === 'Invalid Date') {
//       // Send error response and stop function
//       return res.json({ error: "Invalid Date" });
//   }

//   // If we get here, date is valid
//   res.json({
//       unix: date.getTime(),
//       utc: date.toUTCString()
//   });
// });


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
