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
    //hover effects for playButton
    playButton.on("pointerover", () => {
          playButton.setStyle({ backgroundColor: "#44AAFF" });
     });
    playButton.on("pointerout", () => {
          playButton.setStyle({ backgroundColor: "#3388FF" });
     });
    playButton.on("pointerdown", () => {
          playButton.setScale(0.9); // Scale down on click
     });
    playButton.on("pointerup", () => {
          playButton.setScale(1); // Scale back up
          this.scene.start("Game", { level: 1 }); // Start game scene
    });

    //hover effects for levelselectionButton
    levelSelectButton.on("pointerover", () => {
          levelSelectButton.setStyle({ backgroundColor: "#44AAFF" });
     });

    levelSelectButton.on("pointerout", () => {
          levelSelectButton.setStyle({ backgroundColor: "#3388FF" });
     });

    levelSelectButton.on("pointerdown", () => {
          levelSelectButton.setScale(0.9); // Scale down on click
     });

    levelSelectButton.on("pointerup", () => {
          levelSelectButton.setScale(1); // Scale back up
          this.scene.start("LevelMenu"); // Start level select scene
     });
   }
    

}
