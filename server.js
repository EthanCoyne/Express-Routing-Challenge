var express = require('express');  // first 2 are node modules
var path = require('path');
var bodyParser = require('body-parser'); //

var songs = require('./songs'); //we made this, so you have to link it with a relative file path


var app = express(); // sets express methods to the "app" variable.

app.use(express.static('public')); // lets the server link to anything in the 'public' folder.

app.use(bodyParser.urlencoded({extended: true})); // avoids unnecessary console warning. Use this when using bodyParser.
// converts any url encoded body into a JS object added to req.body

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html')); // linking index.html to the main page
});

app.get('/songs', function(req, res) { //grabbing the songs array from the server
  res.send(songs);
});

app.post('/songs', function(req, res) { // update songs array on the server.
  // console.log('req.body', req.body);
  //2 variables below are created and set to false on submit, will be set to true below if duplicates or blanks are present.
  var duplicate = false;
  var blank = false;

  songs.forEach(function(song) {
    // console.log(req.body.title, song.title);
    // checking for duplicate entries.
    if (req.body.title === song.title && req.body.artist === song.artist && req.body.album === song.album) {
      duplicate = true;
    }
    //checking for blank entries.
    if (req.body.title == "" || req.body.artist == "" || req.body.album == "") {
      blank = true;
    }
  });
  if (duplicate == true || blank == true) {
    res.sendStatus(400); // error msg if duplicates or blanks are present.
  } else {// add the dateAdded key to new objects
    req.body.dateAdded = Date('datestring');
    songs.push(req.body); // push new song object to songs array
    res.sendStatus(200); // success msg.
  }
});

app.listen(3000); // server set up on "localhost:3000"
