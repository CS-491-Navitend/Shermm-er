import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    const totalCars = 13;  // Define how many cars you have (adjust this number based on your assets)
    
    for (let i = 1; i <= totalCars; i++) {
      this.load.image(`car${i}`, `/assets/vehiclesBackward/car${i}.png`);
      this.load.image(`car${i}forward`, `/assets/vehicleForward/car${i}forward.png`);
    }

    // Load other assets (static)
    this.load.image("tractor", "/assets/vehiclesBackward/tractor.png");
    this.load.image("tractorforward", "/assets/vehicleForward/tractorForward.png");
    
    this.load.image("ShortLog", "/assets/shortLog.png");
    this.load.image("LongLog", "/assets/LongLog.png");
    this.load.image("turtle", "/assets/turtle.png");
    this.load.image("turtleforward", "/assets/turtleforward.png");

    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("background", "/assets/backgrounds/background.jpeg");
    this.load.image("background2", "/assets/backgrounds/background2.jpeg");
    this.load.image("life", "/assets/heart.png");
  }

  create() {
    // this.scene.start("Game", { level: 0 }); //dev level on start
    this.scene.start("MainMenu");
  }
}
