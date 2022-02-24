const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


let engine;
let world;

var cannon;

var angle = 270;

var score = 0;

var projectileArray = [];
var shotsArray = [];


function preload(){
  cannon = loadImage("canon.png");
}

function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
}

function draw() {
  background(rgb(100,240,140));

  text(score,20,20);

  Engine.update(engine);

  for(var i = 0; i<projectileArray.length; i++){
    for(var v = 0; v<shotsArray.length; v++){
      if(projectileArray[i]!==undefined && shotsArray[v]!==undefined){
        var c = Matter.SAT.collides(projectileArray[i].body,shotsArray[v].body);
        if(c.collided){
          projectileArray[i].remove();
          delete projectileArray[i];
          score+=10;
        }
      }
    }
  }

  for(var i = 0; i<projectileArray.length; i++){
    if(projectileArray[i]!==undefined){
      if(projectileArray[i].body.position.x<50 || projectileArray[i].body.position.y>600){
        projectileArray[i].remove();
          delete projectileArray[i];
          score-=5;
      }
    }
  }

  if(keyDown(40)){
    angle++;
  }

  if(keyDown(38)){
    angle--;
  }

  if(keyDown(32) && frameCount%10 === 0){
    shots();
  }

  if(frameCount%5 === 0){
    projectile();
  }

  fill("black");
  rect(10,570,60,50);
  image(cannon,0,525,100,100);

  for(var i = 0; i<projectileArray.length; i++){
    if(projectileArray[i]!==undefined){
      projectileArray[i].display();
    }
  }

  for(var i = 0; i<shotsArray.length; i++){
    if(shotsArray[i]!==undefined){
      shotsArray[i].display();
    }
  }
}

function projectile(){
  var p = new Box(1230,550);
  p.shoot();
  projectileArray.push(p);
}

function shots(){
  var s = new Shot(60,550);
  s.shoot(angle);
  shotsArray.push(s);
}
