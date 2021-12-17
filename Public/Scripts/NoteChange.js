// -----JS CODE-----


// @input Component.ScriptComponent ColorChange
// @input int framerate
// If spectacles, then make the framerate 60, otherwise make 30

function TurnRed(x){
    var red = (2*x <= 1 ? 2*x : 1);
    var green = (2*(1-x) <= 1 ? 2*(1-x) : 1);
    for(var i = 0; i < script.ColorChange.api.note.length; i++){
        script.ColorChange.api.note[i].mainPass.baseColor = new vec4(red, green, 0.0, 1.0);
    }
    x += increment;
    //print(script.ColorChange.api.note.mainPass.baseColor);
    return x;
}

function ChangeColor(){
    if(colorChanger < 1.005){
        colorChanger = TurnRed(colorChanger);
    }
    else {
        for(var i = 0; i < script.ColorChange.api.note.length; i++){
            script.ColorChange.api.note[i].mainPass.baseColor = new vec4(0.0, 1.0, 0.0, 0.0);
        }        
        event.enabled = false;
        colorChanger = 0.0;
        script.ColorChange.api.Init()
    }
}

var increment;
var colorChanger = 0.0;
var event = script.createEvent("UpdateEvent")

function GetBPM() {
    return 240 / script.ColorChange.api.bpm;
}

script.api.Init = function(){
    if(script.ColorChange && script.ColorChange.api.note){
        increment = 1 / (script.ColorChange.api.beat * (script.framerate * GetBPM() * script.ColorChange.api.difficulty))
        // Make all notes being played visible and green
        for(var i = 0; i < script.ColorChange.api.note.length; i++){
            script.ColorChange.api.note[i].mainPass.baseColor = new vec4(0.0, 1.0, 0.0, 1.0);
        }
        event.bind(ChangeColor);
        event.enabled = true;
    }
}

//ChangeColor()