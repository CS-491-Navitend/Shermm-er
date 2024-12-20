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
    //background
    this.add.image(512, 384, "background").setOrigin(0.5, 0.5);

    this.backgroundMusic = this.sound.add("backgroundMusic", {
      volume: 0.25,
      loop: true,
    });

    this.isActive = true;
    this.destroyButtons();
    //console.log("Data received: ", buttons);
    this.add
      .text(512, 200, "Level Select", {
        fontFamily: "Pixel",
        fontStyle: "bold",
        fontSize: this.rem * 4 + "px",
        color: "#FFFFFF", // White text
        stroke: "#000000", // Black outline
        strokeThickness: 6,
      })
      .setOrigin(1 / 2);

    //Developer Button
    this.createDevButton();

    //Create level Buttons
    this.createLevelButtons();

    //Back Button

    this.createBackButton();

    //Keyboard inputs for naviagtion

    this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
    //this.input.keyboard.on("keydown-RIGHT", () => this.changeSelection(2));
    //this.input.keyboard.on("keydown-LEFT", () => this.changeSelection(-2));
    this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
    this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());

    //console.log("Current buttons array after creation: ", this.buttons);
    this.highlightButton(this.selectedButtonIndex);
  }

  createDevButton() {
    const developerButton = this.add
      .text(512, 100, "Dev", {
        fontFamily: "Pixel",
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        padding: { x: 100, y: 20 },
        color: "#FFFFFF", // White text
        stroke: "#000000", // Black outline
        strokeThickness: 6,
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
        const levelNumber = col * this.maxCols + row + 1;

        // Check if the level exists
        if (levelNumber > this.numberOfLevels) {
          break;
        }

        this.createLevelButton(row, col, levelNumber);
      }
    }
  }

  createLevelButton(col, row, levelNumber) {
      const buttonImage = this.add
      .image(500 + (col - Math.floor(this.maxCols / 2)) * 300, 300 + (row + 1) * 100, "buttonImage")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

      buttonImage.setDisplaySize(250, 60);

      const levelText = this.add
      .text(500 + (col - Math.floor(this.maxCols / 2)) * 300, 300 + (row + 1) * 100, `Level ${levelNumber}`, {
        fontFamily: "Pixel",
        fontStyle: "bold",
        //padding: { x: 20, y: 10 },
        fontSize: this.rem * 2 + "px",
        //backgroundColor: "#3388FF",
        color: "#FFFFFF", // White text
        stroke: "#000000"
      })
      .setOrigin(1 / 2)
      

    const levelButtonIndex = this.buttons.length;

    //when mouse hover over
    buttonImage.on("pointerover", () => {
      // Ensure correct index on hover
      if (this.selectedButtonIndex !== levelButtonIndex) {
        this.highlightButton(this.selectedButtonIndex, false); // Clear the old highlight
        this.selectedButtonIndex = levelButtonIndex; // Update to the new index
        this.highlightButton(levelButtonIndex); // Highlight the new button
      }
    });

    //when mouse hover out
    buttonImage.on("pointerout", () => {
      if (this.selectedButtonIndex !== levelButtonIndex) {
        this.highlightButton(levelButtonIndex, false);
      }
    });

    //when mouse select
    buttonImage.on("pointerdown", () => {
      // console.log("Starting level: ", levelNumber);
      this.backgroundMusic.play();
      this.selectedButtonIndex = levelButtonIndex;
      this.highlightButton(this.selectedButtonIndex);
      this.scene.start("TutorialMenu", { level: levelNumber });
    });

    // Add the button to the buttons array
      this.buttons.push({image: buttonImage, text: levelText});
    //console.log("Creating button: ", `Level ${levelNumber}`);
  }

  createBackButton() {

    const backButtonImage = this.add
    .image(500, 750, "buttonImage")
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

     backButtonImage.setDisplaySize(250, 80);

    const backText = this.add
      .text(500, 750, "Back", {
        fontFamily: "Pixel",
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        //padding: { x: 20, y: 10 },
        //backgroundColor: "#3388FF",
        color: "#FFFFFF", // White text
        stroke: "#000000"
      })
      .setOrigin(0.5)
   

    backButtonImage.on("pointerdown", () => {
      this.scene.stop("LevelMenu");
      this.scene.start("MainMenu");
    });

    // add hover effects
    backButtonImage.on("pointerover", () => {
        this.highlightButton(this.buttons.length - 1, true);
    });

    backButtonImage.on("pointerout", () => {
       this.highlightButton(this.buttons.length - 1, false); // Remove highlight
    });
      this.buttons.push({image: backButtonImage , text: backText});
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
    const tint = highlight ? 0x44AAFF : 0xFFFFFF;  // Change to blue for highlight
    button.image.setTint(tint);

    button.text.setColor(highlight ? "#FFD700" : "#FFFFFF");
  }

  confirmSelection() {
    //const selectedButton = this.buttons[this.selectedButtonIndex];
    const levelNumber = this.selectedButtonIndex + 1; // Adjust for level number
    if (this.selectedButtonIndex === this.buttons.length - 1) {
      this.scene.stop("LevelMenu");
      this.scene.start("MainMenu"); // Go back to the main menu if the back button is selected
    } else {
      console.log("Selected level");
      const levelNumber = this.selectedButtonIndex + 1; // Adjust for level number
      this.scene.start("TutorialMenu", { level: levelNumber }); // Start the game with the selected level
      
    }
  }
  destroyButtons() {
    if (this.buttons.length > 0) {
      //console.log("Destorying Buttons...")
      this.buttons.forEach((button) => {
        button.image.off("pointerdown");
        button.image.off("pointerover");
        button.image.off("pointerout");
        button.image.destroy();
        button.text.destroy();
        //console.log("Button destroyed: ", button.text);
      });
      this.buttons = [];
      this.input.keyboard.removeAllListeners();
    }
  }
}
