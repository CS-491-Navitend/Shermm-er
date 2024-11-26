import { Scene } from "phaser";


export class GameOver extends Scene {
    constructor() {
        super("GameOver");
        this.buttons = [];
        this.selectedButtonIndex = 0;
    }

    create(data, buttons) {
        document.getElementById('ui-bar').style.display = 'none';
        
       
        // Display win message
          this.gameOverText = this.add.text(data["game"].width / 2, 250, "Game Over!", {
              fontSize: "32px",
              fill: "#fff",
              fontFamily: "Pixel"
          }).setOrigin(0.5);
    
          this.gameOverText.setDepth(10);
        
        // Display resets count
        // this.add.text(data["game"].width / 2, 350, `Resets: ${data["game"].resetCount}`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
    
        // Option to go back to the main menu or restart
        this.createRestartButton();
        this.createMainMenuButton();
    
        this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
        this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
        this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());
    
    
      }
        createRestartButton() {
            this.restartButton = this.add.text(this.cameras.main.centerX, 320, 'Restart', {
                fontFamily: 'Pixel',
                fontSize: '20px',
                fill: '#ffffff'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true }); // Added cursor style
            this.restartButton.setDepth(10);
            this.addMouseEvents(this.restartButton, 0); // Using a new method for mouse events
            this.buttons.push(this.restartButton);
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
            if (selectedButton.text === 'Restart') {
                this.scene.stop("GameOver");
                this.scene.start("Game", { level: this.level });
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
}