const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let MAX_NUMBER_OF_ASTEROIDS = 10;
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
let gameMode = 'single';
let gameState = gameSetup(gameMode);

function gameSetup(mode){
  if(mode == 'single'){
     return {
       player1: new Player({
         x: WIDTH / 2,
         y: HEIGHT / 2
       }),
       asteroids: [],
       missles: [],
       explosions: []
     }
  } else if (mode == 'deathmatch'){
     return {
       player1: new Player({
         x: WIDTH / 6,
         y: HEIGHT / 2
       }),
       player2: new Player({
         x: WIDTH * 0.3,
         y: HEIGHT / 2
       }),
       asteroids: [],
       missles: [],
       explosions: []
     }
  }
 
}
//const explosion = new AnimatedSprite(explosionSprite, 128, 128, 16, 15, 128, 16);
//explosion.draw(ctx);
//  const player = new Player({
//    x: WIDTH / 2,
//    y: HEIGHT / 2
//  });
//  const asteroids = [];
//  let missles = [];
//  const explosions = []

function main(){

  const canvas = document.getElementById('canvas');
  
  const ctx = canvas.getContext('2d');
  
  const makeAsteroids = () => {
    while (gameState.asteroids.length < MAX_NUMBER_OF_ASTEROIDS) {
      const positionY = getRandomInt(0, HEIGHT);
      const positionX = getRandomInt(0, WIDTH);
      const distance = getDistanceBetweenTwoPoints([gameState.player1.position.x, gameState.player1.position.y],
        [positionX, positionY])
      if (distance > ASTEROID_EXCLUSION_RADIUS) {
          const velocityX = getRandom(- 0.5, 0.5);
          const velocityY = getRandom(- 0.5, 0.5);
          const angle = Math.PI * getRandom(0, 2);
          const angleVelocity = getRandom(-0.1, 0.1);
          const radius = getRandomInt(25, 75);
          gameState.asteroids.push(new Asteroid({
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
    const fuel = document.getElementById('fuel');

    fuel.style.width = `${gameState.player1.fuel}%`;
    makeAsteroids();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.player1.draw(ctx);
    
    
    gameState.asteroids.forEach(asteroid => asteroid.draw(ctx))
     gameState.missles.forEach((missle, i) => {
      if(!missle.collided && missle.lifeTime > MISSLE_LIFETIME_MAX){
         gameState.missles.splice(i, 1);
      }
    })
     gameState.missles.forEach(missle => missle.draw(ctx))
    groupCollide(gameState.asteroids, gameState.player1, gameState.explosions)

    score += twoGroupCollide(gameState.missles, gameState.asteroids, gameState.explosions)
    scoreDisplay.textContent = `SCORE: ${score}`;
    healthDisplay.style.width = `${ gameState.player1.health}%`;
    if (gameOn) {
       window.requestAnimationFrame(drawFrame);
    }
     gameState.explosions.forEach((explosion, i) => {
      explosion.draw(ctx);
      if(explosion.finished){
         gameState.explosions.splice(i, 1);
      }
    });
    
  } 

}
const menuActions = {
  radio_start: startGame,
  radio_options: viewOptions,
  radio_game_modes: selectGameMode,
  radio_credits: viewCredits
}

const toggledElementIds = {
  menu: 'menu-wrapper',
  gameContent: 'game-content',
  options: 'options',
}

const gameModes = {
  singleScore: setSinglePlayerMaxScore,
  singleNumberOfKills: setSinglePlayerNumberOfKills,
  multiCoop: setMultiCoop,
  multiDeathmatch: setMultiDeathMatch
}

const menu = {
  options: false,
  mainMenu: true,
}

function setSinglePlayerMaxScore () {}
function setSinglePlayerNumberOfKills () {}
function setMultiCoop () {}
function setMultiDeathMatch () {}

window.addEventListener("keydown", menuKeyHandlers )

function menuKeyHandlers (e){
 
  if (e.keyCode == keycode.W) {
    if(menu.mainMenu){
      selectNextMenuItem('radio_main')
    }
    if(menu.options){
      selectNextMenuItem('radio_options')
    }
  }
  if(e.keyCode == keycode.S){

    if (menu.mainMenu) {
        selectPreviousMenuItem('radio_main')
     }
    if (menu.options) {
      selectPreviousMenuItem('radio_options')
    }
   
  }
  if(e.keyCode == keycode.ENTER){
   
   if(menu.mainMenu){
       const checkboxes = document.querySelectorAll("input[name='radio_main']");
       const checkedId = [...checkboxes].find(radio => radio.checked).id;
       menuActions[checkedId]();

    } else
    if (menu.options) {
      const checkboxes = document.querySelectorAll("input[name='radio_options']");
      const checkedId = [...checkboxes].find(radio => radio.checked).id;
      optionSelected(checkedId);
      closeOptions();
    }
    
   
  }
}

function optionSelected(checkedId) {
  asteroidSetting = {
    radio_low: 5,
    radio_medium: 10,
    radio_high: 15
  }

  MAX_NUMBER_OF_ASTEROIDS = asteroidSetting[checkedId];
}

function startGame(){
  console.log('start game called')
  // Hide menu
  toggleElementDisplay(toggledElementIds.menu, false);
  // Ahow canvas
  toggleElementDisplay(toggledElementIds.gameContent, true);
  
  // initialize gameObjects
  
  
  //remove menuKeyHandlers
  window.removeEventListener("keydown", menuKeyHandlers)
  //add game keyHandlers
  window.addEventListener("keydown", keyDownHandlerGame);
  window.addEventListener("keyup", keyUpHandlerGame);
};
function viewOptions () {

  menu.options = true;
  menu.mainMenu = false;
  toggleElementDisplay(toggledElementIds.options, true);
};
function closeOptions(){
  menu.options = false;
  menu.mainMenu = true;
  toggleElementDisplay(toggledElementIds.options, false);
}
function selectGameMode () {
  console.log('select game mode called');
};
function viewCredits () {
  console.log('view credits called')
};

// window.addEventListener("keydown", keyDownHandlerGame);
// window.addEventListener("keyup", keyUpHandlerGame);
function keyDownHandlerGame(e) {

  if (e.keyCode == 87) {
     gameState.player1.setThrust(true);
  } else if (e.keyCode == 65) {
     gameState.player1.decreaseAngleVelocity();
  } else if (e.keyCode == 68) {
     gameState.player1.increaseAngleVelocity();
  } else if (e.code == "Space") {
     gameState.missles.push(new Missle({ ...gameState.player1.position
    }, gameState.player1.angle, { ...gameState.player1.velocity
    }, 10, missleImg))
  } else if (e.keyCode == "13") {
    console.log(gameOn);
    gameOn = true
    main()
  } else if (e.keyCode == "27") {
    gameOn = false;
  }
}

function keyUpHandlerGame(e) {
  if (e.keyCode == 87) {
     gameState.player1.setThrust(false);
  } else if (e.keyCode == 65) {
     gameState.player1.increaseAngleVelocity();
  } else if (e.keyCode == 68) {
     gameState.player1.decreaseAngleVelocity();
  }

}




