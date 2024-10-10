export class GameLogic {
  constructor(game) {
    this.game = game;
  }

  win() {
    console.log("Win triggered.");
    this.game.winCount++;
    console.log(`Total Wins: ${this.game.winCount}`);
    this.gameReset();
  }

  loseLife() {
    if (this.game.lives > 1) {
      this.game.lives--;
      this.gameReset();
    } else {
      this.game.resetCount++;
      this.gameOver();
      this.game.lives = 3;
    }
    console.log("Lose life triggered. -> " + this.game.lives);
    this.game.livesText.setText(`Lives: ${this.game.lives}`);
  }

  gameOver() {
    console.log("Game Over!");
    this.game.scene.start("GameOver", {
      winCount: this.game.winCount,
      resetCount: this.game.resetCount,
    });
  }

  gameReset() {
    this.game.resetCount++;
    console.log(`Total Resets: ${this.game.resetCount}`);
    this.game.shermie.x = 415;
    this.game.shermie.y = 775;
  }
}

export default GameLogic;
