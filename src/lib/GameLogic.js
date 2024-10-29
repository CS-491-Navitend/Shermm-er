export class GameLogic {
  constructor(game) {
    this.game = game; // Get the game object from the scene
  }

  goal() {
    this.game.goalCount++;
    if (this.game.goalCount !== 5) {
      console.log(`5 goals not met. Goals: ${this.game.goalCount}`);
      this.resetPlayer();
    } else {
      console.log(`Goal condition met. Goals: ${this.game.goalCount}`);
      this.resetPlayer();
    }
  }

  win() {
    this.game.winCount++;
    console.log(`Win condition met. Wins: ${this.game.winCount}`);
    this.resetPlayer();
  }

  loseLife() {
    this.game.lives--;
    console.log("Lost a life. Lives:", this.game.lives);
    if (this.game.lives < 1) {
      // this.game.resetCount++;
      this.gameOver();
      this.game.lives = 3;
    }
    this.resetPlayer();
    this.game.livesText.setText(`Lives: ${this.game.lives}`);
  }

  gameOver() {
    console.log("Starting game over scene");
    this.game.playing = false;
    this.game.scene.start("GameOver", { game: this.game });
  }

  resetPlayer() {
    console.log("Resetting player");
    this.game.shermie.setVelocity(0, 0);
    this.game.resetCount++;
    this.game.shermie.x = this.game.width / 2;
    this.game.shermie.y = this.game.height - this.game.safeZoneSize + this.game.moveDistance / 2;

    this.game.invinsible = false;
  }
}

export default GameLogic;
