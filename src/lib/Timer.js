export class Timer {
  constructor(game) {
    this.game = game;
    this.isPaused = false;
    this.timeRemaining = 0;
    this.timerEvent = null;
    this.bombTimerEvent = null; // Bomb timer event
    this.bombTimerPaused = false; 
    this.currentBlockCount = 0;
  }

  update() {
    if (this.isPaused) {
      return;
    }

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
        this.game.sinkTurtles();
      }
      else if (this.game.turtlesAreSunk == true){
        this.game.raiseTurtles();
      }
    }

    //this chance needs to be a variable obtained from the json
    if (this.timeRemaining % 5 === 0) {
      const chance = Math.random();
      if (chance > this.game.queueChance) { 
          this.game.gameLogic.tryAddShermieSprite();
      }
    }

    if(this.timeRemaining % 5 ===0){
      const chance = Math.random();
      if(chance > this.game.removeRatChance){
        this.game.gameLogic.tryRemoveRat();
      }
    }
  //Blocker generation code
  // Ensure the block group is initialized
  // if (!this.block) {
  //   this.block = this.game.physics.add.staticGroup();
  //   console.log("Block group initialized in Timer.js");
  // }

  // // Proceed with blocker generation
  // if (this.timeRemaining % 2 === 0) {
  //   if (this.currentBlockCount < this.game.max_block) {
  //     const zones = this.game.objectiveZone.getChildren(); // Get goal zone coordinates
  //     if (zones.length > 0) {
  //       const eligibleZones = zones.filter(zone => !zone.getData("color")); // Check if zone is colored
  //       if (eligibleZones.length > 0) {
  //         const randomZone = Phaser.Utils.Array.GetRandom(eligibleZones); // Randomly pick a valid zone

  //         const newBlock = this.game.add.sprite(randomZone.x, randomZone.y, "goalBlock"); // Generate new blocker object
  //         newBlock.setDepth(10); // Set render depth above all else
  //         this.currentBlockCount++; // Increment blocker count

  //         this.game.physics.add.existing(newBlock, true);
  //         this.block.add(newBlock); // Add to blocker group

  //         this.game.time.delayedCall(5000, () => {
  //           if (newBlock) {
  //             newBlock.destroy();
  //             this.currentBlockCount--; // Destroy blocker every 5 seconds and update blocker count
  //           }
  //         });
  //       }
  //     }
  //   }
  // }
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
      if (this.bombTimerEvent) {
          this.pauseBombTimer();
      }
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false; // Reset the paused state
      if (this.bombTimerEvent && this.bombTimerPaused) {
      this.resumeBombTimer();
       }
    }
    // else do nothing (the timer is already running)
  }
  stop() {
    if (this.timerEvent) {
      this.timerEvent.remove(); // Remove the timer event
      this.timerEvent = null; 
    }
    this.isPaused = false;
  }
  getBomb(shermie) {
    if (this.game.isBomb) {
      // Initialize the bomb timer value
      shermie.setData("timer", this.game.bombTimer);

      // Remove any existing bomb timer event
      if (this.bombTimerEvent) {
        this.bombTimerEvent.remove();
        this.bombTimerEvent = null;
      }

      // Create the new bomb timer event
      this.bombTimerEvent = this.game.time.addEvent({
        delay: 1000, // 1 second delay
        callback: () => {
          if (this.bombTimerPaused) return; // Skip if the bomb timer is paused

          // Update the bomb timer
          let remainingTime = Math.max(0, shermie.getData("timer") - 1000);
          shermie.setData("timer", remainingTime);

          // Update the bomb timer UI
          const bombTimerUI = document.getElementById("bomb-timer");
          if (bombTimerUI) {
            bombTimerUI.innerText = `Bomb Timer: ${remainingTime / 1000}`;
          }

          // Check if the bomb has exploded
          if (remainingTime <= 0) {
            this.game.gameLogic.gameOver();
            if (bombTimerUI) {
              bombTimerUI.style.display = "none"; // Hide the timer UI after explosion
            }
          }
        },
        loop: true, 
      });
    }
  }
  pauseBombTimer() {
    this.bombTimerPaused = true;
  }
  resumeBombTimer() {
    this.bombTimerPaused = false;
  }

    
    stopBombTimer() {
        if (this.bombTimerEvent) {
            this.bombTimerEvent.remove(); // Stop the bomb timer event
            this.bombTimerEvent = null; // Clear the reference
        }
        this.bombTimerPaused = false;
    }
    
    getBlockGroup() {
      return this.block;
    }
}

export default Timer;
