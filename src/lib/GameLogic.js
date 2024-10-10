export class GameLogic {
  constructor(shermie) {
    this.shermie = shermie;
    this.winCount = 0;
  }

  win() {
    console.log("Win triggered.");
    this.winCount++;
    console.log(`Total Wins: ${this.winCount - 1}`);
    this.reset();
  }

  reset() {
    this.resetCount++;
    console.log(`Total Resets: ${this.resetCount - 1}`);
    // this.shermie.x = 415;
    // this.shermie.y = 775;
  }
}

export default GameLogic;
