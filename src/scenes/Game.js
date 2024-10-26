import { Scene } from "phaser";
import { PauseMenu } from "./Menus/PauseMenu"
import { GameLogic } from "/src/lib/GameLogic";
import { Drawing } from "/src/lib/Drawing";
import { Timer } from "/src/lib/Timer";
import { createVehicles, createLogs } from '/src/lib/Spawner.js';
import { levels } from "/src/lib/levels";

export class Game extends Scene {
  constructor() {
    super("Game");

    // level
    this.level = 0;

    // game screen size
    this.width = 1000;
    this.height = 1000;
    
    this.paused = false;

    //Physics objects and other game information
    this.playing = true;
    this.canMove = true;
    this.shermie = null;
    this.vehicles = null;
    this.logs = null;
    this.turtles = null;
    this.winCount = 0;
    this.lives = 0;
    this.resetCount = 0;
    this.goalCount = 0;
    this.numOfGoals = 5;

    // road values
    this.moveDistance = 80;
    this.numberOfRoads = 5;
    this.safeZoneSize = 80;

    //water values
    this.moveDistance = 80;
    this.numberOfLanes = 5;

    // dynamic values (from levels.json)
    this.timerDuration = 0;
    this.timeRemaining = this.timerDuration;
    this.numberOfCars = 0;
    this.numberOfLogs = 0;
    this.numberOfFrogs = 0;
    this.carSpeedMultiplier = 1;
    this.logSpeedMultiplier = 1;
    this.frogSinkMultiplier = 1;

    this.gameLogic = new GameLogic(this);
    this.drawing = new Drawing(this);
    this.timer = new Timer(this);
  }

  create(data) {
    this.level = data["level"];
    console.log(this.level);
    this.timerDuration = levels[data["level"]]["time"];
    this.timeRemaining = this.timerDuration;

    this.lives = levels[data["level"]]["number_of_lives"];

    this.carSpeedMultiplier = levels[data["level"]]["car_speed_multiplier"];
    this.logSpeedMultiplier = levels[data["level"]]["log_speed_multiplier"];
    this.frogSinkMultiplier = levels[data["level"]]["turtle_sink_multiplier"];

    this.numberOfCars = levels[data["level"]]["number_of_cars"];
    this.numberOfLogs = levels[data["level"]]["number_of_logs"];
    this.logTexture = levels[data["level"]]["log_texture"];
    this.numberOfTurtles = levels[data["level"]]["number_of_turtles"];

    this.logTexture = levels[data["level"]]["log_texture"];
    this.logSpacing = levels[data["level"]]["log_spacing"];

    this.cars = levels[data["level"]]["car_texture"];
    this.carsForward = levels[data["level"]]["cars_Forward_texture"];
    this.carSpacing = levels[data["level"]]["car_spacing"];

    this.advanceNumber = levels[data["level"]]["goal_count"];

    //add Physics to the shermie sprite
    this.shermie = this.physics.add.sprite(this.width / 2, this.height - this.safeZoneSize + this.moveDistance / 2, "shermie");

    this.shermie.setSize(50, 50, true);//this manipulates hitbox of shermie
    this.shermie.setScale(1);//this manipulates scale of shermie
    this.shermie.setCollideWorldBounds(true);

    //User input for movements
    this.cursors = this.input.keyboard.createCursorKeys();

    //PauseMenu
    this.pauseMenu = new PauseMenu(this);
    this.pauseMenu.create();

    this.paused = false;

    this.input.keyboard.on('keydown-ENTER', () => {
        this.togglePause();
    });

    //Make roads
    const roadLines = this.add.graphics({
      lineStyle: { width: 5, color: 0xffffff },
    });
    const roadWidth = this.moveDistance;
    const roadStart = this.height - this.safeZoneSize;
    const roadEnd = roadStart - this.numberOfRoads * roadWidth;

    const zoneType = levels[data["level"]]["water_zone_type"];
    
    // solid road lines (top and bottom)
    roadLines.strokeLineShape(new Phaser.Geom.Line(0, roadStart, this.width, roadStart));
    roadLines.strokeLineShape(new Phaser.Geom.Line(0, roadEnd, this.width, roadEnd));

    // dashed road lines
     // half of the gap between the dashes - 10 in our case
     // the length of the dash - 30 in our case
     // the length of the gap between the dashes - 20 in our case
    for (let i = 0; i < this.numberOfRoads - 1; i++) {
      this.drawing.drawDashedLine(roadLines, 10, roadStart - i * roadWidth - roadWidth, this.width, roadStart - i * roadWidth - roadWidth, 30, 20);
    }

    // create goal
    const goalZone = this.physics.add.staticGroup();
    const endZone = this.physics.add.staticGroup();
    let goal;
    let end;
    
    // Check if zoneType exists and generate goal zone dynamically, otherwise default to green bar
    if (zoneType) {
      //const goalZoneTexture = zoneType + "Goal"; // Generate the texture name dynamically
      const goalZoneTexture = "goalZone";
      goal = this.add.image(this.width / 2, roadEnd - this.safeZoneSize - this.safeZoneSize / 2 - roadWidth * this.numberOfRoads, goalZoneTexture);
      goal.setScale(1, 1);
      this.physics.add.existing(goal, true);
      goalZone.add(goal);
      
      /*TODO - Generate the goal sprites dynamically
      let x = 150;
      for (let i = 0; i < this.numOfGoals; i++) {
        // Add physics and add to goalZone
        goal = this.add.image(x, roadEnd - this.safeZoneSize - this.safeZoneSize / 2 - roadWidth * this.numberOfRoads, 130, this.safeZoneSize, "LavaBrick");
        this.physics.add.existing(goal, true);
        goalZone.add(goal);
        x += 180;
      }
      */

    } else {
        // Default to a green bar across the top if no zoneType is provided
        const endZoneTexture = "goalZone";
        end = this.add.image(this.width / 2, roadEnd - this.safeZoneSize - this.safeZoneSize / 2 - roadWidth * this.numberOfRoads, endZoneTexture);
        end.setScale(1, 1);
        this.physics.add.existing(end, true);
        endZone.add(end);
        let x = 65;
        for (let i = 0; i < this.numOfGoals; i++) {
          // Add physics and add to goalZone
          const goal = this.add.image(x, roadEnd - this.safeZoneSize - this.safeZoneSize / 2 - roadWidth * this.numberOfRoads + 20, "lilypad");
          this.physics.add.existing(goal, true);
          goalZone.add(goal);
          x += 215;
        };
    }
    //This entire block dynamically generates zones based on variable given by the levels.json
    //TODO add road logic, default == black
    const safeZoneTexture = zoneType + "SafeZone";
    const safeZone = this.physics.add.staticGroup();
    let safe;
    if (this.textures.exists(zoneType)) {
        this.add.image(this.width / 2, this.height - this.safeZoneSize / 2, safeZoneTexture).setDepth(-1);
        safe = this.add.image(this.width / 2, roadEnd - this.safeZoneSize / 2, safeZoneTexture).setDepth(-1);
    } else {
        this.add.rectangle(this.width / 2, this.height - this.safeZoneSize / 2, this.width, this.safeZoneSize, 0x9400f9).setDepth(-1);
        safe = this.add.rectangle(this.width / 2, roadEnd - this.safeZoneSize / 2, this.width, this.safeZoneSize, 0x9400f9).setDepth(-1);
    }

    this.physics.add.existing(safe, true);
    safeZone.add(safe);
    
    this.physics.add.overlap(this.shermie, safeZone, () => {
      this.shermie.setVelocity(0, 0);
    }, null, this);

    // create water zone dynamically
    let waterZoneTexture;
    if (this.textures.exists(zoneType)) {
      waterZoneTexture = this.add.image(this.width / 2, roadEnd + this.safeZoneSize - roadWidth * this.numberOfRoads, zoneType).setDepth(-2);
    } else { 
      waterZoneTexture = this.add.rectangle(this.width / 2, roadEnd + this.safeZoneSize - roadWidth * this.numberOfRoads + roadWidth/2 - 100, this.width, roadWidth * this.numberOfRoads + 200, 0x1a31ac).setDepth(-2);
    }

    this.physics.add.existing(waterZoneTexture, true);

    //create water lanes
    const laneWidth = this.moveDistance;
    const laneStart = roadEnd - this.safeZoneSize / 2 - this.moveDistance / 2;
    const laneEnd = laneStart - this.numberOfRoads * laneWidth;


    this.vehicles = this.physics.add.group();
    this.logs = this.physics.add.group();

    createVehicles(this, roadStart, roadWidth, this.cars, this.carsForward, this.carSpacing);
    createLogs(this, laneStart, laneWidth, this.logTexture, this.logSpacing);

    //TODO - Create turtles

    this.physics.add.overlap(this.shermie, goalZone, this.goalCollision, null, this);
    this.physics.add.overlap(this.shermie, this.vehicles, this.loseLife, null, this);
    this.physics.add.overlap(this.shermie, waterZoneTexture, () => {
      if (!this.physics.overlap(this.shermie, this.logs) && !this.physics.overlap(this.shermie, goalZone)) {
        this.loseLife();
      }
    }, null, this);
    
    this.physics.add.overlap(this.shermie, this.logs, this.rideLog, null, this);

    // this.timerText
    this.timerText = this.add.text(16, 32, `Time: ${this.timeRemaining}`, {
      fontSize: "32px",
      fill: "#ffffff",
    });

    // this.livesText
    this.livesText = this.add.text(16, 32 + 32, `Lives: ${this.lives}`, {
      fontSize: "32px",
      fill: "#ffffff",
    });

    this.playing = true;
    this.timer.startTimer();
  }

  update() {
    if(this.paused) return;
    if (this.canMove) {
      if (this.cursors.left.isDown && this.shermie.x > 0) {
        this.shermie.x -= this.moveDistance;
        this.canMove = false;
      }
      if (this.cursors.right.isDown && this.shermie.x < this.width) {
        this.shermie.x += this.moveDistance;
        this.canMove = false;
      }
      if (this.cursors.up.isDown && this.shermie.y > 0) {
        this.shermie.y -= this.moveDistance;
        this.canMove = false;
      }
      if (this.cursors.down.isDown && this.shermie.y < this.height) {
        this.shermie.y += this.moveDistance;
        this.canMove = false;
      }
    }

    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.canMove = true;
    }

    this.shermie.x = Phaser.Math.Clamp(this.shermie.x, 0, this.width);
    this.shermie.y = Phaser.Math.Clamp(this.shermie.y, 0, this.height - this.safeZoneSize + this.moveDistance / 2);

    this.vehicles.getChildren().forEach((vehicle) => {
      if (vehicle.x > this.width + vehicle.width / 2) vehicle.x = -vehicle.width / 2;
      else if (vehicle.x < -vehicle.width / 2) vehicle.x = this.width + vehicle.width / 2;
    });

    this.logs.getChildren().forEach((log) => {
      if (log.x > this.width + log.width / 2) log.x = -log.width / 2;
      else if (log.x < -log.width / 2) log.x = this.width + log.width / 2;
    });


    //This code fixes overlap but creates pop in and pop out. 
    // this.vehicles.getChildren().forEach((vehicle) => {
    //   if (vehicle.x > this.width) vehicle.x = 0;
    //   else if (vehicle.x < 0) vehicle.x = this.width;
    // });
    
    // this.logs.getChildren().forEach((log) => {
    //   if (log.x > this.width) log.x = 0;
    //   else if (log.x < 0) log.x = this.width;
    // });
    
  }
  //Create a vehicle
  spawnVehicle(x, y, texture, speed) {
    let vehicle = this.vehicles.create(x, y, texture);
    vehicle.body.setVelocityX(speed);
    vehicle.body.allowGravity = false;
    vehicle.body.immovable = true;
    return vehicle;
  }

  //Create a log 
  spawnLog(x, y, texture, speed) {
    let log = this.logs.create(x, y, texture);
    log.body.setVelocityX(speed);
    log.body.allowGravity = false;
    log.body.immovalbe = true;
    log.body.setSize(log.width, 50);
    log.setDepth(-1);
    return log;
  }


  loseLife() {
    this.gameLogic.loseLife();
  }

  goalCollision() {
    this.gameLogic.goal();
  }

  updateTimer() {
    this.timer.updateTimer();
  }

  rideLog(shermie, log){
      shermie.setVelocityX(log.body.velocity.x);
    }
  togglePause() {
        
    if (this.paused) {
        this.pauseMenu.hide();
        this.paused = false;
        this.timer.resume(); 
    } else {
        this.pauseMenu.show();
        this.paused = true;
        this.timer.pause();
    }

  }
  
  getAdvanceNumber(){//Get number of goals for level transition
    return this.advanceNumber;
  }
  
  getNumberOfLevels(){
    return levels.length;
  }
}