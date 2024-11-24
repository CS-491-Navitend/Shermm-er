import { Scene } from "phaser";
import { tutorials } from "/src/lib/tutorials";

export class TutorialMenu extends Scene {
    constructor() {
        super("TutorialMenu");
        this.level = 0;
        this.yPosition = 50;
    }

    create(data) {
        // Get the tutorial data based on the level
        this.level = data["level"];
        const tutorial = tutorials[this.level -1];

        if (!tutorial) {
            console.error("Invalid tutorial level");
            return;
        }

        // Extract the tutorial information 
        const { levelNumber, levelMechanic, description, steps } = tutorial;

        this.yPosition = 50; // Reset position

        // Display the level and mechanic title
        this.add.text(100, this.yPosition, `Level ${levelNumber}: ${levelMechanic}`, {
            font: '32px Arial',
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

        // Optional: Add images based on the level number
        switch (levelNumber) {
            case 1:
                // this.add.image(500, 300, 'queueImage');
                break;
            case 2:
                // this.add.image(500, 300, 'colorCodeImage');
                break;
            case 3:
                // this.add.image(500, 300, 'gatesImage');
                break;
            case 4:
                // this.add.image(500, 300, 'bombImage');
                break;
            case 5:
                // this.add.image(500, 300, 'toxicImage');
                break;
            case 6:
                // this.add.image(500, 300, 'invulnerabilityImage');
                break;
            case 7:
                // this.add.image(500, 300, 'powerup2Image');
                break;
            default:
                break;
        }

        // Add "Continue" button
        const continueButton = this.add.text(400, this.yPosition + 100, 'Continue', {
            font: '24px Arial',
            fill: '#00ff00'
        }).setOrigin(0.5);

        continueButton.setInteractive();
        continueButton.on('pointerdown', () => {
            // Transition to the game scene with the selected level
            this.scene.start('Game', { level: this.level });
        });
    }
}
