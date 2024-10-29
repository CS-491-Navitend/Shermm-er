export class Timer {
  constructor(game) {
    this.game = game;
    this.isPaused = false;
    this.timeRemaining = 0;
    this.timerEvent = null;
  }

  updateTimer() {
    //console.log("Updating Timer..")
    this.timeRemaining -= 1;
      if (this.timeRemaining <= 0) {
      this.stop();
      this.game.gameLogic.gameOver();
    }
    if(this.game.timerText){
        this.game.timerText.setText(`Time: ${this.timeRemaining}`);
    }
  }


  startTimer() {
    //console.log(`isPaused: ${this.isPaused}, timeRemaining: ${this.game.timeRemaining}, playing: ${this.game.playing}`);
    this.stop();
    this.timeRemaining = this.game.timeRemaining;
    //console.log(this.timeRemaining);
    this.timerEvent = this.game.time.addEvent({
        delay: 1000,
        callback: () => {
            if (!this.isPaused && this.timeRemaining > 0) {
                this.updateTimer();
            } 
            
        },
        loop: true
    });
  }

   pause() {
       this.isPaused = true;
       
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false; // Reset the paused state
        }
    }
    stop() {
        if (this.timerEvent) {
            this.timerEvent.remove(); 
            this.timerEvent = null; // Clear the reference
        }
        this.isPaused = false;
    }
}

export default Timer;
