const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const MAX_NUMBER_OF_ASTEROIDS = 25;
const MISSLE_LIFETIME_MAX = 500;
const ASTEROID_EXCLUSION_RADIUS = 250;
const asteroidImg = new Image(90, 90);
asteroidImg.src = "../img/asteroid_blue.png";
const missleImg = new Image(50, 50)
missleImg.src = "../img/missle.png";
let score = 0;
const scoreDisplay = document.getElementById("score")

const explosionSprite = new Image(128,128)
explosionSprite.src = "../img/Explosion03.png";

function explode(x,y, duration, spriteSize){
  let col = 0;
  let row = 0;

  setInterval(()=> {
    
  }, duration)
  
}
window.onload= () => {

  const canvas = document.getElementById('canvas');
  
  const ctx = canvas.getContext('2d');
  
  const player = new Player({x:WIDTH/2, y: HEIGHT/2});
  const asteroids = [];
  let missles = [];
 
  const makeAsteroids = () => {
    while(asteroids.length < MAX_NUMBER_OF_ASTEROIDS){
      const positionY = getRandomInt(0, HEIGHT);
      const positionX = getRandomInt(0, WIDTH);
      const distance = getDistanceBetweenTwoPoints([player.position.x, player.position.y],
        [positionX, positionY])
        console.log(distance);
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

  drawFrame();

  function drawFrame() {
    makeAsteroids();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    ctx.fillStyle = "red";
    
    asteroids.forEach(asteroid => asteroid.draw(ctx))
    missles.forEach((missle, i) => {
      if(missle.lifeTime > MISSLE_LIFETIME_MAX){
        missles.splice(i ,1);
      }
    })
    missles.forEach(missle => missle.draw(ctx))
    groupCollide(asteroids, player)

    score += twoGroupCollide(missles, asteroids)
   scoreDisplay.textContent = score;
    window.requestAnimationFrame(drawFrame);
    
  } 
  
window.addEventListener("keydown", keyDownEventHandler);
window.addEventListener("keyup", keyUpEventHandler);

  function keyDownEventHandler(e) {
    
    if (e.keyCode == 87) {
      player.setThrust(true);
    }
    else if (e.keyCode == 65) {
      player.decreaseAngleVelocity();
    }
    else if (e.keyCode == 68) {
      player.increaseAngleVelocity();
    }
    else if (e.code == "Space"){
       missles.push(new Missle({ ...player.position
       }, player.angle, { ...player.velocity
       }, 10, missleImg ))
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
}

