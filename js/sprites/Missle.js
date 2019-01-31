class Missle {
  constructor(
    position = {
    x: 0,
    y: 0
  }, angle, velocity, radius, img) {

    this.baseVelocity = 3
    this.position = { ...position
    };
    // Add own velocity to the velocity passed into constructor which will be Player's velocity
    this.velocity = { x: velocity.x + angleToVector(angle)[0] * 8 , y: velocity.y + angleToVector(angle)[1] * 8 
    };
    this.angle = angle;
    this.radius = radius;
    this.lifeTime = 0;
    this.img = img;  
   
  }
}

Missle.prototype.draw = function (ctx) {

  ctx.save();
  ctx.translate(this.position.x, this.position.y)
  ctx.rotate(this.angle);
  ctx.scale(3, 3)
  ctx.drawImage(this.img, -this.radius / 2, -this.radius / 2 , this.radius, this.radius)
  ctx.stroke();
  ctx.restore();
  this.update();
}

// Collisions
Missle.prototype.collide = function (object) {
  return getDistanceBetweenTwoPoints([this.position.x, this.position.y], [object.position.x, object.position.y]) <= this.radius + object.radius
}

Missle.prototype.update = function () {
  //add missle lifetime;
  //Positioning accross the screen.
  this.lifeTime++;
  if ((this.position.x + this.velocity.x) < -50) {
    this.position.x = WIDTH;
  } else {
    this.position.x = (this.position.x + this.velocity.x) % WIDTH;
  }

  if ((this.position.y + this.velocity.y) < -50) {
    this.position.y = HEIGHT;
  } else {
    this.position.y = (this.position.y + this.velocity.y) % HEIGHT;
  }
}