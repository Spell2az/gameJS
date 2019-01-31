class Asteroid {
  constructor (position = {x : 0, y: 0}, angle, velocity, angleVelocity, radius, img){
    this.position = {...position}
    this.velocity = {...velocity}
    this.angle = angle;
    this.angleVelocity = angleVelocity;
    this.radius = radius;
    this.img = img;
    
  }
}

Asteroid.prototype.draw = function (ctx) {
  
  ctx.save();
  ctx.translate(this.position.x, this.position.y)
  ctx.rotate(this.angle);
  ctx.scale(2.5, 2.5)
  ctx.drawImage(this.img, -this.radius/2 , -this.radius/2, this.radius, this.radius)
  ctx.restore();
  this.update();
}

Asteroid.prototype.collide = function(object) {
  
  return getDistanceBetweenTwoPoints([this.position.x, this.position.y], [object.position.x, object.position.y]) <= this.radius + object.radius
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