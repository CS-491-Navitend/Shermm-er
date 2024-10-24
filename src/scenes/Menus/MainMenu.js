import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");

    this.fontFamily = "sans-serif";
    this.rem = 16;
  }

  create() {
    // Main menu text
    this.add
      .text(512, 200, "Shermm-er", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 4 + "px",
      })
      .setOrigin(0.5);

    // Create play button
    const playButton = this.createButton(512, 400, "Play", () => {
      this.scene.start("Game", { level: 1 });
      console.log("Starting level 1");
    });

    // Create level select button
    const levelSelectButton = this.createButton(512, 500, "Level Select", () => {
      this.scene.start("LevelMenu");
      console.log("Starting level select");
    });

    // Adding hover and click effects
    this.addButtonListeners(playButton);
    this.addButtonListeners(levelSelectButton);
  }

  createButton(x, y, text, onClick) {
    return this.add
      .text(x, y, text, {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        padding: { x: 100, y: 20 },
        backgroundColor: "#3388FF",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", onClick);
  }

  addButtonListeners(button) {
    button.on("pointerover", () => {
      button.setStyle({ backgroundColor: "#44AAFF" });
      //console.log(`Hovering over ${button.text}`);
    });

    button.on("pointerout", () => {
      button.setStyle({ backgroundColor: "#3388FF" });
      //console.log(`Stopping over ${button.text}`);
    });

    button.on("pointerdown", () => {
      button.setScale(0.9); // Scale down on click
      //console.log(`${button.text} button pressed down`);
    });

    button.on("pointerup", () => {
      button.setScale(1); // Scale back up
      //onsole.log(`${button.text} button released`);
    });
  }
}
