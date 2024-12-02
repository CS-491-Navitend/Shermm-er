import { Scene } from "phaser";

export class GameOver extends Scene {
    constructor() {
        super("GameOver");
        this.buttons = [];
        this.selectedButtonIndex = 0;
        this.isDebounced = false;
    }

    create({ game }, buttons) {
        document.getElementById('ui-bar').style.display = 'none';
        document.getElementById('rats-container').style.display = 'none';

        this.level = game.level;
        // Display game over message

        this.gameRose = this.add.image(this.cameras.main.centerX, 250, "rose").setOrigin(0.5);

        this.gameOverText = this.add.text(this.cameras.main.centerX, 550, "Game Over!", {
            fontSize: "32px",
            fill: "#fff",
            fontFamily: "Pixel"
        }).setOrigin(0.5);

        this.gameOverText.setDepth(10);

        // Option to go back to the main menu or restart
        this.createButtons();  // Create the buttons

        // Fade in effect
        this.cameras.main.fadeIn(1000, 0, 0, 0); // Fade in over 1 second (1000ms)

        this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
        this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
        this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());

        this.input.keyboard.on("keydown-R", () => {
            this.selectedButtonIndex = 0;  // Make sure Restart is selected by default
            this.confirmSelection();       // Trigger the restart logic
        });
    }

    createButtons() {
        // Destroy any existing buttons if they exist
        this.buttons.forEach(button => button.destroy());
        this.buttons = [];  // Reset buttons array

        // Create Restart Button
        this.createRestartButton();
        // Create Main Menu Button
        this.createMainMenuButton();
    }

    createRestartButton() {
        this.restartButton = this.add.text(this.cameras.main.centerX, 620, 'Press R to Restart', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }); // Added cursor style
        this.restartButton.setDepth(10);
        this.addMouseEvents(this.restartButton, 0); // Using a new method for mouse events
        this.buttons.push(this.restartButton); // Add to buttons array
    }

    createMainMenuButton() {
        this.mainMenuButton = this.add.text(this.cameras.main.centerX, 670, 'Back To Main Menu', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }); // Added cursor style
        this.mainMenuButton.setDepth(10);
        this.addMouseEvents(this.mainMenuButton, 1); // Using a new method for mouse events
        this.buttons.push(this.mainMenuButton); // Add to buttons array
    }

    addMouseEvents(button, index) {
        button.on('pointerover', () => {
            if (button) {  // Ensure button exists before highlighting
                this.highlightButton(button, true); // Highlight on hover
                this.selectedButtonIndex = index; // Update selected index on hover
            }
        });

        button.on('pointerout', () => {
            if (button) {  // Ensure button exists before resetting highlight
                this.highlightButton(button, false); // Reset highlight
            }
        });

        button.on('pointerdown', () => {
            if (button) {  // Ensure button exists before confirming selection
                this.confirmSelection(); // Confirm selection on click
            }
        });
    }

    changeSelection(direction) {
        // Ensure we are interacting with a valid button
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
        this.highlightButton(this.buttons[this.selectedButtonIndex]); // Highlight new selection
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
        if (selectedButton.text === 'Press R to Restart') {
            console.log("starting same level");
            this.scene.stop("GameOver");
            this.game.turtlesAreSunk = false;
            this.game.inWater = false;
            this.scene.start("Game", { level: this.level });
        } else if (selectedButton.text === 'Back To Main Menu') {
            this.scene.start("MainMenu");
        }
        setTimeout(() => {
            this.isDebounced = false;
        }, 300);
    }

    // Use shutdown to clean up the scene
    shutdown() {
        // Destroy all buttons properly
        this.buttons.forEach(button => button.destroy());
        this.buttons = []; // Reset buttons array
        this.scene.input.keyboard.removeAllListeners(); // Remove all keyboard listeners
        console.log("GameOver scene is being shut down.");
    }
}
