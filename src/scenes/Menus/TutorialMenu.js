import { Scene } from "phaser";
import { tutorials } from "/src/lib/tutorials";

export class TutorialMenu extends Scene {
    constructor() {
        super("TutorialMenu");
        this.level = 0;
        this.yPosition = 50;
        this.continueButton = null;
    }

    create(data) {
        // Get the tutorial data based on the level
        this.level = data["level"];
        const tutorial = tutorials[this.level -1];

        if (!tutorial) {
            console.error("Invalid tutorial level");
            return;
        }

        
        const { levelNumber, levelMechanic, description, steps } = tutorial;

        this.yPosition = 50; // Reset position

        // Display the level and mechanic title
        this.add.text(100, this.yPosition, `Level ${levelNumber}: ${levelMechanic}`, {
            font: '32px Pixel',
            fill: '#ffffff'
        });
        this.yPosition += 50;

        // Display the mechanic description
        this.add.text(100, this.yPosition, description, {
            font: '24px Arial',
            fill: '#ffffff'
        });
        this.yPosition += 50;

        // Display the tutorial steps
        steps.forEach((step) => {
            this.add.text(100, this.yPosition, `${step.title}:`, {
                font: '28px Arial',
                fill: '#ffcc00'
            });
            this.yPosition += 30;
            this.add.text(100, this.yPosition, step.text, {
                font: '20px Arial',
                fill: '#ffffff'
            });
            this.yPosition += 60; // Add space between steps
        });


        // Add "Continue" button
        this.continueButton = this.add.text(400, this.yPosition + 100, 'Continue', {
            font: '24px Pixel',
            fill: '#ffffff'
        }).setOrigin(0.5);

    
        // Make the continueButton interactive for mouse clicks
        this.continueButton.setInteractive();
        this.continueButton.on('pointerdown', this.startGame, this);

        // Add keyboard input (e.g., pressing Enter or Space to continue)
        this.input.keyboard.on('keydown-ENTER', this.startGame, this);
        this.input.keyboard.on('keydown-SPACE', this.startGame, this);

        this.startFlashingButton();
        
    }
    startFlashingButton() {
        // Tween to make the button fade in and out
        this.tweens.add({
            targets: this.continueButton,
            alpha: { from: 1, to: 0 }, // Fade out to alpha 0 (transparent)
            duration: 1000, // 1 second for fade in/out
            yoyo: true, // Make the tween go back and forth
            repeat: -1, // Infinite repeats (keeps flashing)
            ease: 'Sine.easeInOut', // Smooth ease for the effect
        });
    }

    startGame() {
        // Clean up interactive listeners
        if (this.continueButton) {
            this.continueButton.off('pointerdown'); // Remove pointerdown listener
        }

        // Remove keyboard listeners
        this.input.keyboard.off('keydown-ENTER', this.startGame, this);
        this.input.keyboard.off('keydown-SPACE', this.startGame, this);

        // Start the game scene with the current level
        this.scene.start('Game', { level: this.level });
    }

    shutdown() {
        // Remove listeners 
        if (this.continueButton) {
            this.continueButton.off('pointerdown', this.startGame, this); // Remove pointerdown listener
        }

        this.input.keyboard.off('keydown-ENTER', this.startGame, this);
        this.input.keyboard.off('keydown-SPACE', this.startGame, this);

        if (this.continueButton) {
            this.tweens.killTweensOf(this.continueButton); // Stop flashing effect
        }
    }
}
