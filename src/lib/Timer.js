export class Timer {
  constructor(game) {
    this.game = game;
    this.timer = null;
    this.isPaused = false;
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
      if (this.isPaused|| this.game.timeRemaining <= 0 || !this.game.playing) {
        // stop timer
        clearInterval(this.timer);
        return;
      }

      if (this.game.playing) {
        this.updateTimer();
      }
    }, 1000);
    }
   pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

export default Timer;
