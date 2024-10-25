export class Timer {
  constructor(game) {
    this.game = game;
  }

  update() {
    if (this.game.playing && this.game.timeRemaining > 0 && !this.game.paused) {
      this.game.timeRemaining -= 1;
      if (this.game.timeRemaining <= 0) {
        this.game.gameLogic.gameOver();
      }
      this.game.timerText.setText(`Time: ${this.game.timeRemaining}`);
    }
  }

  start() {
    this.stop();
    this.id = setInterval(this.update.bind(this), 1000);
  }

  stop() {
    clearInterval(this.id);
  }
}

export default Timer;
