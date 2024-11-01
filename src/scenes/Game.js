import { Scene } from "phaser";
import { PauseMenu } from "./Menus/PauseMenu";
import { GameLogic } from "/src/lib/GameLogic";
import { Drawing } from "/src/lib/Drawing";
import { Timer } from "/src/lib/Timer";
import { createVehicles, createLogs } from "/src/lib/Spawner.js";
import { levels } from "/src/lib/levels";

export class Game extends Scene {
  constructor() {
    super("Game");

    // level
    this.level = 0;

    // game screen size
    this.width = 1000;
    this.height = 1000;

    //Check to see if the game is paused
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

    // road values
    this.numberOfRoads = 5;
    this.moveDistance = this.height / (this.numberOfRoads * 2 + 3); //the height / number of roads + number of goals + number of safe
    this.safeZoneSize = 80;

    //water values
    //this.moveDistance = 80;
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
    this.pauseMenu = new PauseMenu(this);

    //to prevent multiple lives lost at once
    this.isInvincible = false;
    this.invincibilityDuration = 500;
  }

  create(data) {
    // Set level based on data passed in
    this.level = data["level"];

    // Timer setup from level data
    this.timerDuration = levels[data["level"]]["time"];
    this.timeRemaining = this.timerDuration;

    // Initialize various level-based properties
    this.lives = levels[data["level"]]["number_of_lives"];
    this.carSpeedMultiplier = levels[data["level"]]["car_speed_multiplier"];
    this.logSpeedMultiplier = levels[data["level"]]["log_speed_multiplier"];
    this.frogSinkMultiplier = levels[data["level"]]["turtle_sink_multiplier"];

    // Object and spacing properties for vehicles and logs
    this.numberOfCars = levels[data["level"]]["number_of_cars"];
    this.numberOfLogs = levels[data["level"]]["number_of_logs"];
    this.logTexture = levels[data["level"]]["log_texture"];
    this.numberOfTurtles = levels[data["level"]]["number_of_turtles"];
    this.logSpacing = levels[data["level"]]["log_spacing"];
    this.cars = levels[data["level"]]["car_texture"];
    this.carsForward = levels[data["level"]]["cars_Forward_texture"];
    this.carSpacing = levels[data["level"]]["car_spacing"];
    this.advanceNumber = levels[data["level"]]["goal_count"];

    // Add player sprite with physics
    this.shermie = this.physics.add.sprite(this.width / 2, this.height - this.safeZoneSize + this.moveDistance / 2, "shermie");
    this.shermie.setSize(50, 50, true); // Set hitbox size
    this.shermie.setScale(1); // Scale player sprite
    this.shermie.setCollideWorldBounds(true);

    // Capture user input for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Initialize the pause menu
    this.pauseMenu = new PauseMenu(this);
    this.pauseMenu.create();
    this.paused = false;

    // Toggle pause state on 'Enter' key press
    this.input.keyboard.on("keydown-ENTER", () => {
      this.togglePause();
    });

    // Create road lines for the lanes
    const roadLines = this.add.graphics({ lineStyle: { width: 5, color: 0xffffff } });
    const roadWidth = this.moveDistance;
    const roadStart = this.height - this.safeZoneSize;
    const roadEnd = roadStart - this.numberOfRoads * roadWidth;

    // Retrieve zone type for textures
    const zoneType = levels[data["level"]]["water_zone_type"];

    // Define textures for safe zone and goal zone
    const safeZoneTexture = zoneType + "SafeZone";
    const goalZoneTexture = zoneType + "Goal";
    const roadZoneTexture = zoneType + "Road";
    const safeZone = this.physics.add.staticGroup();
    const goalZone = this.physics.add.staticGroup();
    const waterZone = this.physics.add.staticGroup();
    const endZone = this.physics.add.staticGroup();

    // Define lane boundaries for water lanes
    const laneWidth = this.moveDistance;
    const laneStart = roadEnd - this.safeZoneSize / 2 - this.moveDistance / 2;

    //This is used for background image size. used to paint the lanes
    const imageWidth = this.width / 9;
    const imageHeight = this.height / (this.numberOfLanes * 2 + 3);

    // Draw solid lines for top and bottom of road
    roadLines.strokeLineShape(new Phaser.Geom.Line(0, roadStart, this.width, roadStart));
    roadLines.strokeLineShape(new Phaser.Geom.Line(0, roadEnd, this.width, roadEnd));

    // Draw dashed lines between road lanes
    for (let i = 0; i < this.numberOfRoads - 1; i++) {
      this.drawing.drawDashedLine(roadLines, 10, roadStart - i * roadWidth - roadWidth, this.width, roadStart - i * roadWidth - roadWidth, 30, 20);
    }

    //GOAL ZONE LOGIC
    let goal;
    let end;
    if (this.textures.exists(goalZoneTexture)) {
      // If goal zone background texture exists
      let x = -20;
      for (let j = 0; j <= this.width + 40; j += imageWidth + 75) {
        // For each image in goal background zone
        end = this.add // Add image
          .image(x + imageWidth / 2, 0 + laneWidth / 2, goalZoneTexture) // Set image position TODO - GET NEW ASSET FOR DANGER ZONE
          .setDisplaySize(imageWidth, this.moveDistance) // Set image size
          .setDepth(-1); // Set image depth
        this.physics.add.existing(end, true); // Add physics to each background image
        endZone.add(end); //danger zone
        x += imageWidth + 75;
      }
      
      x = 128;//Initial starting place for goal segment
      for (let j = 0; j < 5; j++) {
          goal = this.add.rectangle(x, 0 + laneWidth / 2, 75, this.moveDistance, 0x00ff00);//TODO - GET NEW ASSET FOR GOAL ZONE
          this.physics.add.existing(goal, true);
          goalZone.add(goal);
          x += imageWidth + 75;
      }
    } 
    else {
      // If goal zone texture doesn't exist then use a rectangle
      goal = this.add.rectangle(this.width / 2, this.moveDistance / 2, this.width, this.moveDistance, 0x00ff00);
      this.physics.add.existing(goal, true); // Add physics to the fallback rectangle
      goalZone.add(goal); //these need to be danger zone instead of goal zone
    }
    // END GOAL ZONE LOGIC

    // SAFE ZONE LOGIC
    if (this.textures.exists(safeZoneTexture)) {
      // Top Bottom safe zone
      for (let j = 0; j < this.width; j += imageWidth) {
        const img = this.add
          .image(j + imageWidth / 2, this.height - this.safeZoneSize / 2, safeZoneTexture)
          .setDisplaySize(imageWidth, this.safeZoneSize)
          .setDepth(-1);
        this.physics.add.existing(img, true); // Add physics to each image
        safeZone.add(img); // Add to safeZone group
      }
      for (let j = 0; j < this.width; j += imageWidth) {
        const img = this.add
          .image(j + imageWidth / 2, roadEnd - this.safeZoneSize / 2, safeZoneTexture)
          .setDisplaySize(imageWidth, this.safeZoneSize)
          .setDepth(-1);
        this.physics.add.existing(img, true); // Add physics to each image
        safeZone.add(img); // Add to safeZone group
      }
    } else {
      // Bottom safe zone rectangle fallback
      const bottomRect = this.add.rectangle(this.width / 2, this.height - this.safeZoneSize / 2, this.width, this.safeZoneSize, 0x9400f9).setDepth(-1);
      this.physics.add.existing(bottomRect, true);
      safeZone.add(bottomRect);
      // Top safe zone rectangle fallback near `roadEnd`
      const topRect = this.add.rectangle(this.width / 2, roadEnd - this.safeZoneSize / 2, this.width, this.safeZoneSize, 0x9400f9).setDepth(-1);
      this.physics.add.existing(topRect, true);
      safeZone.add(topRect);
    }
    // END SAFE ZONE LOGIC

    //WATER ZONE LOGIC
    let waterZoneTexture;
    if (this.textures.exists(zoneType)) {
      for (let i = 0; i < this.numberOfLanes; i++) {
        const waterY = roadEnd - (laneWidth + laneWidth / 2) - laneWidth * i; // Adjust y-coordinate per lane
        //console.log("waterY " + i + " " + waterY)
        for (let j = 0; j < this.width; j += imageWidth) {
          waterZoneTexture = this.add
            .image(j + imageWidth / 2, waterY, zoneType)
            .setDisplaySize(imageWidth, imageHeight)
            .setDepth(-2);
          this.physics.add.existing(waterZoneTexture, true);
          waterZone.add(waterZoneTexture);
        }
      }
    } else {
      waterZoneTexture = this.add
        .rectangle(this.width / 2, roadEnd + this.safeZoneSize - roadWidth * this.numberOfRoads + roadWidth / 2, this.width, this.moveDistance * this.numberOfRoads, 0x1a31ac)
        .setDepth(-2);
      this.physics.add.existing(waterZoneTexture, true);
      waterZone.add(waterZoneTexture);
    }
    // END WATER ZONE LOGIC

    // ROAD ZONE LOGIC
    if (this.textures.exists(roadZoneTexture)) {
      for (let i = 0; i < this.numberOfLanes; i++) {
        const roadY = this.height - this.safeZoneSize - laneWidth / 2 - laneWidth * i;
        for (let j = 0; j < this.width; j += imageWidth) {
          this.add
            .image(j + imageWidth / 2, roadY, roadZoneTexture)
            .setDisplaySize(imageWidth, roadWidth)
            .setDepth(-1);
        }
      }
    } else {
      this.add.rectangle(this.width / 2, 2, this.width, roadWidth, 0x000000).setDepth(-2);
    }
    // END ROAD ZONE LOGIC

    // Overlap detection for safe zone
    this.physics.add.overlap(
      this.shermie,
      safeZone,
      () => {
        this.shermie.setVelocity(0, 0);
      },
      null,
      this
    );

    // Create physics groups for vehicles and logs
    this.vehicles = this.physics.add.group();
    this.logs = this.physics.add.group();

    // Spawn vehicles and logs based on configuration
    createVehicles(this, roadStart, roadWidth, this.cars, this.carsForward, this.carSpacing);
    createLogs(this, laneStart, laneWidth, this.logTexture, this.logSpacing);

    // Define overlap logic for goal, vehicles, and logs
    this.physics.add.overlap(this.shermie, goalZone, this.winCollision, null, this);
    this.physics.add.overlap(this.shermie, this.vehicles, this.loseLife, null, this);
    this.physics.add.overlap(
      this.shermie,
      waterZone,
      () => {
        if (!this.physics.overlap(this.shermie, this.logs) && !this.physics.overlap(this.shermie, goalZone)) {
          this.loseLife();
        }
      },
      null,
      this
    );
    this.physics.add.overlap(this.shermie, this.logs, this.rideLog, null, this);
    this.physics.add.overlap(this.shermie, this.endZone, this.loseLife, null, this);

    // Display timer and lives on screen
    this.timerText = this.add.text(16, 32, `Time: ${this.timeRemaining}`, { fontSize: "32px", fill: "#ffffff" });
    this.livesText = this.add.text(16, 64, `Lives: ${this.lives}`, { fontSize: "32px", fill: "#ffffff" });

    this.playing = true;

    // Start the timer for gameplay
    this.timer.start();
  }

  update() {
    // Only update if the game is playing (not paused)
    if (this.paused) return;

    if (this.canMove) {
      // Only move if the player can move
      if (this.cursors.left.isDown && this.shermie.x > 0) {
        // move left if left arrow is pressed and not out of bounds
        this.shermie.x -= this.moveDistance;
      } else if (this.cursors.right.isDown && this.shermie.x < this.width) {
        // '' right
        this.shermie.x += this.moveDistance;
      } else if (this.cursors.up.isDown && this.shermie.y > 0) {
        // '' up
        this.shermie.y -= this.moveDistance;
      } else if (this.cursors.down.isDown && this.shermie.y < this.height) {
        // '' down
        this.shermie.y += this.moveDistance;
      }
      this.canMove = false; // Only allow the player to move once per key press
    }

    // If no keys are pressed, allow the player to move again
    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.canMove = true;
    }

    // Clamp the player's position within the game bounds
    this.shermie.x = Phaser.Math.Clamp(this.shermie.x, 0, this.width);
    this.shermie.y = Phaser.Math.Clamp(this.shermie.y, 0, this.height - this.safeZoneSize + this.moveDistance / 2);

    // Move vehicles off the screen and reset their position
    this.vehicles.getChildren().forEach((vehicle) => {
      const isOffScreenLeft = vehicle.x < -vehicle.width / 2;
      const isOffScreenRight = vehicle.x > this.width + vehicle.width / 2;

      if (isOffScreenLeft || isOffScreenRight) {
        vehicle.x = isOffScreenLeft ? this.width + vehicle.width / 2 : -vehicle.width / 2;
      }
    });

    // Move logs off the screen and reset their position
    this.logs.getChildren().forEach((log) => {
      const isOffScreenLeft = log.x < -log.width / 2;
      const isOffScreenRight = log.x > this.width + log.width / 2;

      if (isOffScreenLeft) {
        log.x = this.width + log.width / 2;
      } else if (isOffScreenRight) {
        log.x = -log.width / 2;
      }
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
    // return if invinsible
    if (this.isInvincible) {
      console.log("Shermie is invincible");
      return;
    }

    // Only Lose if if false, and return invincible
    this.isInvincible = true;
    this.gameLogic.loseLife();

    // Set a delayed call to reset invincibility after the cooldown
    this.time.delayedCall(this.invincibilityDuration, () => {
      this.isInvincible = false;
    });
  }

  winCollision() {
    this.gameLogic.win();
  }

  updateTimer() {
    this.timer.update();
  }

  rideLog(shermie, log) {
    shermie.setVelocityX(log.body.velocity.x);
  }

  togglePause() {
    console.log("Toggle Pause called. Current paused state:", this.paused);
    if (this.paused) {
      console.log("hiding the menu since this.paused state is true");
      //this.pauseMenu.hide();
      this.paused = false;
      this.timer.resume();
    } else {
      console.log("showing the menu since this.paused state is false");
      this.pauseMenu.show();
      this.paused = true;
      this.timer.pause();
    }
  }
}
