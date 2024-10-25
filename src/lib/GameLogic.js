export class GameLogic {
  constructor(game) {
    this.game = game;
  }

  goal() {
    this.game.goalCount++;
    if(this.game.goalCount != this.game.getAdvanceNumber()) {
      console.log("Goals Hit: ", this.game.goalCount);
      this.resetPlayer();
    }
    else{
      this.win();
    }
  }

  win() {
    this.game.winCount++;
    console.log(`Win condition met. Wins: ${this.game.winCount}`);
    this.nextLevel();
  }

  loseLife() {
    if (this.game.lives > 1) {
      this.game.lives -= 1;
      console.log("Lose life. Lives:", this.game.lives);
      this.resetPlayer();
    } else {
      this.game.lives -= 1;
      console.log("Lose life. Lives:", this.game.lives);
      this.game.resetCount += 1;
      this.gameOver();
      this.game.lives = 3;
    }

    this.game.livesText.setText(`Lives: ${this.game.lives}`);
  }

  gameOver() {
    console.log("Starting game over scene");
    this.game.playing = false;
    this.game.scene.start("GameOver", {
      game: this.game,
    });
  }

  resetPlayer() {
    console.log("Resetting player");
    this.game.shermie.setVelocity(0, 0);
    this.game.resetCount++;
    this.game.shermie.x = this.game.width / 2;
    this.game.shermie.y = this.game.height - this.game.safeZoneSize + this.game.moveDistance / 2;
  }

  nextLevel(){
    console.log("Starting next level");
    this.game.goalCount = 0;
    this.game.level += 1;
    if (this.game.level < this.game.getNumberOfLevels()) {
      this.game.scene.start("Game", { level: this.game.level });
    } else {
      this.game.scene.start("MainMenu");
    }
  }
}

export default GameLogic;
