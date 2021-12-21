// -----JS CODE-----

// @input Component.ScriptComponent carousel
// @input Component.Text countdown
// @input SceneObject notes
// @input Component.ScriptComponent notecontrol

//Make sure you order your notes in Notes from lowest (top) to highest (bottom)
var notes = [];
print(script.notes.getChildrenCount())
for(var i = 0; i < script.notes.getChildrenCount(); i++) {
    var note = script.notes.getChild(i)
    if(note.name != "Occluder") {
        notes[i] = script.notes.getChild(i).getComponent("Component.BaseMeshVisual")
    }
}
print(notes[0])
var song;
// How to create a song:
// Create an array of arrays with each array following the following format
// [<note1>, <note2>, <note_n>, length]
// All notes in the inner array will be played at the same time
// A length of 1 equals 4 seconds or a whole note assuming the time signature is 4/4
// While non-traditional, this makes a quarter note .25 which is easier to read
var scale = [
    120,
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [8, 1],
  [9, 1],
  [10, 1]];
var happy_birthday = [
    120,
  [0, 0.125],
  [0, 0.125],
  [1, 0.25],
  [0, 0.25],
  [3, 0.5],
  [2, 0.25],

  [0, 0.125],
  [0, 0.125],
  [1, 0.25],
  [0, 0.25],
  [4, 0.5],
  [3, 0.25],

  [0, 0.125],
  [0, 0.125],
  [7, 0.25],
  [5, 0.25],
  [3, 0.25],
  [2, 0.25],
  [1, 0.25],

  [6, 0.125],
  [6, 0.125],
  [5, 0.25],
  [3, 0.25],
  [4, 0.25],
  [3, 1],
];
var twinkle_tinkle = [
    120,
  [3, .25],
  [3, .25],
  [7, .25],
  [7, .25],
  [8, .25],
  [8, .25],
  [7, .5],

  [6, .25],
  [6, .25],
  [5, .25],
  [5, .25],
  [4, .25],
  [4, .25],
  [3, .25],

  [7, .25],
  [7, .25],
  [6, .25],
  [6, .25],
  [5, .25],
  [5, .25],
  [4, .5],

  [7, .25],
  [7, .25],
  [6, .25],
  [6, .25],
  [5, .25],
  [5, .25],
  [4, .5],

  [3, .25],
  [3, .25],
  [7, .25],
  [7, .25],
  [8, .25],
  [8, .25],
  [7, .5],

  [6, .25],
  [6, .25],
  [5, .25],
  [5, .25],
  [4, .25],
  [4, .25],
  [3, .5],
];

var i = 0;

// This function fades the notes out before the song starts
var start_tran = 1.0;
function FadeOut() {
  //Control the countdown
  script.countdown.text =
    start_tran >= 0.6666666666 ? "3" : start_tran >= 0.3333333333 ? "2" : "1";

  if (start_tran > 0.0) {
    start_tran -= 0.005;
    for(var i = 0; i < notes.length; i++){
        notes[i].mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    }
  } else {
    event.enabled = false;
    script.countdown.text = "";
    i = 0;
    script.api.Init();
  }
}

function FadeIn() {
  //Control the countdown
  if (start_tran < 1.0) {
    start_tran += 0.05;
    for(var i = 0; i < notes.length; i++){
        notes[i].mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    }
  } else {
    event.enabled = false;
    script.carousel.api.setIndex();
  }
}

var event = script.createEvent("UpdateEvent");
script.api.setIndex = function (song_select, difficulty) {
  print("Current index set to " + song_select);
  start_tran = 1.0;
  song = song_select == 0 ? scale : song_select == 1 ? happy_birthday : twinkle_tinkle;
  // 0 Difficulty is practice mode which should double (2) the length of notes
  script.api.difficulty = difficulty == 0 ? 2 : 1
  event.bind(FadeOut);
  event.enabled = true;
};

script.api.Init = function () {
  script.api.note = [];
  if (i==0){
    script.api.bpm = song[i];
    i += 1;
  }
    
  if (i < song.length) {
    for (var j = 0; j < song[i].length - 1; j++) {
      script.api.note.push(notes[song[i][j]]);
    }
    script.api.beat = song[i][song[i].length - 1];
    i += 1;
    script.notecontrol.api.Init();
  } else {
    // Relaunch the UI
    start_tran = 0.0;
    event.bind(FadeIn);
    event.enabled = true;
  }
};
