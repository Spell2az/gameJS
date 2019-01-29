class Player {
  constructor(position = {x: 0, y: 0}, angle = 0) {
    this.position = {...position}
    this.v = {x: 0, y: 0}
    this.angleVelocity = 0;
    this.angle = angle;
    this.thrust = false;
  }

  

}
Player.prototype.draw = function (ctx) {
 
  this.update();
  ctx.save();
  ctx.translate(this.position.x, this.position.y)
  ctx.rotate(this.angle * Math.PI / 180);
  this.drawPlayer(ctx);
  ctx.restore();
 
}

Player.prototype.update = function () {
  this.angle += this.angleVelocity;
  

  if( (this.position.x + this.v.x) < -50){
    this.position.x = WIDTH;
  }
  else{
    this.position.x = (this.position.x + this.v.x) % WIDTH;
  }

   if ((this.position.y + this.v.y) < -50) {
     this.position.y = HEIGHT;
   } else {
     this.position.y = (this.position.y + this.v.y) % HEIGHT;
   }
  
  if (this.thrust) {
    const acc = angleToVector(this.angle);
    this.v.x += acc[0] * 0.1;
    this.v.y += acc[1] * 0.1;
  }

  this.v.x *= 0.99;
  this.v.y *= 0.99;
}

Player.prototype.increaseAngleVelocity = function () {
  this.angleVelocity += 0.15;
}

Player.prototype.decreaseAngleVelocity = function () {
  this.angleVelocity -= 0.15;
}

Player.prototype.setThrust = function (isThrustOn) {
  this.thrust = isThrustOn;
}

Player.prototype.drawPlayer = function(ctx) {
  ctx.save();
  ctx.scale(0.3, 0.3);
  ctx.rotate(0.5 * Math.PI);
  
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "magenta");
  // Fill with gradient
  //ctx.strokeStyle = gradient;
  ctx.fillRect(0,0,10,10);
  ctx.beginPath();
  ctx.fillStyle = gradient;

  // Left GunPod
  ctx.beginPath();
  ctx.ellipse(-50, -5, 10, 50, 0, 0, 2 * Math.PI);

  ctx.fill();
  ctx.stroke();

  //Right GunPod
  ctx.beginPath();
  ctx.ellipse(50, -5, 10, 50, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  // wings
  ctx.beginPath();

  ctx.fillStyle = "black";

  ctx.moveTo(-30, -65);
  ctx.lineTo(-90, 125);
  ctx.lineTo(-60, 105);
  ctx.arc(0, 105, 60, 1 * Math.PI, 2 * Math.PI);
  ctx.lineTo(90, 125);
  ctx.lineTo(30, -65);
  ctx.lineTo(20, -55);
  ctx.lineTo(20, -35);
  ctx.lineTo(-20, -35);
  ctx.lineTo(-20, -55);
  ctx.lineTo(-30, -65);
  ctx.fill();
  ctx.stroke();
  // body
  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.moveTo(-30, 105);
  ctx.bezierCurveTo(-40, -155, 40, -155, 30, 105);
  ctx.lineTo(-30, 105);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.fillRect(-20, 105, 40, 10);
  
  //Cockpit
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.ellipse(0, -15, 10, 30, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(-10, 105);
  ctx.lineTo(-10, -25);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(10, 105);
  ctx.lineTo(10, -25);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(0, 105);
  ctx.lineTo(0, 15);
  ctx.stroke();

  ctx.restore();
}

// Player.prototype.drawPlayer = function(ctx) {
//   const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
//   gradient.addColorStop("0", "magenta");
//   gradient.addColorStop("0.5", "blue");
//   gradient.addColorStop("1.0", "magenta");
//   // Fill with gradient
//   //ctx.strokeStyle = gradient;

//   ctx.beginPath();
//   ctx.fillStyle = gradient;

//   //ctx.fillRect(20, 70, 20, 70);
//   ctx.beginPath();
//   ctx.ellipse(40, 100, 10, 50, 0, 0, 2 * Math.PI);

//   ctx.fill();
//   ctx.stroke();
//   //ctx.fillRect(140, 70, 20, 70);

//   ctx.beginPath();
//   ctx.ellipse(140, 100, 10, 50, 0, 0, 2 * Math.PI);
//   ctx.fill();
//   ctx.stroke();
//   // wings
//   ctx.beginPath();

//   ctx.fillStyle = "black";

//   ctx.moveTo(60, 40);
//   ctx.lineTo(0, 180);
//   ctx.lineTo(30, 210);
//   ctx.arc(90, 210, 60, 1 * Math.PI, 2 * Math.PI);
//   ctx.lineTo(180, 180);
//   ctx.lineTo(120, 40);
//   ctx.lineTo(110, 50);
//   ctx.lineTo(110, 80);
//   ctx.lineTo(70, 80);
//   ctx.lineTo(70, 50);
//   ctx.lineTo(60, 40);
//   ctx.fill();
//   ctx.stroke();
//   // body
//   ctx.beginPath();
//   ctx.fillStyle = gradient;
//   ctx.moveTo(60, 210);
//   ctx.bezierCurveTo(50, -50, 130, -50, 120, 210);
//   ctx.lineTo(60, 210);
//   ctx.fill();
//   ctx.stroke();

//   ctx.fillStyle = "black";
//   ctx.fillRect(70, 210, 40, 10);

//   ctx.beginPath();
//   ctx.fillStyle = "red";
//   ctx.ellipse(90, 90, 10, 30, 0, 0, 2 * Math.PI);
//   ctx.fill();
//   ctx.stroke();

//   ctx.beginPath();
//   ctx.setLineDash([5, 5]);
//   ctx.moveTo(80, 210);
//   ctx.lineTo(80, 80);
//   ctx.stroke();

//   ctx.beginPath();
//   ctx.setLineDash([5, 5]);
//   ctx.moveTo(100, 210);
//   ctx.lineTo(100, 80);
//   ctx.stroke();

//   ctx.beginPath();
//   ctx.setLineDash([5, 5]);
//   ctx.moveTo(90, 210);
//   ctx.lineTo(90, 120);
//   ctx.stroke();

// }