const WIDTH = 800;
const HEIGHT = 600;
const MAX_NUMBER_OF_ASTEROIDS = 25;
//const img = new Image(100, 100);
//img.src = "../img/asteroid_blue.png";



window.onload= () => {

  const canvas = document.getElementById('canvas');
  
  const ctx = canvas.getContext('2d');
  
  const player = new Player({x:WIDTH/2, y: HEIGHT/2});
  const asteroids = [];
  
  const makeAsteroids = () => {
    while(asteroids.length < MAX_NUMBER_OF_ASTEROIDS){
      const positionY = getRandomInt(0, HEIGHT);
      const positionX = getRandomInt(0, WIDTH);
      const distance = getDistanceBetweenTwoPoints([player.position.x, player.position.y],
        [positionX, positionY])
        console.log(distance);
      if( distance > 100){
          const velocityX = getRandom(- 0.5, 0.5);
          const velocityY = getRandom(- 0.5, 0.5);
          const angle = Math.PI * getRandom(0, 2);
          const angleVelocity = getRandom(-0.1, 0.1);
          const radius = getRandomInt(25, 75);
          asteroids.push(new Asteroid({x: positionX ,y: positionY}, angle, {x: velocityX, y: velocityY}, angleVelocity, radius))
        }
     
    }
  }
 
  drawFrame();

  function drawFrame() {
    makeAsteroids();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    ctx.fillStyle = "red";
    //ctx.fillRect(100,100,100,100);
   asteroids.forEach(asteroid => asteroid.draw(ctx))
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
       console.table(player.pos)
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

