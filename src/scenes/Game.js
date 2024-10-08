import { Scene } from "phaser";

var lives;
var livesText;
var gameOverMessage;
var isOver = false;
export class Game extends Scene {
  constructor() {
    super("Game");
    this.canMove = true;
    this.moveDistance = 60;
    this.shermie = null;
    this.vehicles = null;
    this.winCount = 0;
    this.resetCount = 0;
    this.timerDuration = 1_000_000_000;
    this.timeRemaining = this.timerDuration;
  }

  preload() {
    console.log("loaded");

    // let graphics = this.make.graphics({ x: 0, y: 0, add: false });
    // graphics.fillStyle(0xff0000, 1);
    // graphics.fillRect(0, 0, 60, 30);
    // graphics.generateTexture("car1", 60, 30);
    // graphics.destroy();

    // graphics = this.make.graphics({ x: 0, y: 0, add: false });
    // graphics.fillStyle(0x00ff00, 1);
    // graphics.fillRect(0, 0, 80, 30);
    // graphics.generateTexture("car2", 80, 30);
    // graphics.destroy();

    this.load.image("car1", "/assets/car1.png");
    this.load.image("car1forward", "/assets/car1forward.png");
    this.load.image("car2", "/assets/car2.png");
    this.load.image("car3", "/assets/car3.png");
    this.load.image("car3forward", "/assets/car3forward.png");
    this.load.image("tractor", "/assets/TractorTrailerForward.png");

    //Load images
    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("background", "/assets/background.jpeg");
    this.load.image("life", "/assets/heart.png");
  }

  create() {
    this.add.image(425, 390, "background").setScale(1);

    //add Physics to the shermie sprite
    this.shermie = this.physics.add.sprite(425, 10, "shermie");
    this.shermie.setCollideWorldBounds(true);

    //User input for movements
    this.cursors = this.input.keyboard.createCursorKeys();

    //Make roads
    const roadLines = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff },
    });
    roadLines.strokeLineShape(new Phaser.Geom.Line(10, 420, 840, 420));
    drawDashedLine(roadLines, 10, 485, 840, 485, 20, 10);
    drawDashedLine(roadLines, 10, 545, 840, 545, 20, 10);
    drawDashedLine(roadLines, 10, 605, 840, 605, 20, 10);
    drawDashedLine(roadLines, 10, 665, 840, 665, 20, 10);
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
    this.spawnVehicle(700, 635, "car2", 150);
    this.spawnVehicle(300, 635, "car3forward", 150);
    this.spawnVehicle(100, 635, "car1forward", 150);

    //Third row of vehicles
    this.spawnVehicle(100, 575, "car3", -200);
    this.spawnVehicle(700, 575, "car1", -200);

    //Fourth row of vehicles
    this.spawnVehicle(100, 515, "tractor", 300);

    //When shermie overlap
    this.physics.add.overlap(this.shermie, goalZone, this.win, null, this);
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

    this.lives = 3;
    this.livesText = this.add.text(50, 50, "Lives: " + this.lives, {
      fontSize: "32px",
      fill: "#fff",
    });

    //Defining game over message
    gameOverMessage = this.add.text(
      425,
      150,
      "\tGame over.\n Press space to try again.",
      { fontSize: "42px", fill: "#fff" }
    );
    gameOverMessage.setOrigin(0.5);
    gameOverMessage.setVisible(false);

    this.input.keyboard.on("keydown-SPACE", reset, this);
  }
  update() {
    //shermie move fluidly:
    /* if (this.cursors.left.isDown){
        shermie.x -= 5;
    }
    if (this.cursors.right.isDown){
        shermie.x += 5;
    }
    if (this.cursors.up.isDown){
        shermie.y -= 5;
    }
    if (this.cursors.down.isDown){
        shermie.y += 5;
    }*/

    if (isOver) return;

    //shermie arcade move
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

    /*
    if (shermie.x < 10) shermie.x = 10;
    if (shermie.x > 790) shermie.x = 790;
    if (shermie.y < 50) shermie.y = 50;
    if (shermie.y > 550) shermie.y = 550;
    */

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
    if (texture == "car1" || texture == "car1forward") {
      vehicle.setScale(0.25);
    } else if (texture == "car2") {
      vehicle.setScale(0.15);
    } else if (texture == "car3" || texture == "car3forward") {
      vehicle.setScale(0.45);
    } else if (texture == "tractor") {
      vehicle.setScale(0.5);
    }

    //console.log(`Created vehicle: ${texture}, at (${x}, ${y}), Speed: ${speed}`);//line to show velocity
  }

  //when goal is reached
  win() {
    console.log("Win triggered.");
    this.winCount++;
    console.log(`Total Wins: ${this.winCount - 1}`);
    this.reset();
  }

  //Plays the GamerOver screen
  gameOver() {
    console.log("Game Over!");
    this.scene.start("GameOver", {
      winCount: this.winCount,
      resetCount: this.resetCount,
    });
  }

  //Reset the sheep everytime the sheep overlap an obstacle
  reset() {
    this.resetCount++;
    console.log(`Total Resets: ${this.resetCount - 1}`);
    this.shermie.x = 415;
    this.shermie.y = 775;
  }
  loseLife() {

    console.log("Lose life triggered.");
    console.log(this.lives);
    if (this.lives > 1) {
      this.lives--;
      this.reset();
    }
    else this.gameOver();
    this.livesText.setText(`Lives: ${this.lives}`);
  }
  //Update the timer to be counted down
  updateTimer() {
    this.timeRemaining--;
    if (this.timeRemaining <= 0) {
      this.timerEvent.remove();
      this.gameOver();
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

function drawDashedLine(graphics, x1, y1, x2, y2, dashLength, gapLength) {
  let x = x1;
  const step = dashLength + gapLength;

  while (x < x2) {
    graphics.strokeLineShape(new Phaser.Geom.Line(x, y1, x + dashLength, y2));
    x += step;
  }
}

//console.log(`Created vehicle: ${texture}, at (${x}, ${y}), Speed: ${speed}`);//line to show velocity
//temp win condition

//TODO: Implement logic into a menu
function win() {
  console.log("Win triggered.");
  reset();
}

//TODO: Implement logic into a menu
function gameOver() {
  isOver = true;
  gameOverMessage.setVisible(true);
  console.log("Game over.");
}

//TODO: Implement logic into a menu
function reset() {
  if (isOver) {
    //Restart the game when space is pressed
    lives = 3;
    livesText.setText("Lives: " + lives);
    isOver = false;
    gameOverMessage.setVisible(false);
  }
}

function loseLife() {
  //Decrement life on collision with obstacle

  if (lives == 1) {
    lives--;
    livesText.setText("Lives: " + lives);
    moveToStart();
    gameOver();
  } else {
    lives--;
    livesText.setText("Lives: " + lives);
    moveToStart();
  }
}
function moveToStart() {
  shermie.x = 415;
  shermie.y = 775;
}
