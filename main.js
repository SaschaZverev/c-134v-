var img = "";
var s = "";
objects = [];
r = 0;
g = 0;
b = 0;

function setup()
{
    canvas = createCanvas(380, 380);
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("s").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
        if(s != "")
        {
          r =  random(255);
          g =  random(255);
          b =  random(255);      
          objectDetector.detect(video, gotResult);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("s").innerHTML = "Status : Object Detected";
            document.getElementById("no").innerHTML = "Number of objects detected are : "+ objects.length;
   
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
        }
}

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function modelLoaded()
{
    console.log("Model Loaded!");
    s = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

