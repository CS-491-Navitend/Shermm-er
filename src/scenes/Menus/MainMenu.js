import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");

    this.fontFamily = "sans-serif";
    this.rem = 16;
  }

  create() {
    // main menu text
    this.add
      .text(512, 200, "Shermm-er", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 4 + "px",
      })
      .setOrigin(1 / 2);

    // create a play button
    const playButton = this.add
      .text(512, 400, "Play", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        padding: { x: 100, y: 20 },

        backgroundColor: "#3388FF",
      })
      .setOrigin(1 / 2)
      .setInteractive({ useHandCursor: true });

    const levelSelectButton = this.add
      .text(512, 500, "Level Select", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        padding: {x: 100, y: 20 },

        backgroundColor: "#3388FF",
      })
      .setOrigin(1 / 2)
      .setInteractive({ useHandCursor: true });

    // listeners

    // play button on click
    playButton.on("pointerdown", () => {
      // alert("play the highest available level");
      this.scene.start("Game", { level: 1 });
    });

    // level select button on click
    levelSelectButton.on("pointerdown", () => {
      this.scene.start("LevelMenu");
    });
  }
}
