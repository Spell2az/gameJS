export default class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(30, 0);
    ctx.lineTo(30, 30);
    ctx.lineTo(0, 30);
    ctx.closePath();
    ctx.stroke();
  }
}