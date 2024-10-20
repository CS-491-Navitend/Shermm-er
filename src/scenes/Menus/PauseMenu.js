import { Scene } from "phaser";
import { Timer } from "/src/lib/Timer";
import { Game } from "/src/scenes/Game";
import { MainMenu } from "./MainMenu";
export class PauseMenu {
    constructor(scene) {
        this.scene = scene;
        this.pauseMenu = null;
        this.isActive = false;
    }

    create() {
        this.pauseMenu = this.scene.add.container(this.scene.width / 2, this.scene.height / 2);
        this.pauseMenu.setDepth(10);

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

        const text = this.scene.add.text(0, -100, 'Paused', {
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.pauseMenu.add(text);
        
        //resume button
        const resumeButton = this.scene.add.text(0, 70, 'Resume', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        const resumeBorder = this.scene.add.graphics();
        resumeBorder.lineStyle(2, 0xffffff, 1); // Width, color, alpha
        resumeBorder.strokeRect(resumeButton.x - resumeButton.width / 2 - 10, resumeButton.y - resumeButton.height / 2 - 10, resumeButton.width + 20, resumeButton.height + 20); // x, y, width, height
        this.pauseMenu.add(resumeBorder);

        // Call the toggle pause function in the Game class
        resumeButton.on('pointerdown', () => {
            this.hide();
        });
        

        //main menu button
        const mainMenuButton = this.scene.add.text(0, -20, 'Main Menu', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        const mainMenuBorder = this.scene.add.graphics();
        mainMenuBorder.lineStyle(2, 0xffffff, 1); // Width, color, alpha
        mainMenuBorder.strokeRect(mainMenuButton.x - mainMenuButton.width / 2 - 10, mainMenuButton.y - mainMenuButton.height / 2 - 10, mainMenuButton.width + 20, mainMenuButton.height + 20); // x, y, width, height
        this.pauseMenu.add(mainMenuBorder);

        //starts main menu scene
        mainMenuButton.on('pointerdown', () => {
            this.scene.scene.start("MainMenu");
            console.log('starting MainMenu')
        });

        //adds main menu button
        this.pauseMenu.add(mainMenuButton);
        //adds pauseMenu button
        this.pauseMenu.add(resumeButton);
        // Hide menu initially
        this.pauseMenu.setVisible(false);

    }
    show() {
        // Pause the Game
        if (this.isActive) return;
        this.isActive = true;
        this.pauseMenu.setVisible(true);
        this.scene.physics.pause()
        this.scene.timer.pause();
        this.scene.paused = true;
    }

    hide() {
        // Resume the Game
        if (!this.isActive) return;
        this.isActive = false;
        this.pauseMenu.setVisible(false);
        this.scene.physics.resume(); // Resume the physics
        this.scene.timer.resume();
        this.scene.paused = false;
    }

    reset() {
        this.isActive = false; // Reset the active state when starting a new game
        this.pauseMenu.setVisible(false); // Ensure menu is hidden
    }
    

    destroy() {
        this.pauseMenu.destroy();
    }

}
