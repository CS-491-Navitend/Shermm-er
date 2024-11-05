
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
import turtleforward from "/assets/WaterLevel/turtleforward.png";
import turtleShort from "/assets/WaterLevel/turtlesShort.png";
import turtleLong from "/assets/WaterLevel/turtlesLong.png";
import turtleShortForward from "/assets/WaterLevel/turtlesShortForward.png";
import turtleLongForward from "/assets/WaterLevel/turtlesLongForward.png";
import turtleShortSink1 from "/assets/WaterLevel/turtlesShortSink1.png";
import turtleLongSink1 from "/assets/WaterLevel/turtlesLongSink1.png";
import turtleShortSink2 from "/assets/WaterLevel/turtlesShortSink2.png";
import turtleLongSink2 from "/assets/WaterLevel/turtlesLongSink2.png";
import waterObjective from "/assets/WaterLevel/waterObjective.png";

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
import iceTurtle from "/assets/IceLevel/iceTurtle.png";

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
import lavaTurtle from "/assets/LavaLevel/lavaTurtle.png";

// Import Sky Assets
import skySafeZone from "/assets/SkyLevel/skySafeZone.png";
import sky from "/assets/SkyLevel/sky.png";
import skyRoad from "/assets/SkyLevel/skyRoad.png";
import skyGoal from "/assets/SkyLevel/skyGoal.png";
import skyObjective from "/assets/SkyLevel/skyObjective.png";
import lightningBolt from "/assets/SkyLevel/lightningBolt.png";
import lightningBoltForward from "/assets/SkyLevel/lightningBoltForward.png";
import wind from "/assets/SkyLevel/wind.png";
import windForward from "/assets/SkyLevel/windForward.png";
import blimp from "/assets/SkyLevel/blimp.png";
import blimpForward from "/assets/SkyLevel/blimpForward.png";
import cloudsLong from "/assets/SkyLevel/cloudsLong.png";
import cloudsShort from "/assets/SkyLevel/cloudsShort.png";


//Import UI and Background
import backgroundMain from "/assets/UI/ShermMainMenu.png";
import button from "/assets/UI/Button.png";


//import batman assets
import batman from "/assets/BatmanLevel/batman.png";
import batmanSafeZone from "/assets/BatmanLevel/batmanSafeZone.png";
import batmanRoad from "/assets/BatmanLevel/batmanRoad.png";
import batmanGoal from "/assets/BatmanLevel/batmanGoal.png";
import batmanObjective from "/assets/BatmanLevel/batmanObjective.png";
import batmanBarrel from "/assets/BatmanLevel/barrel.png";
import batmobile from "/assets/BatmanLevel/batmobile.png";
import bap from "/assets/BatmanLevel/bap.png";
import fwip from "/assets/BatmanLevel/fwip.png";

//import desert assets
import desert from "/assets/desertLevel/desert.png";
import deserSafeZone from "/assets/desertLevel/desertSafeZone.png";
import desertRoad from "/assets/desertLevel/desertRoad.png";
import desertGoal from "/assets/desertLevel/desertGoal.png";
import desertBuggy1 from "/assets/desertLevel/desertBuggy1.png";
import desertBuggy2 from "/assets/desertLevel/desertBuggy2.png";
import desertTruck from "/assets/desertLevel/desertTruck.png";
import desertObjective from "/assets/desertLevel/desertObjective.png";
import desertTurtle from "/assets/desertLevel/desertTurtle.png";
import desertLog from "/assets/desertLevel/desertLog.png";
import desertLog2 from "/assets/desertLevel/desertLog2.png";


//swamp assets
import swamp from "/assets/SwampLevel/swamp.png";
import swampSafeZone from "/assets/SwampLevel/swampSafeZone.png";
import swampGoal from "/assets/SwampLevel/swampGoal.png";
import swampObjective from "/assets/SwampLevel/swampObjective.png";
import swampRoad from "/assets/SwampLevel/swampRoad.png";
import swampLog from "/assets/SwampLevel/swampLog.png";
import swampTurtle from "/assets/SwampLevel/swampTurtle.png";
import swampBuggy2 from "/assets/SwampLevel/swampBuggy2.png";
import swampATV from "/assets/SwampLevel/swampATV.png";
import swampBuggy2Forward from "/assets/SwampLevel/swampBuggy2Forward.png";
import swampATVForward from "/assets/SwampLevel/swampATVForward.png";

//import outerspace assets
import outerSpace from "/assets/OuterSpaceLevel/outerSpace.png";
import outerSpaceRoad from "/assets/OuterSpaceLevel/outerSpaceRoad.png";
import outerSpaceSafeZone from "/assets/OuterSpaceLevel/outerSpaceSafeZone.png";
import outerSpaceRock from "/assets/OuterSpaceLevel/outerSpaceRock.png";
import outerSpaceGoal from "/assets/OuterSpaceLevel/outerSpaceGoal.png";
import outerSpaceObjective from "/assets/OuterSpaceLevel/outerSpaceObjective.png";
import outerSpaceCar1 from "/assets/OuterSpaceLevel/outerSpaceCar1.png";
import outerSpaceCar1b from "/assets/OuterSpaceLevel/outerSpaceCar1b.png";
import outerSpaceCar2 from "/assets/OuterSpaceLevel/outerSpaceCar2.png";
import outerSpaceCar2b from "/assets/OuterSpaceLevel/outerSpaceCar2b.png";
import comet from "/assets/OuterSpaceLevel/comet.png";


//cake assets
import cake from "/assets/CakeLevel/Cake.png";
import cakeSafeZone from "/assets/CakeLevel/ShortcakeSafeZone.png";
import cakeRoad from "/assets/CakeLevel/CakeRoad.png";
import cakeGoal from "/assets/CakeLevel/CakeGoal.png";
import cakeObjective from "/assets/CakeLevel/CakeObjective.png";
import cakeCherry from "/assets/CakeLevel/cherry.png"
import cakeCar1 from "/assets/CakeLevel/cakeCar1.png";
import cakeCar2 from "/assets/CakeLevel/iceCreamTruck.png";

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
    this.load.image("turtleShort", turtleShort);
    this.load.image("turtleLong", turtleLong);
    this.load.image("turtleShortForward", turtleShortForward);
    this.load.image("turtleLongForward", turtleLongForward);
    this.load.image("turtleShortSink1", turtleShortSink1);
    this.load.image("turtleLongSink1", turtleLongSink1);
    this.load.image("turtleShortSink2", turtleShortSink2);
    this.load.image("turtleLongSink2", turtleLongSink2);
    this.load.image("shermie", shermie);
    this.load.image("life", life);

    this.load.image("lavaLog", lavaLog);
    this.load.image("death1", death1);
    this.load.image("death2", death2);
    this.load.image("death3", death3);
    this.load.image("death4", death4);

    
    // Audio Assets
    this.load.audio("hop", "/assets/audio/hop.wav");
    this.load.audio("squash", "/assets/audio/squash.wav");
    this.load.audio("plunk", "/assets/audio/plunk.wav");
    this.load.audio("backgroundMusic", "/assets/audio/backgroundMusic.mp3");


    //water Assets (default level)
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
    this.load.image("iceTurtle", iceTurtle);

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
    this.load.image("lavaTurtle", lavaTurtle);

    // batman Assets
    this.load.image("batman", batman);
    this.load.image("batmanSafeZone", batmanSafeZone);
    this.load.image("batmanRoad", batmanRoad);
    this.load.image("batmanGoal", batmanGoal);
    this.load.image("batmanObjective", batmanObjective);
    this.load.image("batmanBarrel", batmanBarrel);
    this.load.image("batmobile", batmobile);
    this.load.image("bap", bap);
    this.load.image("fwip", fwip);

    // Outer Space Assets
    this.load.image("outerSpace", outerSpace);
    this.load.image("outerSpaceRoad", outerSpaceRoad);
    this.load.image("outerSpaceSafeZone", outerSpaceSafeZone);
    this.load.image("outerSpaceRock", outerSpaceRock);
    this.load.image("outerSpaceGoal", outerSpaceGoal);
    this.load.image("outerSpaceObjective", outerSpaceObjective);
    this.load.image("outerSpaceCar1", outerSpaceCar1);
    this.load.image("outerSpaceCar1b", outerSpaceCar1b);
    this.load.image("outerSpaceCar2", outerSpaceCar2);
    this.load.image("outerSpaceCar2b", outerSpaceCar2b);
    this.load.image("comet", comet);
    
    
    //Sky Assets
    this.load.image("skySafeZone", skySafeZone);
    this.load.image("sky", sky);
    this.load.image("skyRoad", skyRoad);
    this.load.image("skyGoal", skyGoal);
    this.load.image("skyObjective", skyObjective)
    this.load.image("lightningBolt", lightningBolt);
    this.load.image("lightningBoltForward", lightningBoltForward);
    this.load.image("wind", wind);  
    this.load.image("windForward", windForward);
    this.load.image("blimp", blimp);
    this.load.image("blimpForward", blimpForward);
    this.load.image("cloudsShort", cloudsShort);
    this.load.image("cloudsLong", cloudsLong);


    //desert Assets
    this.load.image("desert", desert);
    this.load.image("desertSafeZone", deserSafeZone);
    this.load.image("desertGoal", desertGoal);
    this.load.image("desertRoad", desertRoad);
    this.load.image("desertBuggy1", desertBuggy1);
    this.load.image("desertBuggy2", desertBuggy2);
    this.load.image("desertTruck", desertTruck);
    this.load.image("desertObjective", desertObjective);
    this.load.image("desertTurtle", desertTurtle);
    this.load.image("desertLog", desertLog);
    this.load.image("desertLog2", desertLog2);

    //swamp assets
    this.load.image("swamp", swamp);
    this.load.image("swampSafeZone", swampSafeZone);
    this.load.image("swampGoal", swampGoal);
    this.load.image("swampObjective", swampObjective);
    this.load.image("swampRoad", swampRoad);
    this.load.image("swampLog", swampLog);
    this.load.image("swampTurtle", swampTurtle);
    this.load.image("swampBuggy2", swampBuggy2);
    this.load.image("swampATV", swampATV);
    this.load.image("swampBuggy2Forward", swampBuggy2Forward);
    this.load.image("swampATVForward", swampATVForward);

    //cake assets
    this.load.image("cake", cake);
    this.load.image("cakeSafeZone", cakeSafeZone);
    this.load.image("cakeRoad", cakeRoad);
    this.load.image("cakeGoal", cakeGoal);
    this.load.image("cakeObjective", cakeObjective);
    this.load.image("cherry", cakeCherry);
    this.load.image("cakeCar1", cakeCar1);
    this.load.image("cakeCar2", cakeCar2);


    //UI and Background
    this.load.image("background", backgroundMain);
    this.load.image("button", button);

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
    // this.scene.start("Game", { level: 5 }); //dev level on start
  }
}
