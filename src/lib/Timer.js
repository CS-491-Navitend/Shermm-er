export class Timer {
  constructor(game) {
    this.game = game;
  }

  updateTimer() {
    this.game.timeRemaining--;
    if (this.game.timeRemaining <= 0) {
      this.game.timerEvent.remove();
      this.game.gameLogic.gameOver();
    }
    this.game.timerText.setText(`Time: ${this.game.timeRemaining}`);
  }
  startTimer() {
    this.game.timeRemaining = this.game.timerDuration; // Reset the timer
    this.game.timerText.setText(`Time: ${this.game.timeRemaining}`); // Display initial time
    this.game.timerEvent = this.game.time.addEvent({ delay: 1000, callback: this.updateTimer(), callbackScope: this, loop: true });
  }
}

export default Timer;
