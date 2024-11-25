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
import shermieRed from "/assets/shermieRed.png";
import shermieBlue from "/assets/shermieBlue.png";
import shermieGreen from "/assets/shermieGreen.png";
import shermieYellow from "/assets/shermieYellow.png";
import shermieOrange from "/assets/shermieOrange.png";
import shermiePurple from "/assets/shermiePurple.png";
import shermieBomb from "/assets/shermieBombSheet.png";
import shermieToxic from "/assets/shermieToxic.png";

import life from "/assets/heart.png";
import death1 from "/assets/death1.png";
import death2 from "/assets/death2.png";
import death3 from "/assets/death3.png";
import death4 from "/assets/death4.png";

//Import Powerup Assets
import antidote from "/assets/PowerUps/Antidote.png";
import invulnerability from "/assets/PowerUps/Invulnerability.png";
import selfService from "/assets/PowerUps/SelfService.png";

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
import iceTurtleSink1 from "/assets/IceLevel/turtleSink1.png";
import iceTurtleSink2 from "/assets/IceLevel/turtleSink2.png";
import iceTurtleSink3 from "/assets/IceLevel/turtleSink3.png";

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
import lavaTurtleSink1 from "/assets/LavaLevel/turtleSink1.png";
import lavaTurtleSink2 from "/assets/LavaLevel/turtleSink2.png";
import lavaTurtleSink3 from "/assets/LavaLevel/turtleSink3.png";

// Import Sky Assets4
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
import skyTurtleSink1 from "/assets/SkyLevel/turtleSink1.png";
import skyTurtleSink2 from "/assets/SkyLevel/turtleSink2.png";
import skyTurtleSink3 from "/assets/SkyLevel/turtleSink3.png";

//Import UI and Background
import backgroundMain from "/assets/UI/ShermMainMenu.png";
import buttonImage from "/assets/UI/Button.png";

//import batman assets
import batman from "/assets/BatmanLevel/batman.png";
import batmanSafeZone from "/assets/BatmanLevel/batmanSafeZone.png";
import batmanRoad from "/assets/BatmanLevel/batmanRoad.png";
import batmanGoal from "/assets/BatmanLevel/batmanGoal.png";
import batmanObjective from "/assets/BatmanLevel/batmanObjective.png";
import batmanBarrel from "/assets/BatmanLevel/barrel.png";
import batmobile from "/assets/BatmanLevel/batmobile.png";
import batmobileForward from "/assets/BatmanLevel/batmobileForward.png";
import bap from "/assets/BatmanLevel/bap.png";
import fwip from "/assets/BatmanLevel/fwip.png";
import joker from "/assets/BatmanLevel/joker.png";
import batmanTurtleSink1 from "/assets/BatmanLevel/turtleSink1.png";
import batmanTurtleSink2 from "/assets/BatmanLevel/turtleSink2.png";
import batmanTurtleSink3 from "/assets/BatmanLevel/turtleSink3.png";

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
import desertTurtleSink1 from "/assets/desertLevel/turtleSink1.png";
import desertTurtleSink2 from "/assets/desertLevel/turtleSink2.png";
import desertTurtleSink3 from "/assets/desertLevel/turtleSink3.png";

//swamp assets
import swamp from "/assets/SwampLevel/swamp.png";
import swampSafeZone from "/assets/SwampLevel/swampSafeZone.png";
import swampGoal from "/assets/SwampLevel/swampGoal.png";
import swampObjective from "/assets/SwampLevel/swampObjective.png";
import swampRoad from "/assets/SwampLevel/swampRoad.png";
import swampLog from "/assets/SwampLevel/swampLog.png";
import swampBuggy2 from "/assets/SwampLevel/swampBuggy2.png";
import swampATV from "/assets/SwampLevel/swampATV.png";
import swampBuggy2Forward from "/assets/SwampLevel/swampBuggy2Forward.png";
import swampATVForward from "/assets/SwampLevel/swampATVForward.png";
import swampTurtle from "/assets/SwampLevel/swampTurtle.png";
import swampTurtleSink1 from "/assets/SwampLevel/turtleSink1.png";
import swampTurtleSink2 from "/assets/SwampLevel/turtleSink2.png";
import swampTurtleSink3 from "/assets/SwampLevel/turtleSink3.png";

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
import outerSpaceTurtleSink1 from "/assets/OuterSpaceLevel/turtleSink1.png";
import outerSpaceTurtleSink2 from "/assets/OuterSpaceLevel/turtleSink2.png";
import outerSpaceTurtleSink3 from "/assets/OuterSpaceLevel/turtleSink3.png";

//cake assets
import cake from "/assets/CakeLevel/Cake.png";
import cakeSafeZone from "/assets/CakeLevel/ShortcakeSafeZone.png";
import cakeRoad from "/assets/CakeLevel/CakeRoad.png";
import cakeGoal from "/assets/CakeLevel/CakeGoal.png";
import cakeObjective from "/assets/CakeLevel/CakeObjective.png";
import cakeCar1 from "/assets/CakeLevel/cakeCar1.png";
import cakeCar2 from "/assets/CakeLevel/cakeCar2.png";
import banana from "/assets/CakeLevel/banana.png";
import cakeCherry from "/assets/CakeLevel/cherry.png"
import cakeTurtleSink1 from "/assets/CakeLevel/turtleSink1.png";
import cakeTurtleSink2 from "/assets/CakeLevel/turtleSink2.png";
import cakeTurtleSink3 from "/assets/CakeLevel/turtleSink3.png";

//sound assets
import hop from "/assets/audio/hop.wav"
import squash from "/assets/audio/squash.wav"
import plunk from "/assets/audio/plunk.wav"
import backgroundMusic from "/assets/audio/backgroundMusic.mp3"

//goal zone block
import goalBlock from "/assets/GoalZoneBlock.png";

//advanced assets
import pasture from "/assets/pasture.png"
import pasture_end from "/assets/pasture_end.png"


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
    this.load.image("shermie", shermie);
    this.load.image("shermieRed", shermieRed);
    this.load.image("shermieBlue", shermieBlue);
    this.load.image("shermieYellow", shermieYellow);
    this.load.image("shermieGreen", shermieGreen);
    this.load.image("shermieOrange", shermieOrange);
    this.load.image("shermiePurple", shermiePurple);
    this.load.image("shermieToxic", shermieToxic);
    this.load.image("life", life);

    this.load.spritesheet("shermieBomb", shermieBomb, {
          frameWidth: 57,
          frameHeight: 42
    });

    this.load.image("lavaLog", lavaLog);
    this.load.image("death1", death1);
    this.load.image("death2", death2);
    this.load.image("death3", death3);
    this.load.image("death4", death4);

    // PowerUps
    this.load.image("antidote", antidote);
    this.load.image("invulnerability", invulnerability);
    this.load.image("selfService", selfService);

    // turtleSink assets
    this.load.image("turtleShortSink1", turtleShortSink1);
    this.load.image("turtleLongSink1", turtleLongSink1);
    this.load.image("turtleShortSink2", turtleShortSink2);
    this.load.image("turtleLongSink2", turtleLongSink2);
    
    this.load.image("iceTurtleSink1", iceTurtleSink1);
    this.load.image("iceTurtleSink2", iceTurtleSink2);
    this.load.image("iceTurtleSink3", iceTurtleSink3);

    this.load.image("lavaTurtleSink1", lavaTurtleSink1);
    this.load.image("lavaTurtleSink2", lavaTurtleSink2);
    this.load.image("lavaTurtleSink3", lavaTurtleSink3);

    this.load.image("skyTurtleSink1", skyTurtleSink1);
    this.load.image("skyTurtleSink2", skyTurtleSink2);
    this.load.image("skyTurtleSink3", skyTurtleSink3);

    this.load.image("batmanTurtleSink1", batmanTurtleSink1);
    this.load.image("batmanTurtleSink2", batmanTurtleSink2);
    this.load.image("batmanTurtleSink3", batmanTurtleSink3);

    this.load.image("desertTurtleSink1", desertTurtleSink1);
    this.load.image("desertTurtleSink2", desertTurtleSink2);
    this.load.image("desertTurtleSink3", desertTurtleSink3);

    this.load.image("swampTurtleSink1", swampTurtleSink1);
    this.load.image("swampTurtleSink2", swampTurtleSink2);
    this.load.image("swampTurtleSink3", swampTurtleSink3);

    this.load.image("outerSpaceTurtleSink1", outerSpaceTurtleSink1);
    this.load.image("outerSpaceTurtleSink2", outerSpaceTurtleSink2);
    this.load.image("outerSpaceTurtleSink3", outerSpaceTurtleSink3);

    this.load.image("cakeTurtleSink1", cakeTurtleSink1);
    this.load.image("cakeTurtleSink2", cakeTurtleSink2);
    this.load.image("cakeTurtleSink3", cakeTurtleSink3);
    
    // Audio Assets
    this.load.audio("hop", hop);
    this.load.audio("squash", squash);
    this.load.audio("plunk", plunk);
    this.load.audio("backgroundMusic", backgroundMusic);

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
    this.load.image("batmobileForward", batmobileForward);
    this.load.image("bap", bap);
    this.load.image("fwip", fwip);
    this.load.image("joker", joker);
    
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
    this.load.image("banana", banana);

    //advanced feature assets
    this.load.image("pasture", pasture);
    this.load.image("pasture_end", pasture_end);


    //UI and Background
    this.load.image("background", backgroundMain);
    this.load.image("buttonImage", buttonImage);

    //goal block
    this.load.image("goalBlock", goalBlock);

    //Font Family
    const font = new FontFaceObserver('Pixel');
        // font.load().then(() => {
        //     // console.log('Font loaded successfully!');
        //    
        // }).catch(() => {
        //     console.error('Font failed to load.');
        // });



  }

  create() {
    this.scene.start("MainMenu");
    // this.scene.start("Game", { level: 5 }); //dev level on start
  }
}
