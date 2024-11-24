export class GameLogic {
  constructor(game) {
    this.game = game; // Get the game object from the scene
  }

  goal() {

    if(!this.game.isToxic){
      if (this.game.bonusFlag && !this.game.isToxic) {//Check to see if different color goal zone was hit
        this.game.goalCount += 1 + this.game.bonusScore;
      } else {
        this.game.goalCount++;
      }
    }else{
      if(this.game.goalCount > 0){
        this.game.goalCount--;
      }else{
        this.game.goalCount = 0;
      }
    }
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

    this.game.resetCount++;
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

  tryRemoveRat() {
    const ratsContainer = document.getElementById('rats-container');
    if (ratsContainer && ratsContainer.children.length > 0) {
      ratsContainer.removeChild(ratsContainer.children[0]);
      this.tryAddShermieSprite();
    } else {
    }
  }
  
}


export default GameLogic;
