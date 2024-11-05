import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
    this.fontFamily = "sans-serif";
    this.rem = 16;
    this.buttons = [];
    this.selectedButtonIndex = 0; // Tracks the selected button
    this.isActive = false;
  }

  create(buttons) {
    this.backgroundMusic = this.sound.add("backgroundMusic", {
      volume: 0.25,
      loop: true,
    });

    //console.log("Data received: ", buttons);
    this.isActive = true;
    this.destroyButtons();
    // console.log("Data received: ", buttons);

    //console.log(this.buttons);
    // Main menu text
    this.add
      .text(512, 200, "Shermm-er", {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 4 + "px",
      })
      .setOrigin(0.5);

    // Create buttons
    const playButton = this.createButton(512, 400, "Play", 0);
    const levelSelectButton = this.createButton(512, 500, "Level Select", 1);

    this.buttons.push(playButton, levelSelectButton);
    //console.log("Current buttons array after creation: ", this.buttons);
    // Keyboard inputs

    this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
    this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
    this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());

    //console.log(this.buttons);
    this.highlightButton(this.selectedButtonIndex);
  }

  createButton(x, y, text, mainButtonIndex) {
    const button = this.add
      .text(x, y, text, {
        fontFamily: this.fontFamily,
        fontStyle: "bold",
        fontSize: this.rem * 2 + "px",
        padding: { x: 100, y: 20 },
        backgroundColor: "#3388FF",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    //console.log("Creating Button: ", text);

    //buttons length for main menu

    button.on("pointerover", () => {
      this.selectedButtonIndex = mainButtonIndex; // Update the selected index on hover
      this.highlightButton(this.selectedButtonIndex);
    });

    button.on("pointerout", () => {
      this.highlightButton(this.selectedButtonIndex);
    });

    button.on("pointerdown", () => {
      this.confirmSelection();
    });

    return button;
  }

  changeSelection(direction) {
    // Highlight the selected button
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

  highlightButton(index) {
    this.buttons.forEach((button, i) => {
      const highlight = i === index;
      button.setStyle({ backgroundColor: highlight ? "#44AAFF" : "#3388FF" });
    });
  }

  confirmSelection() {
    const selectedButton = this.buttons[this.selectedButtonIndex];
    //console.log('selected Button', this.selectedButtonIndex);
    if (selectedButton === this.buttons[0]) {
      this.backgroundMusic.play();
      this.scene.start("Game", { level: 1 });
      //console.log("Starting level 1");
    } else if (selectedButton === this.buttons[1]) {
      this.scene.start("LevelMenu");
      //console.log("Starting level menu");
    }
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
