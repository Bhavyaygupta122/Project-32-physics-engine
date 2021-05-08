const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var ball1;
var monster1,monster2,monster3,monster4,monster5,monster6,monster7,monster8;
var world;
var rope1,rope2,rope3,rope4,rope5,rope6;
var bg1 = "bg1.png";
var backgroundImg;
var score=0;
var gameState = "onSling";
var ground;
var gameState="PLAY";
var gameState="END";
var gameState="OVER";


function preload(){
  getBackgroundImg();
}

function setup() {
  createCanvas(900,500);

  engine = Engine.create();
	world = engine.world;

  ground = new Ground(200,500,1800,20)
  ball1 = new ball(10,300,20);

  slingshot = new Slingshot(ball1.body,{x:75,y:300});

  monster1 = new Banana(750,100,25);

  monster2 = new Banana(450,150,25);
  monster3 = new Banana(350,50,25);
  monster4 = new Banana(800,350,25);
  monster5 = new Banana(600,350,25);
  monster6 = new Banana(325,415,25);

  Engine.run(engine);

}

function draw() {
  if(backgroundImg)
        background(backgroundImg);
    else 
      background("bg.png");


  drawSprites();
  noStroke();
  textSize(35)
  fill("blue")
  text("Score  " + score, this.r-100, 50)

  textSize(20);
  fill("blue");
  text("Kill the monsters with the ball",100,30);
  text("Press Space for play again!",100,50);
  Engine.update(engine)
   //console.log(mouseX);
   //console.log(mouseY);

  ball1.display();
  slingshot.display();
  monster1.display();
  monster2.display();
  monster3.display();
  monster4.display();
  monster5.display();
  monster6.display();
  ground.display();
  
  detectCollision(ball1,monster1);
  detectCollision(ball1,monster2);
  detectCollision(ball1,monster3);
  detectCollision(ball1,monster4);
  detectCollision(ball1,monster5);
  detectCollision(ball1,monster6);

}

function mouseReleased(){
  slingshot.fly();
  gameState="launched";
}

function mouseDragged(){
  if(gameState==="onSling"){
     Matter.Body.setPosition(ball1.body,{x:mouseX,y:mouseY});
  }
}

function keyPressed() {
  if (keyCode === 32) {
        Matter.Body.setPosition(ball1.body, {x:75, y:300}) 
        slingshot.attach(ball1.body);
        gameState="onSling";
    }
}


async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
      bg = "bg1.png";
      console.log("hi");
  }
  else{
      bg = "bg2.jpg";
      console.log("bye");

  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}

function detectCollision(object1,object2){
  var object1Pos = object1.body.position;
  var object2Pos = object2.body.position;

  var distance= dist(object1Pos.x,object1Pos.y,object2Pos.x,object2Pos.y)
  if(distance<= object1.r + object2.r){
     Matter.Body.setStatic(object2.body,false);
  }
}
