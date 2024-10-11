import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.winCount = data.winCount || 0;
    this.resetCount = data.resetCount || 0;
  }

  create(data) {
    this.add.text(data["game"].width / 2, 250, "Game Over!", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.add.text(data["game"].width / 2, 300, `Wins: ${data["game"].winCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.add.text(data["game"].width / 2, 350, `Resets: ${data["game"].resetCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.add.text(data["game"].width / 2, 400, "Press R to restart", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("Game");
    });
  }
}
