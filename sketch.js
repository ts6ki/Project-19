var play = 1;
var end = 2; 
var gameState = play;

var gameOver;
var score=0;

var backImage,backgr;
var monkey, player_running;
var ground,ground_img;

var banana, obstacle;

var bananaGroup, bananaImage;
var obstacleGroup, obstacle_img;



function preload(){
  backImage=loadImage("jungle2.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}



function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
 
}

function draw() {
  
  background(255);
  
  if (ground.x < 200)
  {
    ground.x = ground.width/2;
  }
  
  if (backgr.x < 100)
  {
    backgr.x = backgr.width/2;
  }
  
    if(gameState === play)
  {

    ground.velocityX = -(6 + 3*score/100);

    score = score + (Math.ceil(getFrameRate()/10));
    
  
  if(keyDown("space") && monkey.y >= 300){
      monkey.velocityY = -15 ;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
      
    spawnObstacles();
    spawnBananas();
    
    if(obstaclesGroup.isTouching(monkey))
    {
      monkey.scale = 0.08
      gameState = end;
    }
    
    if(bananaGroup.isTouching(monkey))
    {
      score = score + 10;
      monkey.scale = monkey.scale + 0.001
      bananaGroup.setVisibleEach(false); 
    }
  }
  
  else if(gameState === end) 
  {
    score = 0;
    
    backgr.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
  fill(255);
  text("Survival Time: "+ score, 525, 50);
  


}

function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    obstacle = createSprite(850,325,10,40);
    obstacle.velocityX = - (6 + 3*score/100);

    obstacle.addImage(obstacle_img);
    
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;

    obstaclesGroup.add(obstacle);
    console.log(obstaclesGroup);
  }
}

function spawnBananas() {

  if (World.frameCount % 70 === 0) {
    banana = createSprite(850,200,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = - (6 + 3* score/100);
    

    banana.lifetime = 134;

    bananaGroup.add(banana);
  }
  
}


