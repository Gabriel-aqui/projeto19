var universeImg, universe;
var holeImg, hole, holeGroup;
var stoneImg, stoneImg, stoneGroup;
var ship, shipImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var leftThing, rightThing

function preload() {
  universeImg = loadImage("universe.png");
  holeImg = loadImage("hole.png");
  stoneImg = loadImage("stone.png");
  shipImg = loadImage("ship-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  universe = createSprite(300, 300);
  universe.addImage("universe.png", universeImg);
  universe.velocityY = 1;
  ship = createSprite(300, 500)
  ship.addImage("ship-standing.png", shipImg)
  ship.scale = 0.5
  leftThing = createSprite(30, 300, 60, 600)
  rightThing = createSprite(570, 300, 60, 600)
  leftThing.visible = false
  rightThing.visible = false
  stoneGroup = new Group()
}

function draw() {
  background(200);
  drawSprites()
  //deixando o jogo infinito
  if (universe.y > 400) {
    universe.y = 300
  }
  if (keyDown("space")) {
    ship.velocityY = -7
  }
  //nave que pula? achei que ia ficar legal.
  ship.velocityY = ship.velocityY + 0.8
  ship.x = mouseX
  ship.collide(leftThing)
  ship.collide(rightThing)
  holeSpawn()
  //spaggetificando a nave
  if (ship.isTouching(stoneGroup) || ship.y > 600) {
    ship.destroy()
    textAlign(CENTER)
    text("Fantasma Morreu", 300, 300)
  }
  ship.scale = 0.07
  drawSprites()
}
//spawnando aberrações cosmicas
function holeSpawn() {
  if (frameCount % 340 === 0) {
    hole = createSprite(300, -60)
    stone = createSprite(300, -20)
    hole.addImage(holeImg)
    stone.addImage(stoneImg)
    stone.velocityY = 1.7
    hole.velocityY = 1.7
    hole.x = Math.round(random(100, 500))
    stone.x = hole.x
    hole.lifetime = 1000
    stone.lifetime = 1000
    stoneGroup.add(stone)
    stone.scale = 0.09
    hole.scale = 0.1
  }
}