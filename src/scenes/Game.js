import { Scene } from "phaser";

import { GameLogic } from "/src/lib/GameLogic";
import { Drawing } from "/src/lib/Drawing";
import { Timer } from "/src/lib/Timer";

import { levels } from "/src/lib/levels";

export class Game extends Scene {
  constructor() {
    super("Game");

    // level
    this.level = 0;

    // game screen size
    this.width = 1000;
    this.height = 1000;


    //Physics objects and other game information
    this.playing = true;
    this.canMove = true;
    this.shermie = null;
    this.vehicles = null;
    this.logs = null;
    this.turtles = null;
    this.winCount = 0;
    this.lives = 3;
    this.resetCount = 0;

    // road values
    this.moveDistance = 80;
    this.numberOfRoads = 4;
    this.safeZoneSize = 80;

    //water values
    this.moveDistance = 80;
    this.numberOfLanes = 4;

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
    this.timerDuration = levels[data["level"]]["time"];
    this.timeRemaining = this.timerDuration;

    this.carSpeedMultiplier = levels[data["level"]]["car_speed_multiplier"];
    this.logSpeedMultiplier = levels[data["level"]]["log_speed_multiplier"];
    this.frogSinkMultiplier = levels[data["level"]]["turtle_sink_multiplier"];

    this.numberOfCars = levels[data["level"]]["number_of_cars"];
    this.numberOfLogs = levels[data["level"]]["number_of_logs"];
    this.numberOfTurtles = levels[data["level"]]["number_of_turtles"];

    // set background
    // this.add.image(this.width / 2, this.height / 2, "background").setScale(1.3);

    //add Physics to the shermie sprite
    this.shermie = this.physics.add.sprite(this.width / 2, this.height - this.safeZoneSize + this.moveDistance / 2, "shermie");

    this.shermie.setSize(50,50,true);//this manipulates hitbox of shermie
    this.shermie.setScale(1);//this manipulates scale of shermie
    this.shermie.setCollideWorldBounds(true);

    //User input for movements
    this.cursors = this.input.keyboard.createCursorKeys();

    //Make roads
    const roadLines = this.add.graphics({
      lineStyle: { width: 5, color: 0xffffff },
    });
    const roadWidth = this.moveDistance;
    const roadStart = this.height - this.safeZoneSize;
    const roadEnd = roadStart - this.numberOfRoads * roadWidth;

    // solid road lines (top and bottom)
    roadLines.strokeLineShape(new Phaser.Geom.Line(0, roadStart, this.width, roadStart));
    roadLines.strokeLineShape(new Phaser.Geom.Line(0, roadEnd, this.width, roadEnd));

    // dashed road lines
    for (let i = 0; i < this.numberOfRoads - 1; i++) {
      this.drawing.drawDashedLine(
        roadLines,
        10, // half of the gap between the dashes
        roadStart - i * roadWidth - roadWidth,
        this.width,
        roadStart - i * roadWidth - roadWidth,
        30, // the length of the dash
        20 // the length of the gap between the dashes
      );
    }

    // create goal
    const goalZone = this.physics.add.staticGroup();
    const goal = this.add.rectangle(this.width / 2, roadEnd - this.safeZoneSize - this.safeZoneSize / 2 - roadWidth * this.numberOfRoads, this.width, this.safeZoneSize, 0x1de100);
    this.physics.add.existing(goal, true);
    goalZone.add(goal);
    

    // create safe zones
    // bottom of screen
    this.add.rectangle(this.width / 2, this.height - this.safeZoneSize / 2, this.width, this.safeZoneSize, 0x9400f9).setDepth(-1);

    // middle
    this.add.rectangle(this.width / 2, roadEnd - this.safeZoneSize / 2, this.width, this.safeZoneSize, 0x9400f9).setDepth(-1);
    
    // create water zone
    const waterZone = this.physics.add.staticGroup();
    const water = (this.add.rectangle(this.width / 2, roadEnd + this.safeZoneSize - roadWidth * this.numberOfRoads, this.width, roadWidth * this.numberOfRoads, 0x1a31ac)).setDepth(-2);
    this.physics.add.existing(water, true);
    waterZone.add(water);

    //create water lanes
    const laneWidth = this.moveDistance;
    const laneStart = roadEnd - this.safeZoneSize / 2 - this.moveDistance / 2;
    const laneEnd = laneStart - this.numberOfRoads * laneWidth;

    console.log("Road Start: " , roadStart);
    console.log("Road End: " , roadEnd);

    console.log("Lane Start: ", laneStart);
    console.log("Lane End: ", laneEnd);

    this.vehicles = this.physics.add.group();

    const cars = ["car1", "car2", "car3", "tractor"];
    const carSpacing = [250, 350, 100];//Spacing on X axis

    // create vehicles
    for (let road = 0; road < this.numberOfRoads; road++) {
      for (let i = 0; i < this.numberOfCars; i++) {
        const randomCar = cars[Math.floor(Math.random() * cars.length)];
        const randomSpacing = carSpacing[Math.floor(Math.random() * carSpacing.length)];
        this.spawnVehicle(randomSpacing + i * randomSpacing, roadStart - roadWidth * road - roadWidth / 2, randomCar, -200 * this.carSpeedMultiplier);
      }
    }

    //TODO - Create logs and turtles

    this.logs = this.physics.add.group();

    //const logs = ["longLog", "shortLog",];
    const logSpacing = [250, 350, 100];
    
    console.log("Lanes: ", this.numberOfLanes);
    console.log("Logs: ", this.numberOfLogs);

    for(let lane = 0; lane < this.numberOfLanes; lane++){
      for(let i = 0; i < this.numberOfLogs; i++){
        const randomSpacing = logSpacing[Math.floor(Math.random() * logSpacing.length)];
        this.spawnLog(randomSpacing + i * randomSpacing, laneStart - laneWidth * lane - laneWidth / 2, 100, -200 * this.logSpeedMultiplier);
      }
    }

    //When shermie overlap
    this.physics.add.overlap(this.shermie, goalZone, this.winCollision, null, this);
    this.physics.add.overlap(this.shermie, this.vehicles, this.loseLife, null, this);
    this.physics.add.overlap(this.shermie, waterZone, this.loseLife, null, this);
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
    if (this.canMove) {
      if (this.cursors.left.isDown && this.shermie.x > 0) {
        this.shermie.x -= this.moveDistance;
        this.canMove = false;
        console.log("X position: ", this.shermie.x);
        console.log("Y position: ", this.shermie.y);
      }
      if (this.cursors.right.isDown && this.shermie.x < this.width) {
        this.shermie.x += this.moveDistance;
        this.canMove = false;
        console.log("X position: ", this.shermie.x);
        console.log("Y position: ", this.shermie.y);
      }
      if (this.cursors.up.isDown && this.shermie.y > 0) {
        this.shermie.y -= this.moveDistance;
        this.canMove = false;
        console.log("X position: ", this.shermie.x);
        console.log("Y position: ", this.shermie.y);
      }
      if (this.cursors.down.isDown && this.shermie.y < this.height) {
        this.shermie.y += this.moveDistance;
        this.canMove = false;
        console.log("X position: ", this.shermie.x);
        console.log("Y position: ", this.shermie.y);
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
    
    /*this.turtles.getChildren().forEach((turtle) => {
      if (turtle.x > this.width + turtle.width / 2) turtle.x = -turtle.width / 2;
      else if (turtle.x < -turtle.width / 2) turtle.x = this.width + turtle.width / 2;
    });
    */
  }
  //Create a vehicle
  spawnVehicle(x, y, texture, speed) {
    let vehicle = this.vehicles.create(x, y, texture);
    vehicle.body.setVelocityX(speed);
    vehicle.body.allowGravity = false;
    vehicle.body.immovable = true;
  }

  //PLACEHOLDER LOGS AND TURTLES
  //Create a log - Actual Textures
  spawnLog(x, y, speed){ 
    let log = this.add.rectangle(x, y, 120, 80, 0x964B00);
    this.physics.add.existing(log);
    this.logs.add(log);
    log.body.setVelocityX(speed);
    log.body.allowGravity = false;
    log.body.immovable = true;
  }


  //Create a log - Actual Textures
  /*spawnLog(x, y, texture, speed){ 
    let log = this.logs.create(x, y, texture);
    log.body.setVelocityX(speed);
    log.body.allowGravity = false;
    log.body.immovalbe = true;
  }*/

  //Create a Turtle - Actual Textures
  /*spawnTurtle(x, y, texture, speed) {
    let turtle = this.turtles.create(x, y, texture);
    frog.body.setVelocityX(speed);
    frog.body.allowGravity = false;
    frog.body.immovable = true;
  }*/

  loseLife() {
    this.gameLogic.loseLife();
  }

  winCollision() {
    this.gameLogic.win();
  }

  updateTimer() {
    this.timer.updateTimer();
  }

  rideLog(log){
    this.shermie.y = log.y - this.shermie.height / 2 - log.height / 2;
    this.shermie.setVelocityX(log.body.velocity.x);
  }
}
