var PLAY = 1;
var END = 0;
var gameState = PLAY;


var girl, girlRunning, girlCollided;
var ground, invisibleGround, groundImage;
var butterfliesGroup, obstaclesGroup, cloudsGroup;
var score;
var gameOverImg, restartImg;




function preload() {
  girlRunning = loadAnimation("girl_running.png", "girlRunning.png");
  girlCollided = loadAnimation("girlDead.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  butterflyImage = loadImage("butterfly.png");
  butterfly2Image = loadImage("butterfly2.png");
  butterfly3Image = loadImage("butterfly3.png");
  butterfly4Image = loadImage("butterfly4.png");
  butterfly5Image = loadImage("butterfly5.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  obstacle5Img = loadImage("obstacle5.png");
  obstacle6Img = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");



}

function setup() {
  createCanvas(600, 200);
  girl = createSprite(50,160,20,50);
  girl.addAnimation("running", girlRunning);
  girl.addAnimation("collided", girlCollided)
  girl.scale = 0.5;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  invisibleGround = createSprite(200,900,400,20);
  invisibleGround.visible = false;
  console.log("Hello" + 5);
  
  cloudsGroup = createGroup();
  butterfliesGroup = createGroup();
  obstaclesGroup = createGroup();
  girl.setCollider("circle", 0, 0, 40);
  girl.debug = true;
  score = 0;
}

function draw() {
  background("white");
  text("Score = "+ score,500,60);
  console.log("This is", gameState)
  if(gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    if(ground.x < 0) {
      ground.x = ground.width / 2
    }
  if(keyDown("space") && girl.y >= 150) {
    girl.velocityY =-10;
  }

  girl.velocityY = girl.velocityY + 0.8;

  
  girl.collide(ground);
  spawnClouds();
  spawnButterflies();
  spawnObstacles();
  

  if(butterfliesGroup.isTouching(girl)) {
    butterfliesGroup.destroyEach();
    
  }
  
  if(obstaclesGroup.isTouching(girl)){
    gameState = END;

  }
  } else if(gameState === END) {
    ground.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.setVelocityEach(0);
    cloudsGroup.setVelocityEach(0);
    butterfliesGroup.setVelocityEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    butterfliesGroup.setLifetimeEach(-1);
    girl.changeAnimation("collided");

  }

  girl.collide(invisibleGround);
  
  
  drawSprites();

   
}

function spawnClouds(){
  if (frameCount%60 === 0){
    Cloud = createSprite(600,100,40,10);
    Cloud.velocityX = -3;
    Cloud.addImage(cloudImage);
    Cloud.scale = 0.6;
    Cloud.y = Math.round(random(10,120));
    Cloud.lifeTime = 134;
    Cloud.depth = girl.depth;
    girl.depth = girl.depth+1;
    cloudsGroup.add(Cloud);
    
    
  }
}

function spawnButterflies(){
  if(frameCount%80 == 0) {
    var butterfly = createSprite(600,165,10,40);
    butterfly.velocityX = -6;
    var rand = Math.round(random(1,5));
    switch(rand){
      case 1:butterfly.addImage(butterflyImage);
      break;
      case 2:butterfly.addImage(butterfly2Image);
      break;
      case 3:butterfly.addImage(butterfly3Image);
      break;
      case 4:butterfly.addImage(butterfly4Image);
      break;
      case 5:butterfly.addImage(butterfly5Image);
      default:break;
    }
    butterfly.scale = 0.3;
    butterfly.lifeTime = 300;
    butterfliesGroup.add(butterfly);
    
  }
}

function spawnObstacles(){
  if (frameCount%60 === 0) {
    var obstacle = createSprite(690,165,10,40);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1Img);
      break;
      case 2:obstacle.addImage(obstacle2Img);
      break;
      case 3:obstacle.addImage(obstacle3Img);
      break;
      case 4:obstacle.addImage(obstacle4Img);
      break;
      case 5:obstacle.addImage(obstacle5Img);
      break;
      case 6:obstacle.addImage(obstacle6Img);
      break;
      default:break;
    }
    obstacle.scale = 0.5;
    obstacle.lifeTime = 300;
    obstaclesGroup.add(obstacle);
  }
}



