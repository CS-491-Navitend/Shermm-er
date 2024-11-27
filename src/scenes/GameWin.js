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

        // Create random assets
        this.createRandomAssets(data["game"]);

        // Option to go back to the main menu or restart
        this.createButtons();

        // Fade in effect
        this.cameras.main.fadeIn(1000, 0, 0, 0); // Fade in over 1 second (1000ms)

        this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
        this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
        this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());
    }

    createButtons() {
        // Destroy any existing buttons if they exist
        this.buttons.forEach(button => button.destroy());
        this.buttons = [];  // Reset buttons array

        // Create Advance To Next Level Button
        this.createAdvanceButton();
        // Create Back To Main Menu Button
        this.createMainMenuButton();
    }

    createAdvanceButton() {
        this.advanceButton = this.add.text(this.cameras.main.centerX, 320, 'Advance To Next Level', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.advanceButton.setDepth(10);
        this.addMouseEvents(this.advanceButton, 0);
        this.buttons.push(this.advanceButton);
    }

    createMainMenuButton() {
        this.mainMenuButton = this.add.text(this.cameras.main.centerX, 370, 'Back To Main Menu', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.mainMenuButton.setDepth(10);
        this.addMouseEvents(this.mainMenuButton, 1);
        this.buttons.push(this.mainMenuButton);
    }

    addMouseEvents(button, index) {
        button.on('pointerover', () => {
            if (button) {  // Ensure button exists before highlighting
                this.highlightButton(button, true);
                this.selectedButtonIndex = index; // Update selected index on hover
            }
        });

        button.on('pointerout', () => {
            if (button) {  // Ensure button exists before resetting highlight
                this.highlightButton(button, false);
            }
        });

        button.on('pointerdown', () => {
            if (button) {  // Ensure button exists before confirming selection
                this.confirmSelection();
            }
        });
    }

    changeSelection(direction) {
        // Ensure there are buttons available
        if (this.buttons.length === 0) return;

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
        this.highlightButton(this.buttons[this.selectedButtonIndex]);
    }

    highlightButton(button, highlight = true) {
        if (button) {  // Check if button exists before setting styles
            button.setStyle({ fill: highlight ? '#ff0' : '#ffffff' });
        }
    }

    confirmSelection() {
        if (this.isDebounced) return;
        this.isDebounced = true;
        const selectedButton = this.buttons[this.selectedButtonIndex];
        if (selectedButton.text === 'Advance To Next Level') {
            this.scene.stop("GameWin");
            this.gameLogic.nextLevel(); // Advance to the next level
        } else if (selectedButton.text === 'Back To Main Menu') {
            this.scene.start("MainMenu");
        }
        setTimeout(() => {
            this.isDebounced = false;
        }, 300);
    }

    destroy() {
        // Clean up: destroy buttons and remove event listeners
        this.buttons.forEach(button => button.destroy());
        this.buttons = []; // Reset buttons array
        this.scene.input.keyboard.removeAllListeners(); // Remove keyboard listeners
    }

    createRandomAssets(gameData) {
        const assetCount = 50;
        for (let i = 0; i < assetCount; i++) {
            const x = Phaser.Math.Between(0, gameData.width);
            const y = Phaser.Math.Between(0, gameData.height);

            const assetChoice = ["shermie", "shermieBlueFlip", "shermieGreen", "shermieOrangeFlip", "shermiePurple", "shermieRed", "shermieYellowFlip"][Phaser.Math.Between(0, 6)];
            this.add.image(x, y, assetChoice);
        }
    }
}
