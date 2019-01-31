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
       misslesPlayer1: [],
       explosions: []
     }
  } else if (mode == 'deathmatch') {
     return {
       player1: new Player({
         x: WIDTH * 0.6,
         y: HEIGHT * 0.6
       }, "#FF0000"),
       player2: new Player({
         x: WIDTH * 0.3,
         y: HEIGHT * 0.3
       }, "#0000FF",),
       asteroids: [],
       misslesPlayer1: [],
       misslesPlayer2: [],
       explosions: []
     }
  }
 
}

function main(){

  const canvas = document.getElementById('canvas');
  if(gameMode ==='single'){
    score = 0;
    toggleElementDisplay('single-player-info', true);
    toggleElementDisplay('multiplayer-info', false);
  }
  if(gameMode==='deathmatch'){
    toggleElementDisplay('single-player-info', false);
    toggleElementDisplay('multiplayer-info', true);
  }
  
  gameOn = true;
  const ctx = canvas.getContext('2d');
  gameState = gameSetup(gameMode);
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
  const fuel = document.getElementById('fuel');
  const p1Health = document.getElementById('p1-health');
  const p2Health = document.getElementById('p2-health');
if(gameOn){
 
 drawFrame();
}

  function drawFrame() {
    

    fuel.style.width = `${gameState.player1.fuel}%`;
    makeAsteroids();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.player1.draw(ctx);
    if(gameMode == 'deathmatch'){
      p1Health.style.width = `${gameState.player1.health}%`;
      p2Health.style.width = `${gameState.player2.health}%`;
      gameState.player2.draw(ctx);

      gameState.misslesPlayer1.forEach((missle, i) => {
        if (!missle.collided && missle.lifeTime > MISSLE_LIFETIME_MAX) {
          gameState.misslesPlayer1.splice(i, 1);
        }
      })
      gameState.misslesPlayer1.forEach(missle => missle.draw(ctx))

      gameState.misslesPlayer2.forEach((missle, i) => {
        if (!missle.collided && missle.lifeTime > MISSLE_LIFETIME_MAX) {
          gameState.misslesPlayer2.splice(i, 1);
        }
      })
      gameState.misslesPlayer2.forEach(missle => missle.draw(ctx))

       groupCollide(gameState.misslesPlayer1, gameState.player2, gameState.explosions)
       groupCollide(gameState.misslesPlayer2, gameState.player1, gameState.explosions)

       if (gameState.player1.health <= 0 || gameState.player2.health <= 0){
         gameOver(gameState.player1, gameState.player2)
       }
    }

    if(gameMode == 'single'){
       gameState.asteroids.forEach(asteroid => asteroid.draw(ctx))
       gameState.misslesPlayer1.forEach((missle, i) => {
         if (!missle.collided && missle.lifeTime > MISSLE_LIFETIME_MAX) {
           gameState.misslesPlayer1.splice(i, 1);
         }
       })
       gameState.misslesPlayer1.forEach(missle => missle.draw(ctx))
       groupCollide(gameState.asteroids, gameState.player1, gameState.explosions)

       score += twoGroupCollide(gameState.misslesPlayer1, gameState.asteroids, gameState.explosions)
       scoreDisplay.textContent = `SCORE: ${score}`;
       healthDisplay.style.width = `${ gameState.player1.health}%`;
    }

     gameState.explosions.forEach((explosion, i) => {
      explosion.draw(ctx);
      if(explosion.finished){
         gameState.explosions.splice(i, 1);
      }
    });
    if(gameState.player1.health <= 0 || gameState.player1.fuel <= 0){
      gameOver(gameState.player1);
    }
    
    gameOn && window.requestAnimationFrame(drawFrame);
  } 

}

function restart() {
  gameState = gameSetup(gameMode);
  gameOn = false;
  toggleMenuListeners(true);
  toggleElementDisplay(toggledElementIds.gameContent, false);
  toggleElementDisplay(toggledElementIds.menu, true);
}

const menuActions = {
  radio_start: startGame,
  radio_options: viewOptions,
  radio_game_modes: selectGameMode,
  radio_instructions: viewInstructions
}

const toggledElementIds = {
  menu: 'menu-wrapper',
  gameContent: 'game-content',
  options: 'options',
  gameMode: 'game-mode',
  instructions: 'instructions',
}

const menu = {
  options: false,
  mainMenu: true,
  gameMode: false,
  instructions: false
}

toggleMenuListeners(true);

function menuKeyHandlers (e){
 
  if (e.keyCode == keycode.UP) {
    if(menu.mainMenu){
      selectNextMenuItem('radio_main')
    }
    else if(menu.options){
      selectNextMenuItem('radio_options')
    } 
    else if (menu.gameMode) {
      selectNextMenuItem('radio_mode')
    }
  }
  if(e.keyCode == keycode.DOWN){

    if (menu.mainMenu) {
        selectPreviousMenuItem('radio_main')
     }
    else if (menu.options) {
      selectPreviousMenuItem('radio_options')
    }
     else if (menu.gameMode) {
       selectPreviousMenuItem('radio_mode')
     }
   
  }
  if(e.keyCode == keycode.ENTER){
   
   if(menu.mainMenu){
       const checkboxes = document.querySelectorAll("input[name='radio_main']");
       const checkedId = [...checkboxes].find(radio => radio.checked).id;
       menuActions[checkedId]();
    } 
    else if (menu.options) {
      const checkboxes = document.querySelectorAll("input[name='radio_options']");
      const checkedId = [...checkboxes].find(radio => radio.checked).id;
      optionSelected(checkedId);
      closeOptions();
    } 
    else if (menu.gameMode){
      const checkboxes = document.querySelectorAll("input[name='radio_mode']");
      const checkedId = [...checkboxes].find(radio => radio.checked).id;
      modeSelect(checkedId);
      closeGameMode();
    }else if (menu.instructions){
      closeInstructions();
    }
  }
}

function gameOver(player1, player2) {
  gameOn = false;
  toggleElementDisplay('gameover', true);
  const messageBox = document.getElementById('messagebox');

  toggleGameListeners(false);
  toggleGameRestartListener(true);

  if(gameMode == 'deathmatch'){
    const winner = player1.health > player2.health ? 'Player 1' : 'Player 2'
    const looser = player1.health < player2.health ? 'Player 1' : 'Player 2'
    const message = `Winner is ${winner}, ${looser} lost`;

    messageBox.textContent = message;
  } else {
    if(player1.health <= 0) {
      const message = "You died! Try again!";
       messageBox.textContent = message;
    } else {
      const message = `Well done, your score is ${score}`;
      messageBox.textContent = message;
    }
  }
}

function gameRestartHandler(e) {
    if (e.keyCode == keycode.ENTER) {
       toggleElementDisplay('gameover', false);
       toggleElementDisplay(toggledElementIds.menu, true);
       toggleElementDisplay(toggledElementIds.gameContent, false);
      restart();
    }
  }

function optionSelected(option) {
  asteroidSetting = {
    radio_low: 5,
    radio_medium: 10,
    radio_high: 15
  }
  MAX_NUMBER_OF_ASTEROIDS = asteroidSetting[option];
}
function modeSelect(mode){
  modes = {
    radio_single: 'single',
    radio_deathmatch: 'deathmatch'
  }
  gameMode = modes[mode]
}

function startGame(){
  console.log('start game called')
  // Hide menu
  toggleElementDisplay(toggledElementIds.menu, false);
  // Show canvas
  toggleElementDisplay(toggledElementIds.gameContent, true);
  // Initialize gameObjects
  gameState = gameSetup(gameMode);
  // Remove menu key listeners
  toggleMenuListeners(false);
  // Add game key listeners
  toggleGameListeners(true);
  // Run game;
  main();
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
function selectGameMode() {
  menu.gameMode = true;
  menu.mainMenu = false;
  toggleElementDisplay(toggledElementIds.gameMode, true);
}

function closeGameMode() {
  menu.gameMode = false;
  menu.mainMenu = true;
  toggleElementDisplay(toggledElementIds.gameMode, false);
}
//TODO
function viewInstructions () {
   menu.instructions = true;
   menu.mainMenu = false;
   toggleElementDisplay(toggledElementIds.instructions, true);
};
function closeInstructions() {
   menu.instructions = false;
   menu.mainMenu = true;
   toggleElementDisplay(toggledElementIds.instructions, false);
}

function keyDownHandlerGame(e) {

  if (e.keyCode == keycode.UP) {
     gameState.player1.setThrust(true);
  } else if (e.keyCode == keycode.LEFT) {
     gameState.player1.decreaseAngleVelocity();
  } else if (e.keyCode == keycode.RIGHT) {
     gameState.player1.increaseAngleVelocity();
  } else if (e.keyCode == keycode.PERIOD) {
     gameState.misslesPlayer1.push(new Missle({ ...gameState.player1.position
    }, gameState.player1.angle, { ...gameState.player1.velocity
    }, 10, missleImg))
  }
  else if (e.keyCode == keycode.ESCAPE) {
    restart();
  }

  if(gameMode =='deathmatch'){
     if (e.keyCode == keycode.W) {
       gameState.player2.setThrust(true);
     } else if (e.keyCode == keycode.A) {
       gameState.player2.decreaseAngleVelocity();
     } else if (e.keyCode == keycode.D) {
       gameState.player2.increaseAngleVelocity();
     } else if (e.keyCode == keycode.SPACE) {
       gameState.misslesPlayer2.push(new Missle({ ...gameState.player2.position
       }, gameState.player2.angle, { ...gameState.player2.velocity
       }, 10, missleImg))
     }
  }
}

function keyUpHandlerGame(e) {
  if (e.keyCode == keycode.UP) {
     gameState.player1.setThrust(false);
  } else if (e.keyCode == keycode.LEFT) {
     gameState.player1.increaseAngleVelocity();
  } else if (e.keyCode == keycode.RIGHT) {
     gameState.player1.decreaseAngleVelocity();
  }
  if (gameMode == 'deathmatch') { 
    if (e.keyCode == keycode.W) {
      gameState.player2.setThrust(false);
    } else if (e.keyCode == keycode.A) {
      gameState.player2.increaseAngleVelocity();
    } else if (e.keyCode == keycode.D) {
      gameState.player2.decreaseAngleVelocity();
    }
  }

}




