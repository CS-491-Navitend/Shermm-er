import { Scene } from "phaser";

import { GameLogic } from "/src/lib/GameLogic";
import { Drawing } from "/src/lib/Drawing";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.canMove = true;
    this.moveDistance = 60;
    this.shermie = null;
    this.vehicles = null;
    this.winCount = 0;
    this.lives = 3;
    this.resetCount = 0;
    this.timerDuration = 1_000_000_000;
    this.timeRemaining = this.timerDuration;

    this.gameLogic = new GameLogic(this);
    this.drawing = new Drawing(this);
  }

  create() {
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

    roadLines.strokeLineShape(new Phaser.Geom.Line(10, 420, 840, 420));
    this.drawing.drawDashedLine(roadLines, 10, 485, 840, 485, 20, 10);
    this.drawing.drawDashedLine(roadLines, 10, 545, 840, 545, 20, 10);
    this.drawing.drawDashedLine(roadLines, 10, 605, 840, 605, 20, 10);
    this.drawing.drawDashedLine(roadLines, 10, 665, 840, 665, 20, 10);
    roadLines.strokeLineShape(new Phaser.Geom.Line(10, 722, 840, 722));

    const goalZone = this.physics.add.staticGroup();
    const goal = this.add.rectangle(400, 50, 800, 50);
    this.physics.add.existing(goal, true);
    goalZone.add(goal);

    this.vehicles = this.physics.add.group();

    //First row of vehicles
    this.spawnVehicle(100, 695, "car1", -175);
    this.spawnVehicle(600, 695, "car3", -175);
    this.spawnVehicle(850, 695, "car1", -175);

    //Second row of vehicles
    this.spawnVehicle(100, 635, "car2forward", 150);
    this.spawnVehicle(300, 635, "car3forward", 150);
    this.spawnVehicle(700, 635, "car1forward", 150);

    for (let i = 0; i < 5; i++) {
      this.spawnVehicle(100 + i * 100, 575, "car2", -200);
    }

    //Third row of vehicles
    // this.spawnVehicle(100, 575, "car3", -200);
    // this.spawnVehicle(700, 575, "car1", -200);

    //Fourth row of vehicles
    this.spawnVehicle(100, 515, "tractor", 300);

    //Fifth row of vehicles
    this.spawnVehicle(100, 455, "car2", -500);

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

    this.startTimer();

    this.livesText = this.add.text(50, 50, "Lives: " + this.lives, {
      fontSize: "32px",
      fill: "#fff",
    });

    //Defining game over message
    let gameOverMessage = this.add.text(
      425,
      150,
      "\tGame over.\n Press space to try again.",
      { fontSize: "42px", fill: "#fff" }
    );
    gameOverMessage.setOrigin(0.5);
    gameOverMessage.setVisible(false);
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
  //Update the timer to be counted down
  updateTimer() {
    this.timeRemaining--;
    if (this.timeRemaining <= 0) {
      this.timerEvent.remove();
      this.gameLogic.gameOver();
    }
    this.timerText.setText(`Time: ${this.timeRemaining}`);
  }
  startTimer() {
    this.timeRemaining = this.timerDuration; // Reset the timer
    this.timerText.setText(`Time: ${this.timeRemaining}`); // Display initial time
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer(),
      callbackScope: this,
      loop: true,
    });
  }
}
