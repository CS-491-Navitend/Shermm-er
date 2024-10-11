export class GameLogic {
  constructor(game) {
    this.game = game;
  }

  win() {
    console.log(`Win condition met. Wins: ${this.game.winCount}`);
    this.game.winCount++;
    this.gameReset();
  }

  loseLife() {
    console.log("Lose life condition met. Lives:", this.game.lives);
    // this.game.livesText.changeText(`Lives: ${this.game.lives}`);

    if (this.game.lives > 1) {
      this.game.lives -= 1;
      this.gameReset();
    } else {
      this.game.resetCount += 1;
      this.gameOver();
      this.game.lives = 3;
    }
  }

  gameOver() {
    console.log("Starting game over scene");
    this.game.scene.start("GameOver", {
      game: this.game,
    });
  }

  gameReset() {
    console.log("Resetting game");
    this.game.resetCount++;
    this.game.shermie.x = this.game.width / 2;
    this.game.shermie.y = this.game.height - this.game.safeZoneSize + this.game.moveDistance / 2;
  }
}

export default GameLogic;
