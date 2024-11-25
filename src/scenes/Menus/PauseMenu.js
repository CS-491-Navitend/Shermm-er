import { Scene } from "phaser";
import { Timer } from "/src/lib/Timer";
import { Game } from "/src/scenes/Game";
import { MainMenu } from "./MainMenu";


export class PauseMenu extends Scene {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.pauseMenu = null;
        this.isActive = false;
        this.buttons = [];
        this.selectedButtonIndex = 0;
        this.isToggling = false;
        this.isDebounced = false;
        
    }

    create(buttons) {
        //create the menu
        this.pauseMenu = this.scene.add.container(this.scene.width / 2, this.scene.height / 2);
        this.pauseMenu.setDepth(10);

        //create the background color
        const background = this.scene.add.graphics();
        background.fillStyle(0x000000, 0.8); // Semi-transparent background
        background.fillRect(-200, -150, 400, 300);
        this.pauseMenu.add(background);

        //border around the menu
        const border = this.scene.add.graphics();
        // Width, color, alpha
        border.lineStyle(2, 0xffffff, 1); 
        // x, y, width, height
        border.strokeRect(-200, -150, 400, 300);
        this.pauseMenu.add(border);

        //Paused text
        const text = this.scene.add.text(0, -100, 'Paused', {
            fontFamily: 'Pixel',
            fontSize: '40px',
            fill: '#ffffff',
            fontStyle: "Bold"
        }).setOrigin(0.5);
        this.pauseMenu.add(text);
        
        //Create resume button
        this.createResumeButton();
        
        //create main menu button
        this.createMainMenuButton();

        //create restart button
        this.createRestartButton();

        //Hide menu
        this.pauseMenu.setVisible(false);

       
    }


    createResumeButton() {
        const resumeButton = this.scene.add.text(0, 70, 'Resume', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }); // Added cursor style

        this.addMouseEvents(resumeButton, 0); // Using a new method for mouse events
        this.pauseMenu.add(resumeButton);
        this.buttons.push(resumeButton);
    }

    createMainMenuButton() {
        const mainMenuButton = this.scene.add.text(0, -30, 'Main Menu', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }); // Added cursor style

        this.addMouseEvents(mainMenuButton, 1); // Using a new method for mouse events
        this.pauseMenu.add(mainMenuButton);
        this.buttons.push(mainMenuButton);
    }

    createRestartButton() {
        const restartButton = this.scene.add.text(0, 20, 'Restart', {
            fontFamily: 'Pixel',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.addMouseEvents(restartButton, 2); // This will be button index 2
        this.pauseMenu.add(restartButton);
        this.buttons.push(restartButton);
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
        if (selectedButton.text === 'Resume') {
            this.hide();
            // console.log("Hiding the menu");
            this.scene.input.keyboard.on('keydown-ENTER', () => {
                this.scene.togglePause();
            });
        } else if (selectedButton.text === 'Main Menu') {
            // console.log("Going to Main Menu....")
            this.scene.scene.stop("PauseMenu");
            this.scene.timer.stop();
            this.scene.scene.stop("Game");
            this.scene.scene.start("MainMenu");
            document.getElementById('ui-bar').style.display = "none";
            this.isActive = false;
            // console.log('starting MainMenu');
        } else if (selectedButton.text === "Restart") {
            console.log("restarted");
            this.scene.scene.start("Game", { level: this.scene.level });
            
        }
        setTimeout(() => {
            this.isDebounced = false;
        }, 300);
    }

     
    show(){
        // Pause the Game
        // console.log("PauseMenu show called. Current isActive:", this.isActive);
        if (this.isActive || this.isToggling) return;
        this.isToggling = true;
        this.isActive = true;
        this.pauseMenu.setVisible(true);
        this.scene.physics.pause()
       // this.scene.timer.pause();
        this.scene.paused = true;
        // console.log("Pause Menu is now active.");
        
        this.scene.input.keyboard.enabled = true; // Keep keyboard input enabled for menu navigation
        this.scene.input.mouse.enabled = true;
        
        this.scene.input.keyboard.on('keydown-UP', () => this.changeSelection(-1));
        this.scene.input.keyboard.on('keydown-DOWN', () => this.changeSelection(1));
        this.scene.input.keyboard.on('keydown-ENTER', () => this.confirmSelection());

        // console.log("scene input added");
        this.isToggling = false;
    }

    hide(){
        // Resume the Game
        // console.log("PauseMenu hide called. Current isActive:", this.isActive);
        if (!this.isActive || this.isToggling) return;
        this.isToggling = true;
        this.isActive = false;
        this.pauseMenu.setVisible(false);
        this.scene.physics.resume(); // Resume the physics
        this.scene.timer.resume();
       // this.scene.paused = false;
        this.scene.input.enabled = true;
        // console.log("PauseMenu is now inactive.");
        this.scene.input.keyboard.removeAllListeners();
        this.isToggling = false;
        this.scene.paused = false;
    }

    reset() {
        this.isActive = false; 
        this.pauseMenu.setVisible(false); 
    }
    

    destroy() {
        // console.log("Pause menu is being destroyed");
        this.scene.input.keyboard.removeAllListeners();
        if(this.pauseMenu){
            this.pauseMenu.destroy();
            this.pauseMenu = null;
        }
        
    }
}
