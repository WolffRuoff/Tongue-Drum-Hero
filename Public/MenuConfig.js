// -----JS CODE-----

// @input Component.ScriptComponent SongCarousel
// @input Component.ScriptComponent DiffCarousel
// @input Component.ScriptComponent ColorChange

var event = script.createEvent("UpdateEvent");
event.enabled = false;

var song = -1;
var difficulty = -1;
script.api.setIndex = function (index) {
  //print("Current index set to " + index);
  // First time song was selected
  if (song == -1 && difficulty == -1) {
    song = index;
    difficulty = -1
    event.bind(LaunchDiffCarousel);
    event.enabled = true;
  }
  // Difficulty was selected
  else if (song != -1 && difficulty == -1) {
    difficulty = index;
    event.bind(StartSong);
    event.enabled = true;
  }
    
  else if (song == -1 && difficulty != -1) {
    song = -1;
    event.bind(SelectSong);
    event.enabled = true;
  }
  
  else {
        song = index;
        difficulty = -1;
        event.bind(ReLaunchDiffCarousel);
        event.enabled = true;
  }
}
//script.DiffCarousel.api.Init();
function LaunchDiffCarousel(){
    event.enabled = false;
    script.DiffCarousel.api.Init(song);
}

function StartSong(){
    event.enabled = false;
    var temp_song = song
    song = -1
    script.ColorChange.api.setIndex(temp_song, difficulty);
}

function SelectSong(){
    song = 1
    event.enabled = false;
    script.SongCarousel.api.Reshow();
}

function ReLaunchDiffCarousel(){
    event.enabled = false;
    script.DiffCarousel.api.Reshow();
}