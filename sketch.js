var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position1;


function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var position = database.ref('Balloon/position');
  position.on("value", readPos, showError)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(-10, 0);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(+10, 0);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(0, 10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale + 0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updatePos(x, y){
  database.ref('Balloon/position').set({
     'x' : position1.x + x,
     'y' : position1.y + y
  })
}
function readPos(data){
  position1 = data.val();
  balloon.x = position1.x;
  balloon.y = position1.y;
}
function showError(){
  console.log("Error in code");
}