
// Convert angle to vector
function angleToVector(angle){
  return [Math.cos(Math.PI / 180 * angle), Math.sin(Math.PI / 180  * angle)];
}
//Get random int in the range min-max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Calculate distance between two points
function getDistanceBetweenTwoPoints(point1, point2){
  const [point1x, point1y] = point1;
  const [point2x, point2y] = point2;
  return Math.sqrt((point1x - point2x)**2 + (point1y - point2y)**2)
}


//get random number inc. floats between ranges min-max
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}


// gets collision between list of objects and other object, adds explosion if collided

function groupCollide(group, otherObject, explosions){
  
  for (let index = 0; index < group.length; index++) {
    const element = group[index];
    //if Player reduce health
    if(element.collide(otherObject)) {
      if(otherObject.constructor.name=== "Player")
      {
        otherObject.health -= PLAYER_COLLISION_DAMAGE_POINTS;
        //If player collided with missle reduce health
        if (element.constructor.name === "Missle") {
          otherObject.health -= PLAYER_COLLISION_DAMAGE_POINTS;
        }
      }
      //if missle explodes make it blue
      else if(otherObject.constructor.name === "Missle"){
        explosions.push(new AnimatedSprite(blueExplosionSprite, {
                x: otherObject.position.x,
          y: otherObject.position.y}, 2 , 128, 16))
      }
      // asteroid explosion
      explosions.push(new AnimatedSprite(explosionSprite, {
        x: element.position.x,
        y: element.position.y
      }, 2, 128, 16))
      // on collision remove colided object
      group.splice(index, 1)
      return true
    }
  }
  return false
}


// collision for missles and asteroids, increse the score by number of collisions
function twoGroupCollide(group1, group2, explosions){
  let collisions = 0;
  group1.forEach((group1Object, index) =>{ 
    if(groupCollide(group2, group1Object, explosions)){
      collisions+=1;
      group1.splice(index, 1)
    }}
  )

  return collisions;
}
// Conversion from base10 number to base 16
function convertToHexString(number){
let hexString = number.toString(16);
if (hexString.length % 2) {
  hexString = '0' + hexString;
}
return hexString;
}         
//Cycle through radio buttons
function selectNextMenuItem(name) {
  const checkboxes = document.querySelectorAll(`input[name='${name}']`);
  const checkedItemIdx = [...checkboxes].findIndex(checkbox => checkbox.checked)
  const nextItemIdx = (checkedItemIdx + checkboxes.length - 1) % checkboxes.length;
  checkboxes[nextItemIdx].checked = true;
}
//Cycle through radio buttons
function selectPreviousMenuItem(name) {
  const checkboxes = document.querySelectorAll(`input[name='${name}']`);
  const checkedItemIdx = [...checkboxes].findIndex(checkbox => checkbox.checked)
  const previousItemIdx = checkedItemIdx === checkboxes.length - 1 ? 0 : checkedItemIdx + 1;
  checkboxes[previousItemIdx].checked = true;
}
// Set display of element with id
function toggleElementDisplay(elementID, isVisible) {
  const element = document.getElementById(elementID);
  element.style.display = isVisible ? 'block' : 'none';
}

// Add/Remove menuListeners
function toggleMenuListeners(areActive) {
  areActive ? window.addEventListener("keydown", menuKeyHandlers) : window.removeEventListener("keydown", menuKeyHandlers)
}
// Add/Remove gameListeners
function toggleGameListeners(areActive) {
  if (areActive) {
    window.addEventListener("keydown", keyDownHandlerGame);
    window.addEventListener("keyup", keyUpHandlerGame);
    return;
  }
  window.removeEventListener("keydown", keyDownHandlerGame);
  window.removeEventListener("keyup", keyUpHandlerGame);
}
// Add/Remove gameRestartListeners
function toggleGameRestartListener(areActive){
  areActive && window.addEventListener('keydown', gameRestartHandler);
  !areActive && window.removeEventListener('keydown', gameRestartHandler);
}