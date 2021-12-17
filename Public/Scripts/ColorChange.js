// -----JS CODE-----

// @input Component.ScriptComponent carousel
// @input Component.Text countdown
// @input Component.MeshVisual note5dot
// @input Component.MeshVisual note6dot
// @input Component.MeshVisual note7dot
// @input Component.MeshVisual note1
// @input Component.MeshVisual note2
// @input Component.MeshVisual note3
// @input Component.MeshVisual note4
// @input Component.MeshVisual note5
// @input Component.MeshVisual note6
// @input Component.MeshVisual note7
// @input Component.MeshVisual note1dot
// @input Component.ScriptComponent notecontrol

var song;
// How to create a song:
// Create an array of arrays with each array following the following format
// [<note1>, <note2>, <note_n>, length]
// All notes in the inner array will be played at the same time
// A length of 1 equals 4 seconds or a whole note assuming the time signature is 4/4
// While non-traditional, this makes a quarter note .25 which is easier to read
var scale = [
    120,
  [0.5, 1],
  [0.6, 1],
  [0.7, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [0.1, 1]];
var happy_birthday = [
    120,
  [0.5, 0.125],
  [0.5, 0.125],
  [0.6, 0.25],
  [0.5, 0.25],
  [1, 0.5],
  [0.7, 0.25],

  [0.5, 0.125],
  [0.5, 0.125],
  [0.6, 0.25],
  [0.5, 0.25],
  [2, 0.5],
  [1, 0.25],

  [0.5, 0.125],
  [0.5, 0.125],
  [5, 0.25],
  [3, 0.25],
  [1, 0.25],
  [0.7, 0.25],
  [0.6, 0.25],

  [4, 0.125],
  [4, 0.125],
  [3, 0.25],
  [1, 0.25],
  [2, 0.25],
  [0.7, 1],
];
var twinkle_tinkle = [
    120,
  [1, .25],
  [1, .25],
  [5, .25],
  [5, .25],
  [6, .25],
  [6, .25],
  [5, .5],

  [4, .25],
  [4, .25],
  [3, .25],
  [3, .25],
  [2, .25],
  [2, .25],
  [1, .25],

  [5, .25],
  [5, .25],
  [4, .25],
  [4, .25],
  [3, .25],
  [3, .25],
  [2, .5],

  [5, .25],
  [5, .25],
  [4, .25],
  [4, .25],
  [3, .25],
  [3, .25],
  [2, .5],

  [1, .25],
  [1, .25],
  [5, .25],
  [5, .25],
  [6, .25],
  [6, .25],
  [5, .5],

  [4, .25],
  [4, .25],
  [3, .25],
  [3, .25],
  [2, .25],
  [2, .25],
  [1, .5],
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
    script.note5dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note6dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note7dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note1.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note2.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note3.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note4.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note5.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note6.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note7.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note1dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
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
    script.note5dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note6dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note7dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note1.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note2.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note3.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note4.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note5.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note6.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note7.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
    script.note1dot.mainPass.baseColor = new vec4(0.0, 1.0, 0.0, start_tran);
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
      if (song[i][j] == 1) {
        script.api.note.push(script.note1);
      } else if (song[i][j] == 2) {
        script.api.note.push(script.note2);
      } else if (song[i][j] == 3) {
        script.api.note.push(script.note3);
      } else if (song[i][j] == 4) {
        script.api.note.push(script.note4);
      } else if (song[i][j] == 5) {
        script.api.note.push(script.note5);
      } else if (song[i][j] == 6) {
        script.api.note.push(script.note6);
      } else if (song[i][j] == 7) {
        script.api.note.push(script.note7);
      } else if (song[i][j] == 0.5) {
        script.api.note.push(script.note5dot);
      } else if (song[i][j] == 0.6) {
        script.api.note.push(script.note6dot);
      } else if (song[i][j] == 0.7) {
        script.api.note.push(script.note7dot);
      } else if (song[i][j] == 0.1) {
        script.api.note.push(script.note1dot);
      }
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
