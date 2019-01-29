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