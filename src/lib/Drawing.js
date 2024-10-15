export class Drawing {
  constructor(game) {
    this.game = game;
  }

  drawDashedLine(graphics, x1, y1, x2, y2, dashLength, gapLength) {
    let x = x1;
    const step = dashLength + gapLength;

    while (x < x2) {
      graphics.strokeLineShape(new Phaser.Geom.Line(x, y1, x + dashLength, y2));
      x += step;
    }
  }
}

export default Drawing;
