window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  
  drawFrame();

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    x++;

    window.requestAnimationFrame(drawFrame);
    
  }

  function draw() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(30, 0);
    ctx.lineTo(30, 30);
    ctx.lineTo(0, 30);
    ctx.closePath();
    ctx.stroke();
  }
  
}