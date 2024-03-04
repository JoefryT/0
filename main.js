input = "";
video = "";
objects = [];
status = "";
function preload(){
    video = createCapture(VIDEO);
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video, 0 , 0 , 480, 380); 
    if(status !="")
    {
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = input + " found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(e +  "mentioned found");
                synth.speak(utterThis)
            }
            else{
                document.getElementById("object_status").innerHTML = input + "not found"
            }  
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("e").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}