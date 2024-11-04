import { Scene } from 'phaser';
import { GameLogic } from "/src/lib/GameLogic";


export class GameWin extends Scene {
  constructor() {
    super("GameWin");
  }

  create(data) {
    document.getElementById('ui-bar').style.display = 'none';
    const gameLogic = new GameLogic(data["game"]);
    // Display win message
    this.add.text(data["game"].width / 2, 250, "You Win!", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    // Display win count
    this.add.text(data["game"].width / 2, 300, `Wins: ${data["game"].winCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    // Display resets count
    this.add.text(data["game"].width / 2, 350, `Resets: ${data["game"].resetCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    // Option to go back to the main menu or restart
    this.add.text(data["game"].width / 2, 400, "Press R to go to the next level", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
    this.add.text(data["game"].width / 2, 450, "Press M for Main Menu", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    // Restart the game on 'R' key press
    this.input.keyboard.on("keydown-R", () => {
      this.scene.stop("GameWin");
      gameLogic.nextLevel();

    });

    // Go to main menu on 'M' key press
    this.input.keyboard.on("keydown-M", () => {
      this.scene.start("MainMenu");
    });
  }
}