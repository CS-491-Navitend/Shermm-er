import { Scene } from "phaser";
export class GameOver extends Scene {
  constructor() {
    super("GameOver");
    this.rem = 16;
    this.buttons = [];
    this.selectedButtonIndex = 0; // Tracks the selected button
    this.isActive = false;
  }

  create({ game }) {
    document.getElementById('ui-bar').style.display = 'none';
    const x = game.width / 2;
    const y = 250;

    this.add.text(x, y, "Game Over!", {
        fontFamily: "Pixel",
        fontSize: "32px",
        fill: "#fff"
    }).setOrigin(0.5);

    // Creating menu buttons
    const restartButton = this.createButton(512, 370, 'Restart', 0);
    const mainMenuButton = this.createButton(512, 480, "Back to Main Menu", 1);

    // Add buttons to array
    this.buttons.push(restartButton);
    this.buttons.push(mainMenuButton);

    // Keyboard inputs
    this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
    this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
    this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());

    this.highlightButton(this.selectedButtonIndex);
  }

  createButton(x, y, text, mainButtonIndex) {
    const buttonImage = this.add.image(x, y, "buttonImage").setOrigin(0.5);
    const buttonText = this.add.text(x, y, text, {
      fontFamily: 'Pixel',
      fontStyle: "bold",
      fontSize: this.rem * 1.8 + "px",
    }).setOrigin(0.5);

    buttonImage.setInteractive({ useHandCursor: true });

    buttonImage.setDisplaySize(250, 60);

    buttonImage.on("pointerover", () => {
      this.selectedButtonIndex = mainButtonIndex;
      this.highlightButton(this.selectedButtonIndex);
    });

    buttonImage.on("pointerout", () => {
      this.highlightButton(this.selectedButtonIndex);
    });

    buttonImage.on("pointerdown", () => {
      this.confirmSelection();
    });

    return { buttonImage, buttonText };
  }

  changeSelection(direction) {
    this.highlightButton(this.selectedButtonIndex, false);
    this.selectedButtonIndex += direction;

    if (this.selectedButtonIndex < 0) {
      this.selectedButtonIndex = this.buttons.length - 1;
    } else if (this.selectedButtonIndex >= this.buttons.length) {
      this.selectedButtonIndex = 0;
    }

    this.highlightButton(this.selectedButtonIndex);
  }

  highlightButton(index) {
    this.buttons.forEach((buttonobj, i) => {
      const highlight = i === index;
      const buttonImage = buttonobj.buttonImage;
      const buttonText = buttonobj.buttonText;

      if (buttonImage) {
        buttonImage.setTint(highlight ? 0x44AAFF : 0xFFFFFF);
      }

      if (buttonText) {
        buttonText.setStyle({
          color: highlight ? "#000000" : "#FFFFFF",
          stroke: highlight ? "#FFFFFF" : "#000000",
          strokeThickness: highlight ? 6 : 4,
        });
      }
    });
  }

  confirmSelection() {
    const selectedButton = this.buttons[this.selectedButtonIndex];
    
    if (selectedButton === this.buttons[0]) {
      this.scene.start("Game", { level: this.game.level });
      this.game.turtlesAreSunk = false;
      this.game.inWater = false;
    } else if (selectedButton === this.buttons[1]) {
      this.scene.start("MainMenu");
    }
  }

  destroyButtons() {
    if (this.buttons.length > 0) {
      this.buttons.forEach(button => {
        button.buttonImage.off("pointerdown");
        button.buttonImage.off("pointerover");
        button.buttonImage.off("pointerout");
        button.buttonImage.destroy();
        button.buttonText.destroy();
      });
      this.buttons = [];
      this.input.keyboard.removeAllListeners();
    }
  }
}

