
import { Scene } from "phaser";
//importing custom fonts
import FontFaceObserver from 'fontfaceobserver';

// Import car assets (backward and forward)
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

// Import other assets
import tractor from "/assets/vehiclesBackward/tractor.png";
import tractorforward from "/assets/vehicleForward/tractorForward.png";
import ShortLog from "/assets/ShortLog.png";
import LongLog from "/assets/LongLog.png";
import turtle from "/assets/turtle.png";
import turtleforward from "/assets/turtleforward.png";
import shermie from "/assets/shermie.png";
import life from "/assets/heart.png";

// Import background assets
import background from "/assets/backgrounds/background.jpeg";
import background2 from "/assets/backgrounds/background2.jpeg";
import lavaSafeZone from "/assets/backgrounds/LavaBrick.png";
import lava from "/assets/backgrounds/Lava.png";
import lavaGoal from "/assets/backgrounds/LavaGoal.png";
import rock from "/assets/backgrounds/Rock.png";
import lavaRoad from "/assets/backgrounds/LavaRoad.png";
import waterRoad from "/assets/backgrounds/Lava.png";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Load cars (backward and forward)
    const carsBackward = [car1, car2, car3, car4, car5, car6, car7, car8, car9, car10, car11, car12, car13];
    const carsForward = [car1forward, car2forward, car3forward, car4forward, car5forward, car6forward, car7forward, car8forward, car9forward, car10forward, car11forward, car12forward, car13forward];

    carsBackward.forEach((car, index) => this.load.image(`car${index + 1}`, car));
    carsForward.forEach((car, index) => this.load.image(`car${index + 1}forward`, car));

    // Load other assets (static)
    this.load.image("tractor", tractor);
    this.load.image("tractorforward", tractorforward);
    this.load.image("ShortLog", ShortLog);
    this.load.image("LongLog", LongLog);
    this.load.image("turtle", turtle);
    this.load.image("turtleforward", turtleforward);
    this.load.image("shermie", shermie);
    this.load.image("life", life);

    // Load textures for background
    this.load.image("lavaSafeZone", lavaSafeZone);
    this.load.image("lava", lava);
    this.load.image("lavaGoal", lavaGoal);
    this.load.image("rock", rock);
    this.load.image("lavaRoad", lavaRoad);
    //this.load.image("waterRoad", waterRoad);

    //Font Family
    const font = new FontFaceObserver('Pixel');
        font.load().then(() => {
            console.log('Font loaded successfully!');
            // Optionally, you can store a flag or execute any logic here
        }).catch(() => {
            console.error('Font failed to load.');
        });
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