const WIDTH = 800;
const HEIGHT = 600;

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
  
window.addEventListener("keydown", keyDownEventHandler);
window.addEventListener("keyup", keyUpEventHandler);
  
  function keyDownEventHandler(e) {
    
    if (e.keyCode == 87) {
      player.setThrust(true);
    }
    else if (e.keyCode == 65) {
      player.decreaseAngleVelocity();
    }
    else if (e.keyCode == 68) {
      player.increaseAngleVelocity();
    }
    else if (e.code == "Space"){
       console.table(player.pos)
    }
  }
    
  function keyUpEventHandler(e) {
    if (e.keyCode == 87) {
      player.setThrust(false);
    } else if (e.keyCode == 65) {
      player.increaseAngleVelocity();
    } else if (e.keyCode == 68) {
      player.decreaseAngleVelocity();
  }
  
}
}

