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
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.pauseMenu.add(text);
        
        //Create resume button
        this.createResumeButton();
        
        //create main menu button
        this.createMainMenuButton();
        
        //Hide menu
        this.pauseMenu.setVisible(false);

       
    }


    createResumeButton(){
        const resumeButton = this.scene.add.text(0, 70, 'Resume', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        resumeButton.on('pointerover', () => {
            resumeButton.setStyle({ fill: '#ff0' }); // Change color on hover
        });

        resumeButton.on('pointerout', () => {
            resumeButton.setStyle({ fill: '#ffffff' }); // Reset color
        });

        resumeButton.on('pointerdown', () => {
            this.hide();
        });

        // Add border around the resume button
        this.addButtonBorder(resumeButton);
        this.pauseMenu.add(resumeButton);
        this.buttons.push(resumeButton);
 
    }

    createMainMenuButton(){
        const mainMenuButton = this.scene.add.text(0, -20, 'Main Menu', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setStyle({ fill: '#ff0' }); // Change color on hover
        });
        mainMenuButton.on('pointerout', () => {
            mainMenuButton.setStyle({ fill: '#ffffff' }); // Reset color
        });

        mainMenuButton.on('pointerdown', () => {
            //if(!this.scene.paused) return; //Prevent action if not paused
            this.scene.timer.stop();
            this.scene.scene.stop("Game");
            this.scene.scene.start("MainMenu");
            console.log('starting MainMenu');
            
        });

        this.addButtonBorder(mainMenuButton);
        this.pauseMenu.add(mainMenuButton);
        this.buttons.push(mainMenuButton);
    }
    addButtonBorder(button){
        const border = this.scene.add.graphics();
        border.lineStyle(2, 0xffffff, 1);
        border.strokeRect(button.x - button.width / 2 - 10, button.y - button.height / 2 - 10, button.width + 20, button.height + 20);
        this.pauseMenu.add(border);

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
        const button = this.buttons[index];
        button.setStyle({ fill: highlight ? '#ff0' : '#ffffff' });
    }

    confirmSelection() {
        if (this.isDebounced) return;
        this.isDebounced = true;
       // console.log("Selected button: ", this.buttons[this.selectedButtonIndex]);
        const selectedButton = this.buttons[this.selectedButtonIndex];
        if (selectedButton.text === 'Resume') {
            this.hide();
          //  console.log("Hiding the menu");
        } else if (selectedButton.text === 'Main Menu') {
          //  console.log("Going to Main Menu....")
            this.scene.timer.stop();
            this.scene.scene.stop("Game");
            this.scene.scene.start("MainMenu");
            this.isActive = false;
           // console.log('starting MainMenu');
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
        
        this.scene.input.enabled = false;
        
        this.scene.input.keyboard.on('keydown-UP', () => this.changeSelection(-1));
        this.scene.input.keyboard.on('keydown-DOWN', () => this.changeSelection(1));
        this.scene.input.keyboard.on('keydown-ENTER', () => this.confirmSelection());

       // console.log("scene input added");
        this.isToggling = false;
    }

    hide(){
        // Resume the Game
      //  console.log("PauseMenu hide called. Current isActive:", this.isActive);
        if (!this.isActive || this.isToggling) return;
        this.isToggling = true;
        this.isActive = false;
        this.pauseMenu.setVisible(false);
        this.scene.physics.resume(); // Resume the physics
       // this.scene.timer.resume();
       // this.scene.paused = false;
        this.scene.input.enabled = true;
       // console.log("PauseMenu is now inactive.");
        this.scene.input.keyboard.removeAllListeners();
        this.isToggling = false;
    }

    reset() {
        this.isActive = false; 
        this.pauseMenu.setVisible(false); 
    }
    

    destroy() {
        console.log("Pause menu is being destroyed");
        this.scene.input.keyboard.removeAllListeners();
        if(this.pauseMenu){
            this.pauseMenu.destroy();
            this.pauseMenu = null;
        }
        
    }
}
