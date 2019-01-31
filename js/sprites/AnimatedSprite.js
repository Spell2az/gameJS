class AnimatedSprite{
  constructor(img, position, frameRate, frameSize, numFrames){
    this.img = img;
    this.position = position;
    this.frameRate = frameRate;
    this.frameSize = frameSize;
    this.numFrames = numFrames;
    this.frames = 0
    this.currentFrame = 0;
    this.finished = false
  }
}


AnimatedSprite.prototype.draw = function(ctx) {
  if(!this.finished){
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.scale(1.5, 1.5)
    // Displays correct portion of the sprite sheet
    ctx.drawImage(this.img, this.currentFrame * this.frameSize, 0, this.frameSize, this.frameSize, -this.frameSize/2, -this.frameSize/2, this.frameSize, this.frameSize);
    ctx.restore();
  }
  
  this.update();
}
// Cycle through SpriteSheet until all frames were covered then its finished
AnimatedSprite.prototype.update = function () {
  if(this.currentFrame >= this.numFrames){
    this.finished = true;
  } else {
    this.frames++;
    if (this.frames > this.frameRate) {
      this.currentFrame++
      this.frames = 0;
    }
  }
  
}