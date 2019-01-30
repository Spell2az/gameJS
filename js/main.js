const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const MAX_NUMBER_OF_ASTEROIDS = 10;
const MISSLE_LIFETIME_MAX = 100;
const ASTEROID_EXCLUSION_RADIUS = 250;
const PLAYER_COLLISION_DAMAGE_POINTS = 20;
let score = 0;
//---------------------------------Images
const asteroidImg = new Image(90, 90);
asteroidImg.src = "../img/asteroid_blue.png";

const missleImg = new Image(50, 50);
missleImg.src = "../img/missle.png";

const explosionSprite = new Image(128, 128)
explosionSprite.src = "../img/explosion.png";

const blueExplosionSprite = new Image (128, 128);
blueExplosionSprite.src = "../img/blueExplosion.png";

//---------------------------------Pleyer stats
const scoreDisplay = document.getElementById("score")
const healthDisplay = document.getElementById("health")


let gameOn = false;


//const explosion = new AnimatedSprite(explosionSprite, 128, 128, 16, 15, 128, 16);
//explosion.draw(ctx);
 const player = new Player({
   x: WIDTH / 2,
   y: HEIGHT / 2
 });
 const asteroids = [];
 let missles = [];
 const explosions = []

function main(){

  const canvas = document.getElementById('canvas');
  
  const ctx = canvas.getContext('2d');
  
  const makeAsteroids = () => {
    while(asteroids.length < MAX_NUMBER_OF_ASTEROIDS){
      const positionY = getRandomInt(0, HEIGHT);
      const positionX = getRandomInt(0, WIDTH);
      const distance = getDistanceBetweenTwoPoints([player.position.x, player.position.y],
        [positionX, positionY])
      if (distance > ASTEROID_EXCLUSION_RADIUS) {
          const velocityX = getRandom(- 0.5, 0.5);
          const velocityY = getRandom(- 0.5, 0.5);
          const angle = Math.PI * getRandom(0, 2);
          const angleVelocity = getRandom(-0.1, 0.1);
          const radius = getRandomInt(25, 75);
          asteroids.push(new Asteroid({
            x: positionX,
            y: positionY
          }, angle, {
            x: velocityX,
            y: velocityY
          }, angleVelocity, radius, asteroidImg))
        }
     
    }
  }
if(gameOn){
 drawFrame();
}
 

  function drawFrame() {

  
    makeAsteroids();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    ctx.fillStyle = "red";
    
    asteroids.forEach(asteroid => asteroid.draw(ctx))
    missles.forEach((missle, i) => {
      if(!missle.collided && missle.lifeTime > MISSLE_LIFETIME_MAX){
        missles.splice(i ,1);
      }
    })
    missles.forEach(missle => missle.draw(ctx))
    groupCollide(asteroids, player, explosions)

    score += twoGroupCollide(missles, asteroids, explosions)
    scoreDisplay.textContent = `SCORE: ${score}`;
    healthDisplay.style.width = `${player.health}%`;
    if (gameOn) {
       window.requestAnimationFrame(drawFrame);
    }
    explosions.forEach((explosion, i)=> {
      explosion.draw(ctx);
      if(explosion.finished){
        explosions.splice(i, 1);
      }
    });
      //ctx.drawImage(explosionSprite, 512, 0, 128, 128, -64, -64, 128, 128);
  } 

}

window.addEventListener("keydown", keyDownEventHandler);
window.addEventListener("keyup", keyUpEventHandler);

function keyDownEventHandler(e) {

  if (e.keyCode == 87) {
    player.setThrust(true);
  } else if (e.keyCode == 65) {
    player.decreaseAngleVelocity();
  } else if (e.keyCode == 68) {
    player.increaseAngleVelocity();
  } else if (e.code == "Space") {
    missles.push(new Missle({ ...player.position
    }, player.angle, { ...player.velocity
    }, 10, missleImg))
  } else if (e.keyCode == "13") {
    console.log(gameOn);
    gameOn = true
   main()
  }
  else if(e.keyCode == "27"){
    gameOn = false;
  }
}

function keyUpEventHandler(e) {
  if (e.keyCode == 87) {
    player.setThrust(false);
  } else if (e.keyCode == 65) {
    player.increaseAngleVelocity();
  } else if (e.keyCode == 68) {
    player.decreaseAngleVelocity();
  }

}



