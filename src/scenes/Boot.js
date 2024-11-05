import { Scene } from "phaser";

// Import car assets (backward and forward)
import car1 from "/assets/vehiclesBackward/car1.png";
import car2 from "/assets/vehiclesBackward/car2.png";
import car3 from "/assets/vehiclesBackward/car3.png";
import tractor from "/assets/vehiclesBackward/tractor.png";

import car1forward from "/assets/vehicleForward/car1forward.png";
import car2forward from "/assets/vehicleForward/car2forward.png";
import car3forward from "/assets/vehicleForward/car3forward.png";
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

//import batman assets
import batman from "/assets/BatmanLevel/batman.png";
import batmanSafeZone from "/assets/BatmanLevel/batmanSafeZone.png";
import batmanRoad from "/assets/BatmanLevel/batmanRoad.png";
import batmanGoal from "/assets/BatmanLevel/batmanGoal.png";
import batmanObjective from "/assets/BatmanLevel/batmanObjective.png";
import batmanBarrel from "/assets/BatmanLevel/barrel.png";
import batmobile from "/assets/BatmanLevel/batmobile.png";


//import desert assets
import desert from "/assets/desertLevel/desert.png";
import deserSafeZone from "/assets/desertLevel/desertSafeZone.png";
import desertRoad from "/assets/desertLevel/desertRoad.png";
import desertGoal from "/assets/desertLevel/desertGoal.png";
import desertBuggy1 from "/assets/desertLevel/desertBuggy1.png";
import desertBuggy2 from "/assets/desertLevel/desertBuggy2.png";
import desertTruck from "/assets/desertLevel/desertTruck.png";
import desertObjective from "/assets/desertLevel/desertObjective.png";

//swamp assets
import swamp from "/assets/SwampLevel/swamp.png"
import swampSafeZone from "/assets/SwampLevel/swampSafeZone.png";
import swampGoal from "/assets/SwampLevel/swampGoal.png";
import swampObjective from "/assets/SwampLevel/swampObjective.png";
import swampRoad from "/assets/SwampLevel/swampRoad.png";
import swampLog from "/assets/SwampLevel/swampLog.png";


export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Load cars (backward and forward)
    const carsBackward = [car1, car2, car3];
    const carsForward = [car1forward, car2forward, car3forward];

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

    // Audio Assets
    this.load.audio("hop", "/assets/audio/hop.wav");
    this.load.audio("squash", "/assets/audio/squash.wav");
    this.load.audio("plunk", "/assets/audio/plunk.wav");
    this.load.audio("backgroundMusic", "/assets/audio/backgroundMusic.mp3");

    // Lava Assets
    this.load.image("batman", batman);
    this.load.image("batmanSafeZone", batmanSafeZone);
    this.load.image("batmanRoad", batmanRoad);
    this.load.image("batmanGoal", batmanGoal);
    this.load.image("batmanObjective", batmanObjective);
    this.load.image("batmanBarrel", batmanBarrel);
    this.load.image("batmobile", batmobile);


    //desert Assets
    this.load.image("desert", desert);
    this.load.image("desertSafeZone", deserSafeZone);
    this.load.image("desertGoal", desertGoal);
    this.load.image("desertRoad", desertRoad);
    this.load.image("desertBuggy1", desertBuggy1);
    this.load.image("desertBuggy2", desertBuggy2);
    this.load.image("desertTruck", desertTruck);
    this.load.image("desertObjective", desertObjective);

    //swamp assets
    this.load.image("swamp", swamp);
    this.load.image("swampSafeZone", swampSafeZone);
    this.load.image("swampGoal", swampGoal);
    this.load.image("swampObjective", swampObjective);
    this.load.image("swampRoad", swampRoad);
    this.load.image("swampLog", swampLog);

  }

  create() {
    this.scene.start("MainMenu");
    // this.scene.start("Game", { level: 0 }); //dev level on start
  }
}
