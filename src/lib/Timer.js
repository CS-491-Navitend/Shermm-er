export class Timer {
  constructor(game) {
    this.game = game;
    this.timer = null;
  }

  updateTimer() {
    this.game.timeRemaining -= 1;
    if (this.game.timeRemaining <= 0) {
      this.game.gameLogic.gameOver();
    }
    this.game.timerText.setText(`Time: ${this.game.timeRemaining}`);
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.game.timeRemaining <= 0 || !this.game.playing) {
        // stop timer
        clearInterval(this.timer);
        return;
      }

      if (this.game.playing) {
        this.updateTimer();
      }
    }, 1000);
  }
}

export default Timer;
