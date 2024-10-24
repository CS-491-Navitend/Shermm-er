import { Scene } from "phaser";

// Import assets directly
import car1 from "/assets/Level1/car1.png";
import car2 from "/assets/Level1/car2.png";
import car3 from "/assets/Level1/car3.png";
import car4 from "/assets/Level2/car4.png";
import car5 from "/assets/Level2/car5.png";
import car6 from "/assets/Level2/car6.png";
import car7 from "/assets/Level3/car7.png";
import car8 from "/assets/Level3/car8.png";
import car9 from "/assets/Level3/car9.png";
// import car10 from "/assets/vehiclesBackward/car10.png";
// import car11 from "/assets/vehiclesBackward/car11.png";
// import car12 from "/assets/vehiclesBackward/car12.png";
// import car13 from "/assets/vehiclesBackward/car13.png";
import car1forward from "/assets/Level1/car1forward.png";
import car2forward from "/assets/Level1/car2forward.png";
import car3forward from "/assets/Level1/car3forward.png";
import car4forward from "/assets/Level2/car4forward.png";
import car5forward from "/assets/Level2/car5forward.png";
import car6forward from "/assets/Level2/car6forward.png";
import car7forward from "/assets/Level3/car7forward.png";
import car8forward from "/assets/Level3/car8forward.png";
import car9forward from "/assets/Level3/car9forward.png";
// import car10forward from "/assets/vehicleForward/car10forward.png";
// import car11forward from "/assets/vehicleForward/car11forward.png";
// import car12forward from "/assets/vehicleForward/car12forward.png";
// import car13forward from "/assets/vehicleForward/car13forward.png";

import tractor from "/assets/tractor.png";
import tractorforward from "/assets/tractorForward.png";
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
    // this.load.image("car10", car10);
    // this.load.image("car11", car11);
    // this.load.image("car12", car12);
    // this.load.image("car13", car13);

    this.load.image("car1forward", car1forward);
    this.load.image("car2forward", car2forward);
    this.load.image("car3forward", car3forward);
    this.load.image("car4forward", car4forward);
    this.load.image("car5forward", car5forward);
    this.load.image("car6forward", car6forward);
    this.load.image("car7forward", car7forward);
    this.load.image("car8forward", car8forward);
    this.load.image("car9forward", car9forward);
    // this.load.image("car10forward", car10forward);
    // this.load.image("car11forward", car11forward);
    // this.load.image("car12forward", car12forward);
    // this.load.image("car13forward", car13forward);

    // Load other assets (static)
    this.load.image("tractor", "/assets/tractor.png");
    this.load.image("tractorforward", "/assets/tractorForward.png");
    
    this.load.image("ShortLog", "/assets/ShortLog.png");
    this.load.image("LongLog", "/assets/LongLog.png");
    this.load.image("turtle", "/assets/turtle.png");
    this.load.image("turtleforward", "/assets/turtleforward.png");

    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("life", "/assets/heart.png");

    //Load Level 1 Background
    this.load.image("road", "/assets/Level1/Level1Road.png");
    this.load.image("safeZone", "/assets/Level1/Level1SafeZone.png");
    this.load.image("water", "/assets/Level1/Level1Water.png");
    this.load.image("goalZone", "/assets/Level1/Level1Goal.jpg");

    //Load Level 2 Background
    this.load.image("road2", "/assets/Level2/Level2Road.png");
    this.load.image("icesafeZone2", "/assets/Level2/Level2SafeZone.png");
    this.load.image("ice", "/assets/Level2/Level2Water.png");
    this.load.image("goalZone2", "/assets/Level2/Level2Goal.png");

    // Load Level 3 Background
    this.load.image("LavaBrick", "/assets/Level3/LavaBrick.png");
    this.load.image("lava", "/assets/Level3/Lava.png");
    this.load.image("goalZone", "/assets/Level3/GoalZone.png");
    this.load.image("lavaGoal", "/assets/Level3/LavaGoal.png");
    this.load.image("lavaSafeZone", "/assets/Level3/LavaSafeZone.png");
    this.load.image("rock", "/assets/Level3/Rock.png");
    // Create a cobble stone road asset
    this.load.image("road", "/assets/Level3/LavaRoad.png");

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
