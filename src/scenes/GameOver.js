import { Scene } from "phaser";

export class GameOver extends Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        // Load vehicle images and background
        this.load.image("car1", "/assets/car1.png");
        this.load.image("car2", "/assets/car2.png");
        this.load.image("car3", "/assets/car3.png");
        this.load.image("tractor", "/assets/TractorTrailer.png");
        this.load.image("background", "/assets/background.png");
    }

    create(data) {
        const gameWidth = data.game.width;
        const gameHeight = data.game.height;

        // Set background
        this.add.image(gameWidth / 2, gameHeight / 2, "background");

        // Custom rendering for game over graphics
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, gameWidth, gameHeight);

        // Add Game Over title
        const gameOverTitle = this.add.text(gameWidth / 2, 250, "Game Over!", {
            fontSize: "32px",
            fill: "#fff",
            
        }).setOrigin(0.5).setAlpha(0); // Start transparent

        const restartText = this.add.text(gameWidth / 2, 700, "Press SPACE to restart", {
            fontSize: "32px",
            fill: "#fff",
            
        }).setOrigin(0.5).setAlpha(0); // Start transparent

        // Call to display collisions
        this.displayVehicleCollisions(data);

        // Fade-in effects
        this.tweens.add({ targets: gameOverTitle, alpha: 1, duration: 1000, ease: 'Linear' });
        this.tweens.add({ targets: restartText, alpha: 1, duration: 1000, ease: 'Linear' });

        // Restart game on SPACE key press
        this.input.keyboard.on("keydown-SPACE", () => {
            this.scene.start("Game", { level: data.game.level });
        });
    }

    displayVehicleCollisions(data) {
        //static number of hits
        const totalCollisions = {
            car1: 3,
            car2: 5,
            car3: 2,
            tractor: 7
        };

        const vehicleHitCounts = [
            { key: "car1", image: "car1", x: data.game.width / 4, y: 450 },
            { key: "car2", image: "car2", x: data.game.width / 2, y: 450 },
            { key: "car3", image: "car3", x: (3 * data.game.width) / 4, y: 450 },
            { key: "tractor", image: "tractor", x: data.game.width / 2, y: 600 }
        ];

        vehicleHitCounts.forEach(vehicle => {
            const image = this.add.image(vehicle.x - 40, vehicle.y - 20, vehicle.image)
                .setOrigin(0.5).setScale(1.5).setAlpha(0); // Start transparent

            const hitsText = this.add.text(vehicle.x - 30, vehicle.y + 40, `Collisions: ${totalCollisions[vehicle.key]}`, {
                fontSize: "20px",
                fill: "#fff",
                
            }).setOrigin(0.5).setAlpha(0); // Start transparent

            // Fade-in effect for vehicles and text
            this.tweens.add({ targets: [image, hitsText], alpha: 1, duration: 1000, ease: 'Linear' });
        });
    }

}

export default GameOver;
