class Player {
  constructor(position = {x: 0, y: 0}, angle = 0) {
    this.position = {...position}
    this.velocity = {x: 0, y: 0}
    this.angleVelocity = 0;
    this.angle = angle;
    this.thrust = false;
    this.radius = 25
    this.health = 100;
    this.thrustProps = {
      greenComponent: 0,
      thrustSize: 150,
      thrustIncrement: 5
    };
    this.fuel = 100;
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
  if(this.fuel > 0){
    this.fuel -= 0.02;
  }
  

  if( (this.position.x + this.velocity.x) < -50){
    this.position.x = WIDTH;
  }
  else{
    this.position.x = (this.position.x + this.velocity.x) % WIDTH;
  }

   if ((this.position.y + this.velocity.y) < -50) {
     this.position.y = HEIGHT;
   } else {
     this.position.y = (this.position.y + this.velocity.y) % HEIGHT;
   }
  
  if (this.thrust) {
    const acc = angleToVector(this.angle);
    this.velocity.x += acc[0] * 0.1;
    this.velocity.y += acc[1] * 0.1;
  }

  this.velocity.x *= 0.99;
  this.velocity.y *= 0.99;

  if (this.thrust){
    if(this.thrustProps.thrustSize < 300){
      this.thrustProps.thrustSize += this.thrustProps.thrustIncrement;
    }

    if (this.thrustProps.greenComponent < 255) {
      this.thrustProps.greenComponent += this.thrustProps.thrustIncrement;
    }
  } else {
    this.thrustProps.thrustSize = 150;
    this.thrustProps.greenComponent = 0;
  }
}

//Player.prototype.collide

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
  
  ctx.lineWidth = 0;
  ctx.fillRect(0,0,10,10);

  ctx.fillStyle = "white";
  // Left GunPod
  ctx.beginPath();
  ctx.ellipse(-50, -5, 10, 50, 0, 0, 2 * Math.PI);

  ctx.fill();
  ctx.stroke();

  //Right GunPod
  ctx.beginPath();
  ctx.ellipse(50, -5, 10, 50, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // wings

  ctx.beginPath();
 
  ctx.fillStyle = "#A5A5A5";

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
  ctx.fillStyle = "#FF3D3D";
  ctx.moveTo(-30, 105);
  ctx.bezierCurveTo(-40, -155, 40, -155, 30, 105);
  ctx.lineTo(-30, 105);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#666666";
  ctx.fillRect(-20, 105, 40, 10);
  
  //Cockpit
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.ellipse(0, -15, 10, 30, 0, 0, 2 * Math.PI);
  ctx.fill();
 

  
  if(this.thrust){
    ctx.beginPath();
    ctx.moveTo(-20, 115);
    ctx.strokeStyle= "red";
    ctx.fillStyle = `#FF${convertToHexString(this.thrustProps.greenComponent)}00`;
    ctx.quadraticCurveTo(0, this.thrustProps.thrustSize, 20, 115);
    ctx.closePath();
    ctx.fill();
    
  }
  
  
  ctx.restore();
}
