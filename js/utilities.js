function angleToVector(angle){
  return [Math.cos(Math.PI / 180 * angle), Math.sin(Math.PI / 180  * angle)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDistanceBetweenTwoPoints(point1, point2){
  const [point1x, point1y] = point1;
  const [point2x, point2y] = point2;
  return Math.sqrt((point1x - point2x)**2 + (point1y - point2y)**2)
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function groupCollide(group, otherObject, explosions){
  
  for (let index = 0; index < group.length; index++) {
    const element = group[index];
    if(element.collide(otherObject)) {
      if(otherObject.constructor.name=== "Player")
      {
        otherObject.health -= PLAYER_COLLISION_DAMAGE_POINTS;
        
        if (element.constructor.name === "Missle") {
          otherObject.health -= PLAYER_COLLISION_DAMAGE_POINTS;
        }
      }
      else if(otherObject.constructor.name === "Missle"){
        explosions.push(new AnimatedSprite(blueExplosionSprite, {
                x: otherObject.position.x,
          y: otherObject.position.y}, 2 , 128, 16))
      }
      
      explosions.push(new AnimatedSprite(explosionSprite, {
        x: element.position.x,
        y: element.position.y
      }, 2, 128, 16))
      group.splice(index, 1)
      return true
    }
  }
  return false
}

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

function convertToHexString(number){
let hexString = number.toString(16);
if (hexString.length % 2) {
  hexString = '0' + hexString;
}
return hexString;
}         

function selectNextMenuItem(name) {
  const checkboxes = document.querySelectorAll(`input[name='${name}']`);
  const checkedItemIdx = [...checkboxes].findIndex(checkbox => checkbox.checked)
  const nextItemIdx = (checkedItemIdx + checkboxes.length - 1) % checkboxes.length;
  checkboxes[nextItemIdx].checked = true;
}

function selectPreviousMenuItem(name) {
  const checkboxes = document.querySelectorAll(`input[name='${name}']`);
  const checkedItemIdx = [...checkboxes].findIndex(checkbox => checkbox.checked)
  const previousItemIdx = checkedItemIdx === checkboxes.length - 1 ? 0 : checkedItemIdx + 1;
  checkboxes[previousItemIdx].checked = true;
}

function toggleElementDisplay(elementID, isVisible) {
  const element = document.getElementById(elementID);
  element.style.display = isVisible ? 'block' : 'none';
}

function toggleMenuListeners(areActive) {
  areActive ? window.addEventListener("keydown", menuKeyHandlers) : window.removeEventListener("keydown", menuKeyHandlers)
}

function toggleGameListeners(areActive) {
  if (areActive) {
    window.addEventListener("keydown", keyDownHandlerGame);
    window.addEventListener("keyup", keyUpHandlerGame);
    return;
  }
  window.removeEventListener("keydown", keyDownHandlerGame);
  window.removeEventListener("keyup", keyUpHandlerGame);
}

function toggleGameRestartListener(areActive){
  areActive && window.addEventListener('keydown', gameRestartHandler);
  !areActive && window.removeEventListener('keydown', gameRestartHandler);
}