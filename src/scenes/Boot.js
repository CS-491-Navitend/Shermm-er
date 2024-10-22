import { Scene } from "phaser";

// Import assets directly
import car1 from "/assets/vehiclesBackward/car1.png";
import car2 from "/assets/vehiclesBackward/car2.png";
import car3 from "/assets/vehiclesBackward/car3.png";
import car4 from "/assets/vehiclesBackward/car4.png";
import car5 from "/assets/vehiclesBackward/car5.png";
import car6 from "/assets/vehiclesBackward/car6.png";
import car7 from "/assets/vehiclesBackward/car7.png";
import car8 from "/assets/vehiclesBackward/car8.png";
import car9 from "/assets/vehiclesBackward/car9.png";
import car10 from "/assets/vehiclesBackward/car10.png";
import car11 from "/assets/vehiclesBackward/car11.png";
import car12 from "/assets/vehiclesBackward/car12.png";
import car13 from "/assets/vehiclesBackward/car13.png";
import car1forward from "/assets/vehicleForward/car1forward.png";
import car2forward from "/assets/vehicleForward/car2forward.png";
import car3forward from "/assets/vehicleForward/car3forward.png";
import car4forward from "/assets/vehicleForward/car4forward.png";
import car5forward from "/assets/vehicleForward/car5forward.png";
import car6forward from "/assets/vehicleForward/car6forward.png";
import car7forward from "/assets/vehicleForward/car7forward.png";
import car8forward from "/assets/vehicleForward/car8forward.png";
import car9forward from "/assets/vehicleForward/car9forward.png";
import car10forward from "/assets/vehicleForward/car10forward.png";
import car11forward from "/assets/vehicleForward/car11forward.png";
import car12forward from "/assets/vehicleForward/car12forward.png";
import car13forward from "/assets/vehicleForward/car13forward.png";

import tractor from "/assets/vehiclesBackward/tractor.png";
import tractorforward from "/assets/vehicleForward/tractorForward.png";
import ShortLog from "/assets/ShortLog.png";
import LongLog from "/assets/LongLog.png";
import turtle from "/assets/turtle.png";
import turtleforward from "/assets/turtleforward.png";
import shermie from "/assets/shermie.png";
import background from "/assets/backgrounds/background.jpeg";
import background2 from "/assets/backgrounds/background2.jpeg";
import life from "/assets/heart.png";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Load cars (backward and forward)
    this.load.image("car1", car1);
    this.load.image("car2", car2);
    this.load.image("car3", car3);
    this.load.image("car4", car4);
    this.load.image("car5", car5);
    this.load.image("car6", car6);
    this.load.image("car7", car7);
    this.load.image("car8", car8);
    this.load.image("car9", car9);
    this.load.image("car10", car10);
    this.load.image("car11", car11);
    this.load.image("car12", car12);
    this.load.image("car13", car13);

    this.load.image("car1forward", car1forward);
    this.load.image("car2forward", car2forward);
    this.load.image("car3forward", car3forward);
    this.load.image("car4forward", car4forward);
    this.load.image("car5forward", car5forward);
    this.load.image("car6forward", car6forward);
    this.load.image("car7forward", car7forward);
    this.load.image("car8forward", car8forward);
    this.load.image("car9forward", car9forward);
    this.load.image("car10forward", car10forward);
    this.load.image("car11forward", car11forward);
    this.load.image("car12forward", car12forward);
    this.load.image("car13forward", car13forward);

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
    // Create a cobble stone road asset
    this.load.image("road", "/assets/backgrounds/LavaRoad.png");

  }

  create() {
    this.scene.start("MainMenu");
  }
}


// import { Scene } from "phaser";

// export class Boot extends Scene {
//   constructor() {
//     super("Boot");
//   }

//   preload() {
//     const totalCars = 13;  // Define how many cars you have (adjust this number based on your assets)
    
//     for (let i = 1; i <= totalCars; i++) {
//       this.load.image(`car${i}`, `/assets/vehiclesBackward/car${i}.png`);
//       this.load.image(`car${i}forward`, `/assets/vehicleForward/car${i}forward.png`);
//     }

//     // Load other assets (static)
//     this.load.image("tractor", "/assets/vehiclesBackward/tractor.png");
//     this.load.image("tractorforward", "/assets/vehicleForward/tractorForward.png");
    
//     this.load.image("ShortLog", "/assets/ShortLog.png");
//     this.load.image("LongLog", "/assets/LongLog.png");
//     this.load.image("turtle", "/assets/turtle.png");
//     this.load.image("turtleforward", "/assets/turtleforward.png");

//     this.load.image("shermie", "/assets/shermie.png");
//     this.load.image("background", "/assets/backgrounds/background.jpeg");
//     this.load.image("background2", "/assets/backgrounds/background2.jpeg");
//     this.load.image("life", "/assets/heart.png");
//   }

//   create() {
//     // this.scene.start("Game", { level: 0 }); //dev level on start
//     this.scene.start("MainMenu");
//   }
// }
