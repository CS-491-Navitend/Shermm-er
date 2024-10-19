import { Scene } from "phaser";

export class PauseMenu {
    constructor(scene) {
        this.scene = scene;
        this.pauseMenu = null;
    }

    create() {
        this.pauseMenu = this.scene.add.container(this.scene.width / 2, this.scene.height / 2);
        this.pauseMenu.setDepth(10);

        const background = this.scene.add.graphics();
        background.fillStyle(0x000000, 0.8); // Semi-transparent background
        background.fillRect(-200, -150, 400, 300);
        this.pauseMenu.add(background);

        const text = this.scene.add.text(0, 0, 'Paused\nPress ENTER to Resume', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.pauseMenu.add(text);

        // Resume button
        const resumeButton = this.scene.add.text(0, 50, 'Resume', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        resumeButton.on('pointerdown', () => {
            this.hide();
        });

        // Main menu button
        const mainMenuButton = this.scene.add.text(0, 100, 'Main Menu', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        mainMenuButton.on('pointerdown', () => {
            this.scene.scene.start("MainMenu"); // Use this.scene
        });

        // Add buttons to the pause menu
        this.pauseMenu.add(resumeButton);
        this.pauseMenu.add(mainMenuButton);

        // Hide menu initially
        this.pauseMenu.setVisible(false);
    }

    show() {
        // Pause the Game
        this.pauseMenu.setVisible(true);
        this.scene.physics.pause();
        this.scene.timer.pause(); // Ensure this is defined
    }

    hide() {
        // Resume the Game
        this.pauseMenu.setVisible(false);
        this.scene.physics.resume(); // Resume the physics
        this.scene.timer.resume(); // Ensure this is defined
    }

    destroy() {
        this.pauseMenu.destroy();
    }
}
