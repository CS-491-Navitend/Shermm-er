import { Scene } from "phaser";
import { tutorials } from "/src/lib/tutorials";
import { levels } from "/src/lib/levels";

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
        const zoneType = levels[data["level"]]["water_zone_type"];
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
            this.yPosition += 60;
            this.add.text(100, this.yPosition, step.text, {
                font: '20px Arial',
                fill: '#ffffff'
            });
            this.yPosition += 100; // Add space between steps
        });

        console.log(zoneType)

        switch (this.level) {
            case 1:
                this.add.image(600,500, "pasture_end");
                this.add.image(500, 500, 'pasture');
                this.add.image(400, 500, 'pasture');
                this.add.image(300, 500, 'pasture');
                this.add.image(490, 500,"shermie");
                this.add.image(390, 500,"shermie");
                this.add.image(290, 500,"shermie");
                this.add.image(590, 500,"shermie");
                break;
            case 2:
                this.add.image(500, 500, 'shermieBlue');
                this.add.image(400, 500, 'shermieRed'); 
                this.add.image(600, 500, 'shermieGreenFlip');  
                break;
            case 3:
                this.add.image(390, 500, zoneType + 'Goal');
                this.add.image(690, 500,"shermie");
                break;
            case 4:
                this.add.image(490, 500,"bomb1");
                this.add.image(390, 500,"bomb2");
                this.add.image(290, 500,"bomb3");
                this.add.image(590, 500,"bomb4");
                break;
            case 5:
                this.add.image(500, 500, 'shermieToxic'); 
                break;
            case 6:
                this.add.image(500, 500, 'invulnerability'); 
                break;
            case 7:
                this.add.image(500, 500, 'antidote'); 
                break;
            case 8:
                this.add.image(500, 500, 'selfService'); 
                break;
            case 9:
                this.add.image(490, 450,"shermie");
                this.add.image(390, 650,"shermieToxic");
                this.add.image(290, 400,"bomb3");
                this.add.image(590, 900,"shermieRedFlip")
                this.add.image(900, 500, 'selfService'); 
                this.add.image(200, 500, 'antidote');
                this.add.image(390, 500, zoneType + 'Goal');
                this.add.image(200, 800, 'pasture');
                this.add.image(300, 800, 'pasture');
                this.add.image(400, 800, 'pasture');
                this.add.image(370, 800,"shermie");
                this.add.image(270, 800,"shermie");
                this.add.image(170, 800,"shermie");
                this.add.image(470, 800,"shermie");
                this.add.image(700, 500, 'invulnerability'); 
                break;
            default:
                console.log("No image for this level");
                break;
        }


        // Add "Continue" button
        this.continueButton = this.add.text(500, 700, 'Continue', {
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
