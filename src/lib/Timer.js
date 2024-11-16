export class Timer {
  constructor(game) {
    this.game = game;
    this.isPaused = false;
    this.timeRemaining = 0;
    this.timerEvent = null;
  }

  update() {
    if (this.isPaused) {
      // console.log("Timer is paused. Skipping update.");
      return;
    }

    // console.log("Updating Timer.."); // for debugging

    this.timeRemaining -= 1;
    if (this.timeRemaining <= 0) {
      this.stop();
      this.game.gameLogic.gameOver();
    }

    if (this.game.timerText) {
      this.game.timerText.setText(`Time: ${this.timeRemaining}`); // Update the timer text on the screen
    }

    const timeElement = document.getElementById("time");
    if (timeElement) {
        timeElement.innerText = `Time: ${this.timeRemaining}`;
    }

    if(this.timeRemaining % 3 == 0){//Sink and raise turtles every 3 seconds
      if(this.game.turtlesAreSunk == false){
        // console.log("Sinking turtles");
        this.game.sinkTurtles();
      }
      else if (this.game.turtlesAreSunk == true){
        // console.log("Raising turtles");
        this.game.raiseTurtles();
      }
    }
  }

  start() {
    this.stop();
    this.timeRemaining = this.game.timeRemaining;

    this.timerEvent = this.game.time.addEvent({
      delay: 1000, // 1 second
      callback: this.update.bind(this), // Update the timer
      loop: true, // Loop indefinitely
    });
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false; // Reset the paused state
    }
    // else do nothing (the timer is already running)
  }
  stop() {
    if (this.timerEvent) {
      this.timerEvent.remove(); // Remove the timer event
      this.timerEvent = null; // Clear the reference
    }
    this.isPaused = false;
  }
}

export default Timer;
