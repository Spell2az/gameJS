

window.onload = () => {

  const canvas = document.getElementById('canvas');
  
  const ctx = canvas.getContext('2d');
  console.log(ctx)
  const player = new Player(0, 0);
  let x = 0, y = 0;
 
  drawFrame();

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     
    draw();
   player.x += 1;
    window.requestAnimationFrame(drawFrame);
    
  }
  
  
  function draw() {
    
    player.draw(ctx);
    //square.draw(ctx);
    // ctx.translate(50, 50);
    // ctx.fillRect(0,0,100,100);
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // const path = new Path2D('M 100,100 h 50 v 50 h 50');
    // ctx.rotate(30 * Math.PI / 180);
    // ctx.stroke(path);
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // const path1 = new Path2D(`M 50,50 h 50 v 50 h 50`);
    // ctx.rotate(40 * Math.PI / 180);
    // //ctx.translate(x, 50);
    // ctx.stroke(path1);
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    
    
  }
  
}