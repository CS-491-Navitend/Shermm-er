export class GameLogic {
  constructor(game) {
    this.game = game;
  }

  win() {
    console.log(`Win condition met. Wins: ${this.game.winCount}`);
    this.game.winCount++;
    this.resetPlayer();
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
}

export default GameLogic;
