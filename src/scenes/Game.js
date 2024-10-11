import { Scene } from "phaser";

import { GameLogic } from "/src/lib/GameLogic";
import { Drawing } from "/src/lib/Drawing";
import { Timer } from "/src/lib/Timer";

import { levels } from "/src/lib/levels";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.canMove = true;
    this.moveDistance = 60;
    this.shermie = null;
    this.vehicles = null;
    this.winCount = 0;
    this.lives = 3;
    this.roadLanes = 5;
    this.resetCount = 0;

    // dynamic values
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
    this.timerDuration = levels[data["level"]]["time"];

    this.carSpeedMultiplier = levels[data["level"]]["car_speed_multiplier"];

    this.add.image(425, 390, "background").setScale(1);

    //add Physics to the shermie sprite
    this.shermie = this.physics.add.sprite(415, 775, "shermie");
    this.shermie.setScale(0.81);
    this.shermie.setCollideWorldBounds(true);

    //User input for movements
    this.cursors = this.input.keyboard.createCursorKeys();

    //Make roads
    const roadLines = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff },
    });

    // solid road lines (top and bottom)
    roadLines.strokeLineShape(new Phaser.Geom.Line(0, 420, 840, 420));
    roadLines.strokeLineShape(
      new Phaser.Geom.Line(
        0,
        420 + this.roadLanes * 60,
        840,
        420 + this.roadLanes * 60
      )
    );

    // dashed road lines
    for (let i = 0; i < this.roadLanes - 1; i++) {
      this.drawing.drawDashedLine(
        roadLines,
        0,
        485 + i * 60,
        840,
        485 + i * 60,
        20,
        10
      );
    }

    const goalZone = this.physics.add.staticGroup();
    const goal = this.add.rectangle(400, 50, 800, 50);
    this.physics.add.existing(goal, true);
    goalZone.add(goal);

    this.vehicles = this.physics.add.group();

    //First row of vehicles
    this.spawnVehicle(100, 695, "car1", -175 * this.carSpeedMultiplier);
    this.spawnVehicle(600, 695, "car3", -175 * this.carSpeedMultiplier);
    this.spawnVehicle(850, 695, "car1", -175 * this.carSpeedMultiplier);

    //Second row of vehicles
    this.spawnVehicle(100, 635, "car2forward", 150 * this.carSpeedMultiplier);
    this.spawnVehicle(300, 635, "car3forward", 150 * this.carSpeedMultiplier);
    this.spawnVehicle(700, 635, "car1forward", 150 * this.carSpeedMultiplier);

    //Third row of vehicles
    for (let i = 0; i < 3; i++) {
      this.spawnVehicle(
        100 + i * 150,
        575,
        "car2",
        -200 * this.carSpeedMultiplier
      );
    }

    //Fourth row of vehicles
    this.spawnVehicle(100, 515, "tractor", 300 * this.carSpeedMultiplier);

    //Fifth row of vehicles
    this.spawnVehicle(100, 455, "car2", -500 * this.carSpeedMultiplier);

    //When shermie overlap
    this.physics.add.overlap(
      this.shermie,
      goalZone,
      this.winCollision,
      null,
      this
    );
    this.physics.add.overlap(
      this.shermie,
      this.vehicles,
      this.loseLife,
      null,
      this
    );

    //Timer event
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(16, 16, `Time: ${this.timeRemaining}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    this.timer.startTimer();

    // lives
    this.livesText = this.add.text(50, 50, "Lives: " + this.lives, {
      fontSize: "32px",
      fill: "#fff",
    });
  }
  update() {
    if (this.canMove) {
      if (this.cursors.left.isDown && this.shermie.x > 10) {
        //console.log('moved left')
        this.shermie.x -= this.moveDistance;
        this.canMove = false;
      }
      if (this.cursors.right.isDown && this.shermie.x < 850) {
        // console.log('moved right')
        this.shermie.x += this.moveDistance;
        this.canMove = false;
      }
      if (this.cursors.up.isDown && this.shermie.y > 10) {
        //console.log('move up')
        this.shermie.y -= this.moveDistance;
        this.canMove = false;
      }
      if (this.cursors.down.isDown && this.shermie.y < 780) {
        //console.log('move down')
        this.shermie.y += this.moveDistance;
        this.canMove = false;
      }
    }
    if (
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown &&
      !this.cursors.up.isDown &&
      !this.cursors.down.isDown
    ) {
      this.canMove = true;
    }

    this.shermie.x = Phaser.Math.Clamp(this.shermie.x, 10, 850);
    this.shermie.y = Phaser.Math.Clamp(this.shermie.y, 10, 780);

    this.vehicles.getChildren().forEach((vehicle) => {
      //console.log(`Vehicle Position: x=${vehicle.x}, y=${vehicle.y}, VelocityX=${vehicle.body.velocity.x}`); //used to test movement
      if (vehicle.x > 800 + vehicle.width / 2) vehicle.x = -vehicle.width / 2;
      else if (vehicle.x < -vehicle.width / 2)
        vehicle.x = 800 + vehicle.width / 2;
    });
  }
  //Create a vehicle
  spawnVehicle(x, y, texture, speed) {
    let vehicle = this.vehicles.create(x, y, texture);
    vehicle.body.setVelocityX(speed);
    vehicle.body.allowGravity = false;
    vehicle.body.immovable = true;

    //set the scale for each vehicle
    var scale = 0.75;
    if (texture == "car1" || texture == "car1forward") {
      vehicle.setScale(scale);
    } else if (texture == "car2" || texture == "car2forward") {
      vehicle.setScale(scale);
    } else if (texture == "car3" || texture == "car3forward") {
      vehicle.setScale(scale);
    } else if (texture == "tractor") {
      vehicle.setScale(0.5);
    }
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
