GameState=1;
var bg,bgImg,gameover;
var player, bow, arrow, shooterImg, shooter_shooting;
var alien,alienImg;
var alienGroup;
var invisibleGround;
var arrowGroup;

function preload(){
  
  shooterImg = loadImage("assets/soldado.png")
  alienImg=loadImage("assets/alien.png")
  bgImg = loadImage("assets/space.png")
  gameover=loadImage("assets/gameOver.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-400, 50, 50);
console.log("player",player.x)
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,500)



  invisibleGround = createSprite(displayWidth-1150,displayHeight-300,4000,10);
  invisibleGround.visible = false;


   alienGroup=new Group();
   arrowGroup=new Group(); 

}

function draw() {
  background(0); 

//GameState

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if (keyDown("space")) {
  createArrow();
  
}


//alien.velocityX=-2
  //alien.velovityY=-2
   aliens();
  
//alien.y=player.y 

player.collide(invisibleGround);

drawSprites();

}

function aliens(){
if(frameCount%120===0){
alien=createSprite(1190,displayHeight/2);
    
   alien.x=Math.round(random(1000,1500))
   console.log(alien.x);
   alien.addImage(alienImg);
   alien.scale=0.2
   alienGroup.debug = true
   alienGroup.setCollider("rectangle",0,0,300,500)
   alien.velocityX=-2
   alienGroup.add(alien)
   //alienGroup.setLifetimeEach(120);
   
}

if (arrowGroup.isTouching(alien)){
  alien.destroy();  
  arrowGroup.destroyEach();  
  //score=score+1;  
  }

  if (alienGroup.isTouching(player)){
    alienGroup.velocityX=0;
  gameover.addImage=("assets/gameOver.png");
  player.visible=false;
  }
}


function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  //arrow.addImage(arrowImage);
  arrow.x = 870;
  arrow.y=player.y;
  arrow.velocityX = 4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrow.shapeColor=("yellow")
  arrowGroup.add(arrow);
}