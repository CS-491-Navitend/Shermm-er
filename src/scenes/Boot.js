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
    
    this.load.image("ShortLog", "/assets/ShortLog.png");
    this.load.image("LongLog", "/assets/LongLog.png");
    this.load.image("turtle", "/assets/turtle.png");
    this.load.image("turtleforward", "/assets/turtleforward.png");

    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("life", "/assets/heart.png");

    // Load textures for background
    this.load.image("LavaBrick", "/assets/backgrounds/LavaBrick.png");
    this.load.image("lava", "/assets/backgrounds/Lava.png");
    this.load.image("goalZone", "/assets/backgrounds/GoalZone.png");
    this.load.image("lavaGoal", "/assets/backgrounds/LavaGoal.png");
    this.load.image("lavaSafeZone", "/assets/backgrounds/LavaSafeZone.png");
    this.load.image("rock", "/assets/backgrounds/Rock.png");
    this.load.image("road", "/assets/backgrounds/LavaRoad.png");
  }

  create() {
    // this.scene.start("Game", { level: 0 }); //dev level on start
    this.scene.start("MainMenu");
  }
}
