import { Scene } from "phaser";

export class LevelMenu extends Scene {
  constructor() {
    super("LevelMenu");

    this.fontFamily = "sans-serif";
    this.rem = 16;

    this.numberOfLevels = 6;
    this.maxCols = 3;
    this.maxRows = Math.ceil(this.numberOfLevels / this.maxCols);
  }

  create() {
    // main menu text
    this.add
      .text(512, 200, "Level Select", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 4 + "px",
      })
      .setOrigin(1 / 2);

    // create level buttons (max of 3 cols)
    for (let col = 0; col < this.maxCols; col++) {
      //
      for (
        let row = 0;
        row < Math.ceil(this.numberOfLevels / this.maxCols);
        row++
      ) {
        // calculate level number
        const levelNumber = col * this.maxRows + row + 1;

        // check if level exists
        if (levelNumber > this.numberOfLevels) {
          break;
        }

        // create a the button
        this.add
          .text(300 + col * 200, 300 + (row + 1) * 50, `Level ${levelNumber}`, {
            fontFamily: this.fontFamily,
            fontStyle: "bold",
            fontSize: this.rem * 2 + "px",
            // padding: { x: 100, y: 20 },

            backgroundColor: "#3388FF",
          })
          .setOrigin(1 / 2)
          .setInteractive({ useHandCursor: true });
      }
    }
  }
}
