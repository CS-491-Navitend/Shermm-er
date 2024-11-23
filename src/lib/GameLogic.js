export class GameLogic {
  constructor(game) {
    this.game = game; // Get the game object from the scene
  }

  goal() {
    
    if (this.game.bonusFlag) {//Check to see if different color goal zone was hit
      this.game.goalCount += 1 + this.game.bonusScore;
    } else {
      this.game.goalCount++;
    }
    
    console.log("Goal count: ", this.game.goalCount)
    console.log("Advance number: ",this.game.advanceNumber)

    if(this.game.goalCount < this.game.advanceNumber) {
      this.resetPlayer();
    }
    else{
      this.win();
    }
    
    this.tryRemoveShermieSprite();
  }

  win() {
    this.game.winCount++;
    this.game.scene.start("GameWin", { game: this.game });
  }

  loseLife() {
    this.game.lives--;
    this.game.updateLives(); // Update UI after life decrement

    if (this.game.lives < 1) {
        this.gameOver();
        this.game.lives = 3;
    }
    this.resetPlayer();
}

  gameOver() {
    this.game.goalCount=0;
    this.game.playing = false;
    this.game.scene.start("GameOver", { game: this.game });
    
  }

  resetPlayer() {
    this.isInvincible = false;
    this.isAnimating = false;
    this.game.shermie.setVelocity(0, 0);
    this.game.resetCount++;
    this.game.shermie.x = this.game.width / 2;
    this.game.shermie.y = this.game.height - this.game.safeZoneSize + this.game.moveDistance / 2;
  }

  tryAddShermieSprite() {
    // Check if there's room to add another sprite
    if (this.game.spritePlacementX < 0) {
        this.gameOver();
        return;
    }
    this.newShermie = this.game.add.sprite(this.game.spritePlacementX, this.game.boundarySpriteTexture.y, 'shermie');
    this.newShermie.setDisplaySize(this.game.shermie.width, this.game.shermie.height);
    this.game.spritePlacementX -= this.game.shermie.width; // Move position left for next sprite
  }

  tryRemoveShermieSprite() {
    // Check if there are any sprites to remove
    if (this.shermieSprites != this.game.boundarySpriteTexture.x + this.game.boundarySpriteTexture.displayWidth / 2 - this.game.shermie.width) {
        if (this.newShermie) {
            this.newShermie.destroy(); 
            if( this.game.spritePlacementX < this.game.boundarySpriteTexture.x + this.game.boundarySpriteTexture.displayWidth / 2 - this.game.shermie.width){
              this.game.spritePlacementX += this.game.shermie.width;
            }
        } 
    } else {
        return;
    }
}

  nextLevel(){
    this.game.goalCount = 0;
    this.game.level += 1;
    if (this.game.level < this.game.getNumberOfLevels()) {
      this.game.scene.start("Game", { level: this.game.level });
    } else {
      this.game.scene.start("Credits");
    }
  }

  
  spawnGoalZoneBlock() {
    const spawnChance = Math.random();
    if (spawnChance < this.block_percentage) { // per level block percentage
      let goalBlock = Math.floor(Math.random() * this.numOfGoals);
      let goalBlockX = goalBlock * this.width / this.numOfGoals;
      let goalBlockY = 45;
      let goalBlockWidth = 80;
      let goalBlockHeight = 75;
      const minX = 200;
      const maxX = 800;
      goalBlockX = Math.max(minX, Math.min(maxX, goalBlockX));

      // if filledgoal group exists then dont spawn block // This needs to be changed with the color coding 
      if (this.physics.overlap(this.shermie, this.filledGoals)) {
        return;
      }

      let block = this.add.image(goalBlockX, goalBlockY, 'goalBlock').setDisplaySize(goalBlockWidth, goalBlockHeight);
      this.physics.add.existing(block, true);
      block.setDepth(5);

      // if shermie runs into an existing block, lose a life
      this.physics.add.overlap(this.shermie, block, () => {
        console.log('Hit goal block')
        this.loseLife();
      });

      // remove the block after 5 seconds 
      this.time.addEvent({ delay: 10000, callback: () => { block.destroy(); }, callbackScope: this, loop: false });
    }
  }
}


export default GameLogic;
