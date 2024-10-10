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

  gameReset() {
    this.game.resetCount++;
    console.log(`Total Resets: ${this.game.resetCount}`);
    this.game.shermie.x = 415;
    this.game.shermie.y = 775;
  }
}

export default GameLogic;
