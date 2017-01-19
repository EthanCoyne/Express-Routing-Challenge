$(function() {
  console.log('document loaded');

getSongs();

  $('#addSong').on('submit', addSong); // runs addSong function on submit.


});

function getSongs () { // appends existing songs to the DOM on page load.
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });
}

function addSong(event) {
  // stop the browser from trying to navigate away from our page.
  event.preventDefault();


  // this turns the submitted song data into an object
  var songData = $(this).serialize()
  $(this).closest('form').find("input[type=text], textarea").val(""); // clears form fields
  // console.log(songData);

  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    success: getSongs,
    error: errorMsg
  });
}

// append the songs array to the DOM.
function displaySongs(songs) {
  // console.log(songs);

  $('#songs').empty(); // clear the DOM

  songs.forEach(function(song) { // adds newly updated songs array to the DOM.
      $('#songs').append('<li>' + song.title +  ' by ' + song.artist + ' from ' + song.album + '. Added on: ' + song.dateAdded + '</li>');
  });
}

function errorMsg() {
  alert("Whoops! \n" + "Looks like you're trying to add a song that exists already \n" + "\n" + "Or \n" + "\n" + "You left an form field blank. \n" + "Try again!");
}
