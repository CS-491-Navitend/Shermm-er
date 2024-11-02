import { Scene } from "phaser";
import { levels } from "/src/lib/levels";

export class LevelMenu extends Scene {
  constructor() {
    super("LevelMenu");

    this.fontFamily = "sans-serif";
    this.rem = 16;

    this.numberOfLevels = levels.length - 1; // -1 for dev level
    this.maxCols = 3;
    this.maxRows = Math.ceil(this.numberOfLevels / this.maxCols);
    this.buttons = [];
    this.selectedButtonIndex = 0;
    this.isActive = false;
  }

  create(buttons) {
    // main menu text

    this.isActive = true;
    this.destroyButtons();
    //console.log("Data received: ", buttons);
    this.add
      .text(512, 200, "Level Select", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 4 + "px",
      })
      .setOrigin(1 / 2);

    //Developer Button
    this.createDevButton();

    //Create level Buttons
    this.createLevelButtons();

    //Keyboard inputs for naviagtion

    this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
    this.input.keyboard.on("keydown-RIGHT", () => this.changeSelection(2));
    this.input.keyboard.on("keydown-LEFT", () => this.changeSelection(-2));
    this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
    this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());

    //console.log("Current buttons array after creation: ", this.buttons);
    this.highlightButton(this.selectedButtonIndex);
  }

  createDevButton() {
    const developerButton = this.add
      .text(512, 100, "Dev", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        padding: { x: 100, y: 20 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    developerButton.on("pointerdown", () => {
      // pass the level to the game scene constructor
      this.scene.start("Game", { level: 0 });
    });
  }

  createLevelButtons() {
    for (let col = 0; col < this.maxCols; col++) {
      for (let row = 0; row < this.maxRows; row++) {
        const levelNumber = col * this.maxRows + row + 1;

        // Check if the level exists
        if (levelNumber > this.numberOfLevels) {
          break;
        }

        this.createLevelButton(col, row, levelNumber);
      }
    }
  }

  createLevelButton(col, row, levelNumber) {
    const levelButton = this.add
      .text(300 + col * 200, 300 + (row + 1) * 50, `Level ${levelNumber}`, {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        backgroundColor: "#3388FF",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    const levelButtonIndex = this.buttons.length;

    //when mouse hover over
    levelButton.on("pointerover", () => {
      // Ensure correct index on hover
      if (this.selectedButtonIndex !== levelButtonIndex) {
        this.highlightButton(this.selectedButtonIndex, false); // Clear the old highlight
        this.selectedButtonIndex = levelButtonIndex; // Update to the new index
        this.highlightButton(levelButtonIndex); // Highlight the new button
      }
    });

    //when mouse hover out
    levelButton.on("pointerout", () => {
      if (this.selectedButtonIndex !== levelButtonIndex) {
        this.highlightButton(levelButtonIndex, false);
      }
    });

    //when mouse select
    levelButton.on("pointerdown", () => {
      this.selectedButtonIndex = levelButtonIndex;
      this.highlightButton(this.selectedButtonIndex);
      this.scene.start("Game", { level: levelNumber });
    });

    // Add the button to the buttons array
    this.buttons.push(levelButton);
    //console.log("Creating button: ", `Level ${levelNumber}`);
  }

  changeSelection(direction) {
    // Highlight the currently selected button
    this.highlightButton(this.selectedButtonIndex, false);

    // Update the selected button index
    this.selectedButtonIndex += direction;

    // Wrap around if needed
    if (this.selectedButtonIndex < 0) {
      this.selectedButtonIndex = this.buttons.length - 1;
    } else if (this.selectedButtonIndex >= this.buttons.length) {
      this.selectedButtonIndex = 0;
    }

    // Highlight the new selection
    this.highlightButton(this.selectedButtonIndex);
  }

  highlightButton(index, highlight = true) {
    if (index < 0 || index >= this.buttons.length) {
      console.warn("Index out of bounds for highlighting button:", index);
      return; // Exit if index is invalid
    }

    const button = this.buttons[index];
    button.setStyle({ backgroundColor: highlight ? "#44AAFF" : "#3388FF" });
  }

  confirmSelection() {
    //const selectedButton = this.buttons[this.selectedButtonIndex];
    const levelNumber = this.selectedButtonIndex + 1; // Adjust for level number
    this.scene.start("Game", { level: levelNumber });
  }
  destroyButtons() {
    if (this.buttons.length > 0) {
      //console.log("Destorying Buttons...")
      this.buttons.forEach((button) => {
        button.off("pointerdown");
        button.off("pointerover");
        button.off("pointerout");
        button.destroy();
        //console.log("Button destroyed: ", button.text);
      });
      this.buttons = [];
      this.input.keyboard.removeAllListeners();
    }
  }
}
