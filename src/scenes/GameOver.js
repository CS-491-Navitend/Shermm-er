import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create(data) {
    this.add.text(data["game"].width / 2, 250, "Game Over!", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.add.text(data["game"].width / 2, 300, `Wins: ${data["game"].winCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.add.text(data["game"].width / 2, 350, `Resets: ${data["game"].resetCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.add.text(data["game"].width / 2, 400, "Press R to restart", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
    this.add.text(data["game"].width / 2, 450, "Press M for Main Menu", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("Game", { level: data["game"].level });
    });
    
        // Go to main menu on 'M' key press
    this.input.keyboard.on("keydown-M", () => {
      this.scene.start("MainMenu");
    });
  }
}
