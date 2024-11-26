import { Scene } from 'phaser';
import { GameLogic } from "/src/lib/GameLogic";


export class GameWin extends Scene {
  constructor() {
    super("GameWin");
    this.buttons = [];
    this.selectedButtonIndex = 0;
    this.isDebounced = false;
  }

  create(data, buttons) {
    document.getElementById('ui-bar').style.display = 'none';
    
    this.gameLogic = new GameLogic(data["game"]);
    // Display win message
      const winText = this.add.text(data["game"].width / 2, 250, "You Win!", {
          fontSize: "32px",
          fill: "#fff",
          fontFamily: "Pixel"
      }).setOrigin(0.5);

      winText.setDepth(10);
    this.createRandomAssets(data["game"]);
    // Display resets count
    // this.add.text(data["game"].width / 2, 350, `Resets: ${data["game"].resetCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

    // Option to go back to the main menu or restart
    this.createAdvanceButton();
    this.createMainMenuButton();

    this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
    this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
    this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());


  }
    createAdvanceButton() {
        this.advanceButton = this.add.text(this.cameras.main.centerX, 320, 'Advance To Next Level', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }); // Added cursor style
        this.advanceButton.setDepth(10);
        this.addMouseEvents(this.advanceButton, 0); // Using a new method for mouse events
        this.buttons.push(this.advanceButton);
    }

    createMainMenuButton() {
        this.mainMenuButton = this.add.text(this.cameras.main.centerX, 370, 'Back To Main Menu', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }); // Added cursor style
        this.mainMenuButton.setDepth(10);
        this.addMouseEvents(this.mainMenuButton, 1); // Using a new method for mouse events
        this.buttons.push(this.mainMenuButton);
    }

    addMouseEvents(button, index) {
        button.on('pointerover', () => {
            this.highlightButton(button, true); // Highlight on hover
            this.selectedButtonIndex = index; // Update selected index on hover
        });

        button.on('pointerout', () => {
            this.highlightButton(button, false); // Reset highlight
        });

        button.on('pointerdown', () => {
            // console.log(`${button.text} clicked`);
            this.confirmSelection(); // Confirm selection on click
        });
    }

    changeSelection(direction) {
        // Highlight the currently selected button
        this.highlightButton(this.buttons[this.selectedButtonIndex], false); // Remove highlight

        // Update the selected button index
        this.selectedButtonIndex += direction;

        // Wrap around if needed
        if (this.selectedButtonIndex < 0) {
            this.selectedButtonIndex = this.buttons.length - 1;
        } else if (this.selectedButtonIndex >= this.buttons.length) {
            this.selectedButtonIndex = 0;
        }

        // Highlight the new selection
        this.highlightButton(this.buttons[this.selectedButtonIndex]); // Highlight new selection
    }

    highlightButton(button, highlight = true) {
        button.setStyle({ fill: highlight ? '#ff0' : '#ffffff' });
    }

    confirmSelection() {
        if (this.isDebounced) return;
        this.isDebounced = true;
        // console.log("Selected button: ", this.buttons[this.selectedButtonIndex]);
        const selectedButton = this.buttons[this.selectedButtonIndex];
        if (selectedButton.text === 'Advance To Next Level') {
            this.scene.stop("GameWin");
            this.gameLogic.nextLevel();
        } else if (selectedButton.text === 'Back To Main Menu') {
            this.scene.start("MainMenu");
            
            // console.log('starting MainMenu');
        } 
        setTimeout(() => {
            this.isDebounced = false;
        }, 300);
    }

    destroy() {
        // console.log("Pause menu is being destroyed");
        this.scene.input.keyboard.removeAllListeners();

    }

  createRandomAssets(gameData){
      const assetCount = 20;

      for(let i = 0; i < assetCount; i++) {
          const x = Phaser.Math.Between(0, gameData.width);
          const y = Phaser.Math.Between(0, gameData.height);

          const assetChoice = ["shermie", "shermieBlue", "shermieGreen","shermieOrange", "shermiePurple","shermieRed", "shermieYellow"][Phaser.Math.Between(0, 6)];

          this.add.image(x,y, assetChoice)
      }
  }
}