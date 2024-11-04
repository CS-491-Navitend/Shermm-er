import { Scene } from "phaser";

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
import tractor from "/assets/vehiclesBackward/tractor.png";

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
import tractorforward from "/assets/vehicleForward/tractorForward.png";

// Import generic assets
import shermie from "/assets/shermie.png";
import life from "/assets/heart.png";
import death1 from "/assets/death1.png";
import death2 from "/assets/death2.png";
import death3 from "/assets/death3.png";
import death4 from "/assets/death4.png";

//Import Water assets
import waterSafeZone from "/assets/WaterLevel/waterSafeZone.png";
import water from "/assets/WaterLevel/water.png";
import waterGoal from "/assets/WaterLevel/waterGoal.png";
import ShortLog from "/assets/WaterLevel/ShortLog.png";
import LongLog from "/assets/WaterLevel/LongLog.png";
import turtle from "/assets/WaterLevel/turtle.png";
import waterObjective from "/assets/WaterLevel/waterObjective.png";
import turtleforward from "/assets/WaterLevel/turtleforward.png";

//Import Ice assets
import iceSafeZone from "/assets/IceLevel/IceSafeZone.png";
import ice from "/assets/IceLevel/ice.png";
import iceGoal from "/assets/IceLevel/iceGoal.png";
import iceObjective from "/assets/IceLevel/iceObjective.png";
import iceRoad from "/assets/IceLevel/iceRoad.png";
import iceLog from "/assets/IceLevel/iceLog.png";
import iceberg from "/assets/IceLevel/iceberg.png";
import iceCar1 from "/assets/IceLevel/iceCar1.png";
import iceTractor from "/assets/IceLevel/iceTruck.png";

// Import Lava assets
import lavaSafeZone from "/assets/LavaLevel/LavaSafeZone.png";
import lava from "/assets/LavaLevel/Lava.png";
import lavaGoal from "/assets/LavaLevel/LavaGoal.png";
import lavaObjective from "/assets/LavaLevel/LavaObjective.png";
import rock from "/assets/LavaLevel/Rock.png";
import lavaLog from "/assets/LavaLevel/LavaLog1.png";
import lavaRoad from "/assets/LavaLevel/LavaRoad.png";
import LavaTractor from "/assets/LavaLevel/LavaTruck.png";
import LavaCar1 from "/assets/LavaLevel/LavaCar.png";
import LavaCar2 from "/assets/LavaLevel/LavaCar2.png";

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

    this.load.image("lavaLog", lavaLog);
    this.load.image("death1", death1);
    this.load.image("death2", death2);
    this.load.image("death3", death3);
    this.load.image("death4", death4);

    //water Assets
    this.load.image("waterSafeZone", waterSafeZone);
    this.load.image("water", water);
    this.load.image("waterGoal", waterGoal);
    this.load.image("waterObjective", waterObjective);

    //ice Assets
    this.load.image("iceSafeZone", iceSafeZone);
    this.load.image("ice", ice);
    this.load.image("iceGoal", iceGoal);
    this.load.image("iceObjective", iceObjective);
    this.load.image("iceRoad", iceRoad);
    this.load.image("iceLog", iceLog);
    this.load.image("iceCar1", iceCar1);
    this.load.image("iceTruck", iceTractor);
    this.load.image("iceberg", iceberg);

    // Lava Assets
    this.load.image("lavaSafeZone", lavaSafeZone);
    this.load.image("lava", lava);
    this.load.image("lavaGoal", lavaGoal);
    this.load.image("rock", rock);
    this.load.image("lavaRoad", lavaRoad);
    this.load.image("lavaObjective", lavaObjective);
    this.load.image("lavaCar1", LavaCar1);
    this.load.image("lavaCar2", LavaCar2);
    this.load.image("lavaTruck", LavaTractor);
    //this.load.image("waterRoad", waterRoad);

    // Audio Assets
    this.load.audio("hop", "/assets/audio/hop.wav");
    this.load.audio("squash", "/assets/audio/squash.wav");
    this.load.audio("plunk", "/assets/audio/plunk.wav");
    this.load.audio("backgroundMusic", "/assets/audio/backgroundMusic.mp3");
  }

  create() {
    this.scene.start("MainMenu");
    // this.scene.start("Game", { level: 0 }); //dev level on start
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
