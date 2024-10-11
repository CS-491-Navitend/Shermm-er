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

    this.playing = true;
    this.canMove = true;
    this.shermie = null;
    this.vehicles = null;
    this.winCount = 0;
    this.lives = 3;
    this.resetCount = 0;

    // road values
    this.moveDistance = 80;
    this.numberOfRoads = 4;
    this.safeZoneSize = 80;

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
    this.numberOfFrogs = levels[data["level"]]["number_of_turtles"];

    // set background
    // this.add.image(this.width / 2, this.height / 2, "background").setScale(1.3);

    //add Physics to the shermie sprite
    this.shermie = this.physics.add.sprite(this.width / 2, this.height - this.safeZoneSize + this.moveDistance / 2, "shermie");

    this.shermie.setScale(1);
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

    const waterZone = this.physics.add.staticGroup();
    const water = (this.add.rectangle(this.width / 2, roadEnd + this.safeZoneSize - roadWidth * this.numberOfRoads, this.width, roadWidth * this.numberOfRoads, 0x1a31ac)).setDepth(-2);
    this.physics.add.existing(water, true);
    waterZone.add(water);

    this.vehicles = this.physics.add.group();

    const cars = ["car1", "car2", "car3", "tractor"];
    const spacing = [250, 350, 100];

    // create vehicles
    for (let road = 0; road < this.numberOfRoads; road++) {
      for (let i = 0; i < this.numberOfCars; i++) {
        const randomCar = cars[Math.floor(Math.random() * cars.length)];
        const randomSpacing = spacing[Math.floor(Math.random() * spacing.length)];
        this.spawnVehicle(randomSpacing + i * randomSpacing, roadStart - roadWidth * road - roadWidth / 2, randomCar, -200 * this.carSpeedMultiplier);
      }
    }

    //When shermie overlap
    this.physics.add.overlap(this.shermie, goalZone, this.winCollision, null, this);
    this.physics.add.overlap(this.shermie, this.vehicles, this.loseLife, null, this);
    this.physics.add.overlap(this.shermie, waterZone, this.loseLife, null, this);

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
  }
  //Create a vehicle
  spawnVehicle(x, y, texture, speed) {
    let vehicle = this.vehicles.create(x, y, texture);
    vehicle.body.setVelocityX(speed);
    vehicle.body.allowGravity = false;
    vehicle.body.immovable = true;
  }

  loseLife() {
    this.gameLogic.loseLife();
  }

  winCollision() {
    this.gameLogic.win();
  }

  updateTimer() {
    this.timer.updateTimer();
  }
}
