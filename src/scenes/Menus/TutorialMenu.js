import { Scene } from "phaser";
import { tutorials } from "/src/lib/tutorials";

export class TutorialMenu extends Scene {
    constructor() {
        super("TutorialMenu");
        this.level = 0;

    }
    
   

    create(data) {
        this.level = data["level"]
        this.levelName = tutorials[data["level"]]["level"]
        this.levelMechanic = tutorials[data["level"]]["levelMechanic"];
        this.description = tutorials[data["level"]]["description"];
        this.steps = tutorials[data["level"]]["steps"];
        let yPosition = 50;
       
        

        if (levelTutorial) {

            

            this.yPosition = 50;

            // Display the level and mechanic title
            this.add.text(100, yPosition, `Level ${levelTutorial.level}: ${levelMechanic}`, {
                font: '32px Arial',
                fill: '#ffffff'
            });
            yPosition += 50;

            // Display the mechanic description
            this.add.text(100, yPosition, description, {
                font: '24px Arial',
                fill: '#ffffff'
            });
            yPosition += 50;

            // Display the tutorial steps
            steps.forEach((step, index) => {
                this.add.text(100, yPosition, `${step.title}:`, {
                    font: '28px Arial',
                    fill: '#ffcc00'
                });
                yPosition += 30;
                this.add.text(100, yPosition, step.text, {
                    font: '20px Arial',
                    fill: '#ffffff'
                });
                yPosition += 60; // Add space between steps
            });

            switch (levelNumber) {
                case 1:
                    //this.add.image(500, 300, 'queueImage');
                    break;
                case 2:
                   // this.add.image(500, 300, 'colorCodeImage');
                    break;
                case 3:
                    //this.add.image(500, 300, 'gatesImage');
                    break;
                case 4:
                    //this.add.image(500, 300, 'bombImage');
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
            const continueButton = this.add.text(400, yPosition + 100, 'Continue', {
                font: '24px Arial',
                fill: '#00ff00'
            }).setOrigin(0.5);

            continueButton.setInteractive();
            continueButton.on('pointerdown', () => {
                // Transition to the game scene with the selected level
                this.scene.start('Game', { level: levelNumber });
            });

        }
    }

}