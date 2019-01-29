class Asteroid {
  constructor (position = {x : 0, y: 0}, angle, velocity, angleVelocity, radius){
    this.position = {...position}
    this.velocity = {...velocity}
    this.angle = angle;
    this.angleVelocity = angleVelocity;
    this.radius = radius;
  }
}

Asteroid.prototype.draw = function (ctx) {
  
  ctx.save();
  ctx.translate(this.position.x, this.position.y)
  ctx.rotate(this.angle);
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(0 , 0, this.radius, 0, 2 * Math.PI);
  ctx.lineTo(0 , 0)
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  this.update();
}


Asteroid.prototype.update = function () {
  
  this.angle += this.angleVelocity;  

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
}