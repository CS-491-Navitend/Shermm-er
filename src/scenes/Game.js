import { Scene } from "phaser";
import { PauseMenu } from "./Menus/PauseMenu";
import { GameLogic } from "/src/lib/GameLogic";
import { Drawing } from "/src/lib/Drawing";
import { Timer } from "/src/lib/Timer";
import { createVehicles, createLogs, createTurtles } from "/src/lib/Spawner.js";
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
    this.sinkingTurtles = null;
    this.winCount = 0;
    this.lives = 0;
    this.resetCount = 0;
    this.goalCount = 0;
    this.numOfGoals = 4;
    this.savedVelocity = 0;
    this.shermieIndex = 0;//Currently used shermie color

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
    this.numberOfTurtles = 0;
    this.carSpeedMultiplier = 1;
    this.logSpeedMultiplier = 1;
    this.frogSinkMultiplier = 1;
    this.scoreDecrement = 0;
    this.decrementFlag = false;

    this.gameLogic = new GameLogic(this);
    this.drawing = new Drawing(this);
    this.timer = new Timer(this);
    this.pauseMenu = new PauseMenu(this);

    //to prevent multiple lives lost at once
    this.isInvincible = false;
    this.invincibilityDuration = 500;
    this.isAnimating = false;

    //For level transitions
    this.advanceNumber = 0;

    //Turtle sinking flag
    this.turtlesAreSunk = false;

    //Color loading array
    this.colorArray = null;

    //advanced feature variables
    this.queueChance = 0;

  }

  create(data) {
    // Set level based on data passed in
    document.getElementById("ui-bar").style.display = "flex"; //display the UI-bar
    this.level = data["level"];
    // Timer setup from level data
    this.timerDuration = levels[data["level"]]["time"];
    this.timeRemaining = this.timerDuration;
    this.bombTimerUI = document.getElementById("bomb-timer");
    this.bombTimerUI.style.visibility = "hidden";

    // Initialize various level-based properties
    this.lives = levels[data["level"]]["number_of_lives"];
    this.carSpeedMultiplier = levels[data["level"]]["car_speed_multiplier"];
    this.logSpeedMultiplier = levels[data["level"]]["log_speed_multiplier"];
    this.turtleSpeedMultiplier = levels[data["level"]]["turtle_speed_multiplier"];
    this.turtleSinkMultiplier = levels[data["level"]]["turtle_sink_multiplier"];

    // Object and spacing properties for vehicles and logs
    this.numberOfCars = levels[data["level"]]["number_of_cars"];
    this.cars = levels[data["level"]]["car_texture"];
    this.carsForward = levels[data["level"]]["cars_Forward_texture"];
    this.carSpacing = levels[data["level"]]["car_spacing"];
    this.numberOfLogs = levels[data["level"]]["number_of_logs"];
    this.logTexture = levels[data["level"]]["log_texture"];
    this.logSpacing = levels[data["level"]]["log_spacing"];
    this.numberOfTurtles = levels[data["level"]]["number_of_turtles"];
    this.turtleTexture = levels[data["level"]]["turtle_texture"];
    this.turtleTextureForward = levels[data["level"]]["turtles_Forward_texture"];
    this.turtleSpacing = levels[data["level"]]["turtle_spacing"];

    //advanced feature variables. 
    this.queueChance = levels[data["level"]]["queue_chance"];
    this.advanceNumber = levels[data["level"]]["advance_number"];
    this.decrementScore = levels[data["level"]]["score_decrease"];

    //shermie bomb variables
    this.bombSpawnRate = levels[data["level"]]["bomb_spawn_rate"];
    this.bombTimer = levels[data["level"]]["bomb_timer"];

    this.updateLives(); //display lives in the html bar

    // Add player sprite with physics

    //calls the getColor method for random colors assginment
    this.colorArray = this.getColors();
    this.shermieColor = this.colorArray[this.shermieIndex][0];//Shermie Comparison Code
    this.shermieTexture = this.colorArray[this.shermieIndex][1];//Shermie sprite color

    //Loop the animation frame for bomb shermie
    this.anims.create({
        key: "burnFuse",
        frames: this.anims.generateFrameNumbers("shermieBomb", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });


    /*Bomb shermie and Color coded shermie
    Applying texture for shermie */
    this.shermie = this.physics.add.sprite(this.width / 2, this.height - this.safeZoneSize + this.moveDistance / 2, this.shermieTexture);//Set Shermie sprite color according to function
    this.shermie.setData("color", this.shermieColor);//Set shermie color comparison code
    this.shermie.setData("isBomb", this.isBomb); //Set shermie as a bomb
    //END OF APPLYING

    //Setting the size and depth/keeping shermie inBounds
    this.shermie.setSize(50, 50, true); // Set hitbox size
    this.shermie.setScale(1); // Scale player sprite
    this.shermie.setDepth(10); // Scale player sprite
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
    const endZoneTexture = zoneType + "Goal";
    const roadZoneTexture = zoneType + "Road";
    const objectiveTexture = zoneType + "Objective";

    const objectiveZone = this.physics.add.staticGroup();
    const safeZone = this.physics.add.staticGroup();
    const endZone = this.physics.add.staticGroup();
    const waterZone = this.physics.add.staticGroup();

    //removed for the sake of changing the nature of the way winning works, left in in the event we decide to change it back
    const filledGoals = this.physics.add.staticGroup();

    // Define lane boundaries for water lanes
    const laneWidth = this.moveDistance;
    const laneStart = roadEnd - this.safeZoneSize / 2 - this.moveDistance / 2;

    //This is used for background image size. used to paint the lanes
    const imageWidth = this.width / 10;
    const imageHeight = this.height / (this.numberOfLanes * 2 + 3);

    //LAST ROW DANGER ZONE LOGIC
    let danger;
    if (this.textures.exists(endZoneTexture)) {
      // If goal zone background texture exist
      for (let j = 0; j < this.width; j += imageWidth) {
        // For each image in goal background zone
        danger = this.add
          .image(j + imageWidth / 2, laneWidth / 2, endZoneTexture)
          .setDisplaySize(imageWidth, imageHeight)
          .setDepth(-1);
        this.physics.add.existing(danger, true); // Add physics to each background image
        endZone.add(danger); //danger zone
      }
    } else {
      for (let j = 0; j < this.width; j += imageWidth) {
        danger = this.add.rectangle(j + imageWidth / 2, laneWidth / 2, imageWidth, this.moveDistance, 0x800000).setDepth(-1);
        this.physics.add.existing(danger, true);
        endZone.add(danger);
      }
    }
    // END LAST ROW DANGER ZONELOGIC

    //OBJECTIVE PLACEMENT
    let objective;
    let x = imageWidth * 2; // Initial starting position for each objective segment

    if (this.textures.exists(objectiveTexture)) {
      // Use images if the texture exists\
      // if(this.advanceNumber > 0){
      //   this.advanceNumber = 0;
      // }
      let goalIndex = 0;
      for (let j = 0; j < imageWidth * 4; j += imageWidth) {
        //this 4 could be replaced by a variable, but we statically divide all by 10 so it works. If that changes we need to change this
        objective = this.add
          .image(x, laneWidth / 2, objectiveTexture)
          .setDisplaySize(imageWidth, imageHeight)
          .setDepth(0);
        objective.setData("color", this.colorArray[goalIndex][0]);//Set color for later comparison with shermie
        objective.setTint(objective.tint * 0.2 + this.colorArray[goalIndex][2] * 0.8);
        this.physics.add.existing(objective, true);
        objectiveZone.add(objective);
        x += imageWidth * 2; // Space out each objective
        // this.advanceNumber++;
        goalIndex++;
      }
    } else {
      // Use maroon rectangles if the texture does not exist      
      // if(this.advanceNumber > 0){
      //   this.advanceNumber = 0;
      // }
      for (let j = 0; j < imageWidth * 4; j += imageWidth) {
        objective = this.add
          .rectangle(x, laneWidth / 2, imageWidth, imageHeight, 0x00ff00) // Maroon color in hex
          .setDepth(0);
        this.physics.add.existing(objective, true);
        objectiveZone.add(objective);
        x += imageWidth * 2; // Space out each objective
      }
    }
    //END OBJECTIVE PLACEMENT

    // SAFE ZONE LOGIC
    if (this.textures.exists(safeZoneTexture)) {
      // Top safe zone
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
      for (let j = 0; j < this.width; j += imageWidth) {
        const rectBottom = this.add.rectangle(j + imageWidth / 2, this.height - this.safeZoneSize / 2, imageWidth, this.safeZoneSize, 0x9400f9).setDepth(-1);
        this.physics.add.existing(rectBottom, true);
        safeZone.add(rectBottom);

        const rectTop = this.add.rectangle(j + imageWidth / 2, roadEnd - this.safeZoneSize / 2, imageWidth, this.safeZoneSize, 0x9400f9).setDepth(-1);
        this.physics.add.existing(rectTop, true);
        safeZone.add(rectTop);
      }
    }
    // END SAFE ZONE LOGIC

    //SHERMIE QUEUE LOGIC
    
    let boundarySpriteTexture;
    if (this.textures.exists('pasture')) {
      for (let j = 0; j < (this.width / 2 - this.safeZoneSize / 2); j += imageWidth) {
        const isLast = j + imageWidth >= (this.width / 2 - this.safeZoneSize / 2); 
        this.boundarySpriteTexture = this.add.sprite(j + (imageWidth / 20),this.height - this.safeZoneSize / 2,isLast ? 'pasture_end' : 'pasture').setDepth(0);
    }
    } else {
        // pasture fallback
        this.boundarySpriteTexture = this.add.rectangle(this.width / 4 - this.safeZoneSize / 2, this.height - this.safeZoneSize / 2, this.width / 2 - this.safeZoneSize / 2, this.safeZoneSize, 0x00ff00).setStrokeStyle(5, 0x00ff00).setFillStyle(0x00000,0).setDepth(1);
    }
    this.physics.add.existing(this.boundarySpriteTexture, true);
    this.spritePlacementX = this.boundarySpriteTexture.x + this.boundarySpriteTexture.displayWidth / 2 - this.shermie.width;
    //END SHERMIE QUEUE LOGIC

    //WATER ZONE LOGIC
    let waterZoneTexture;
    if (this.textures.exists(zoneType)) {
      for (let i = 0; i < this.numberOfLanes; i++) {
        const waterY = roadEnd - (laneWidth + laneWidth / 2) - laneWidth * i; // Adjust y-coordinate per lane
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
      for (let i = 0; i < this.numberOfLanes; i++) {
        const waterY = roadEnd - (laneWidth + laneWidth / 2) - laneWidth * i;
        for (let j = 0; j < this.width; j += imageWidth) {
          const rect = this.add.rectangle(j + imageWidth / 2, waterY, imageWidth, imageHeight, 0x1a31ac).setDepth(-2);
          this.physics.add.existing(rect, true);
          waterZone.add(rect);
        }
      }
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
        this.isInvincible = false;
        this.isAnimating = false;
      },
      null,
      this
    );

    // Create physics groups for vehicles and logs
    this.vehicles = this.physics.add.group();
    this.logs = this.physics.add.group();
    this.turtles = this.physics.add.group();
    this.sinkingTurtles = this.physics.add.group();
    

    // Spawn environmental objects based on configuration
    createVehicles(this, roadStart, roadWidth, this.cars, this.carsForward, this.carSpacing);
    createLogs(this, laneStart, laneWidth, this.logTexture, this.logSpacing);
    createTurtles(this, laneStart, laneWidth, this.turtleTexture, this.turtleTextureForward, this.turtleSpacing);
    
    this.physics.add.overlap(this.shermie, objectiveZone, (shermie, objective) => {
      // Check if there’s already a killerShermie at this position
      if (!this.physics.overlap(shermie, filledGoals) && objective.getData("color") == shermie.getData("color")) {
        this.decrementFlag = false;
        this.goalCollision(); // Proceed with the goal logic
        // setTimeout(() => {
        //   const killerShermie = this.add.image(objective.x, objective.y, "shermie");
        //   this.physics.add.existing(killerShermie, true);
        //   filledGoals.add(killerShermie); // Add to filledGoals
        // }, 1);
      } else {
        this.decrementFlag = true;
        this.goalCollision(); // Call decrementScore if already colliding with a different colored goal
      }
    }, null, this);
    
    this.physics.add.overlap(this.shermie, this.vehicles, this.loseLife, null, this);
    this.physics.add.overlap(this.shermie, waterZone, () => {
      if (!this.isInvincible && !this.isAnimating && !this.physics.overlap(this.shermie, this.logs) && !this.physics.overlap(this.shermie, this.turtles) && !this.physics.overlap(this.shermie, this.sinkingTurtles)) {
        if (!this.inWater) { // inWater flag to prevent repeated triggers
          this.inWater = true;
          this.shermie.setVelocity(0, 0);
          this.loseLife();
          this.time.delayedCall(1000, () => { this.inWater = false; }); // Reset after delay
        }
      }
    }, null, this);

    this.physics.add.overlap(this.shermie, filledGoals, this.loseLife, null, this);
    this.physics.add.overlap(this.shermie, endZone,() => {this.shermie.setVelocity(0,0);

    if (!this.physics.overlap(this.shermie, objectiveZone)) {
      this.loseLife();
    }
    }, null, this);

    this.physics.add.overlap(this.shermie, this.logs, this.rideLog, null, this);
    this.physics.add.overlap(this.shermie, this.turtles, this.rideTurtle, null, this);
    this.physics.add.overlap(this.shermie, this.sinkingTurtles, this.rideTurtle, null, this);

    this.playing = true;

    // Start the timer for gameplay
    document.getElementById("time").innerText = `Time: ${this.timeRemaining}`;

    this.timer.start();

    // Create the death animation sequence
    this.defaultTexture = this.shermieTexture;

    this.anims.create({
      key: "shermieDeath", // Name of the animation
      frames: [{ key: "death1" }, { key: "death2" }, { key: "death3" }, { key: "death4" }],
      frameRate: 6, //speed of animation
      repeat: 0, // no repeat
    });
  }

  update() {
    if (this.paused) return;

    document.getElementById("score").innerText = `Score: ${this.goalCount}`;
    if (this.canMove && !this.isAnimating && !this.inWater) {
      if (this.cursors.left.isDown && this.shermie.x > 0) {
        this.shermie.x -= this.moveDistance;
        this.sound.play("hop");
      } else if (this.cursors.right.isDown && this.shermie.x < this.width) {
        this.shermie.x += this.moveDistance;
        this.sound.play("hop");
      } else if (this.cursors.up.isDown && this.shermie.y > 0) {
        this.shermie.y -= this.moveDistance;
        this.sound.play("hop");
      } else if (this.cursors.down.isDown && this.shermie.y < this.height) {
        this.shermie.y += this.moveDistance;
        this.sound.play("hop");
      }
      this.canMove = false;
    }

    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.canMove = true;
    }

    if(this.shermie.y >= this.height - this.moveDistance){
      this.shermie.x = Phaser.Math.Clamp(this.shermie.x, this.width / 2 - this.moveDistance / 4, this.width - this.moveDistance / 2);
    }else{
      this.shermie.x = Phaser.Math.Clamp(this.shermie.x, this.moveDistance / 2 , this.width - this.moveDistance / 2);
    }
    
    //this logic still alows the user to press down when above, allowing them to basically teleport to the front of the pasture, but I think this is fine, because it's less limiting to the game space. 
    if (this.shermie.x < this.width / 2 - this.moveDistance / 2) {
      this.shermie.y = Phaser.Math.Clamp(this.shermie.y, 0, this.height - this.safeZoneSize - this.shermie.height);
    } else {
        this.shermie.y = Phaser.Math.Clamp(this.shermie.y, 0, this.height - this.moveDistance + this.moveDistance / 2);
    }

    this.vehicles.getChildren().forEach((vehicle) => {
      const isOffScreenLeft = vehicle.x < -vehicle.width / 2;
      const isOffScreenRight = vehicle.x > this.width + vehicle.width / 2;

      if (isOffScreenLeft || isOffScreenRight) {
        vehicle.x = isOffScreenLeft ? this.width + vehicle.width / 2 : -vehicle.width / 2;
      }
    });

    this.logs.getChildren().forEach((log) => {
      const isOffScreenLeft = log.x < -log.width / 2;
      const isOffScreenRight = log.x > this.width + log.width / 2;

      if (isOffScreenLeft) {
        log.x = this.width + log.width / 2;
      } else if (isOffScreenRight) {
        log.x = -log.width / 2;
      }
    });

    this.turtles.getChildren().forEach((turtle) => {
      const isOffScreenLeft = turtle.x < -turtle.width / 2;
      const isOffScreenRight = turtle.x > this.width + turtle.width / 2;

      if(isOffScreenLeft){
        turtle.x = this.width + turtle.width / 2;
      }else if(isOffScreenRight){
        turtle.x = -turtle.width / 2;
      }
    })

    this.sinkingTurtles.getChildren().forEach((turtle) => {
      const isOffScreenLeft = turtle.x < -turtle.width / 2;
      const isOffScreenRight = turtle.x > this.width + turtle.width / 2;

      if(isOffScreenLeft){
        turtle.x = this.width + turtle.width / 2;
      }else if(isOffScreenRight){ 
        turtle.x = -turtle.width / 2;
      }
    })
  }

  spawnVehicle(x, y, texture, speed) {
    let vehicle = this.vehicles.create(x, y, texture);
    vehicle.body.setVelocityX(speed);
    vehicle.body.allowGravity = false;
    vehicle.body.immovable = true;
    return vehicle;
  }

  spawnLog(x, y, texture, speed) {
    let log = this.logs.create(x, y, texture);
    log.body.setVelocityX(speed);
    log.body.allowGravity = false;
    log.body.immovable = true;
    log.body.setSize(log.width, 50);
    log.setDepth(-1);
    return log;
  }

  spawnTurtle(x, y, texture, speed, canSink){
    if(canSink){
      let turtle = this.turtles.create(x, y, texture);
      turtle.body.setVelocityX(speed);
      turtle.body.allowGravity = false;
      turtle.immovable = true;
      turtle.body.setSize(turtle.width, 50);
      turtle.setDepth(-1);
      return turtle;
    }
    else{
      let turtle = this.sinkingTurtles.create(x, y, texture);
      turtle.body.setVelocityX(speed);
      turtle.body.allowGravity = false; 
      turtle.immovable = true;
      turtle.body.setSize(turtle.width, 50);
      turtle.setDepth(-1);
      return turtle;
    }
  }

  loseLife() {
    if (this.isInvincible || this.isAnimating) {
      return;
    }
    this.isAnimating = true;
    this.isInvincible = true;
    this.shermie.anims.play("shermieDeath");
    this.sound.play("squash");
    this.shermie.once("animationcomplete-shermieDeath", () => {
      this.shermie.setTexture(this.shermieTexture);
      this.gameLogic.loseLife();
    });
  }

  goalCollision() {
    this.gameLogic.goal();
    if(this.shermieIndex == this.advanceNumber)
      this.shermieIndex = 0;
    else
      this.shermieIndex++;

    this.shermieTexture = this.colorArray[this.shermieIndex][1];
    this.shermie.setTexture(this.shermieTexture);
    this.shermie.setData("color", this.colorArray[this.shermieIndex][0]);

   // Bomb logic
    const randomChance = Math.random();

    // Reset bomb flag
    this.isBomb = false;

    // Determine if the Shermie should be a bomb
    if (randomChance < this.bombSpawnRate) { // Pulled the spawn rate from the JSON file
        this.isBomb = true;
        this.shermieTexture = "shermieBomb";  // Update the next Shermie to be a bomb
        this.shermie.setTexture(this.shermieTexture);  // Update the texture for Shermie
    } 
      
    // Only start the bomb timer if it's actually a bomb
      if (this.isBomb) {
          this.bombTimerUI.style.visibility = "visible";
          this.timer.getBomb(this.shermie);  
      } else {
          this.bombTimerUI.style.visibility = "hidden";
      }
  }

  updateTimer() {
    this.timer.update();
  }

  rideLog(shermie, log) {
    if (!this.inWater) {
      shermie.setVelocityX(log.body.velocity.x);
    }
  }

  rideTurtle(shermie, turtle){
    if(!this.inWater){
      shermie.setVelocityX(turtle.body.velocity.x);
    }
  }

  sinkTurtles() {
    this.sinkingTurtles.getChildren().forEach((turtle) => {
      turtle.body.allowOverlap = false;
      turtle.setVisible(false);
      turtle.body.checkCollision.none = true;
    });
    this.turtlesAreSunk = true;
  }
  
  raiseTurtles(){
    this.sinkingTurtles.getChildren().forEach((turtle) => {
      turtle.body.allowOverlap = true;
      turtle.setVisible(true);
      turtle.body.checkCollision.none = false;
    });
    this.turtlesAreSunk = false;
  }

  togglePause() {
    if (this.paused) {
      this.paused = false;
      this.timer.resume();
      this.timer.resumeBombTimer();
    } else {
      this.pauseMenu.show();
      this.paused = true;
      this.timer.pause();
      this.timer.pauseBombTimer();
    }
  }

  getAdvanceNumber() {
    return this.advanceNumber;
  }

  getNumberOfLevels() {
    return levels.length;
  }

  updateLives() {
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = "";

    const base64Image = this.textures.getBase64("shermie");

    for (let i = 0; i < this.lives; i++) {
      const lifeIcon = document.createElement("img");
      lifeIcon.src = base64Image;
      lifeIcon.classList.add("life-icon");
      livesContainer.appendChild(lifeIcon);
    }
  }

  getColors(){
    //FIXME - Return a datastructure that has an equal number of entries to the number of goals
    // The structure will contain color comparison codes, shermie colors, and goal zone tints.
    // Will be called once at game generation, guarantees that shermie textures correspond directly with goal zone colors.

    //Load comparison codes, shermie textures, and tint hexcodes for goal zones
    const redColor = "red"; const redShermie = "shermieRed"; const redTint = 0xff0000;;
    const blueColor = "blue"; const blueShermie = "shermieBlue"; const blueTint = 0x0000ff;
    const greenColor = "green"; const greenShermie = "shermieGreen"; const greenTint = 0x00ff00;
    const yellowColor = "yellow"; const yellowShermie = "shermieYellow"; const yellowTint = 0xffff00;
    const orangeColor = "orange"; const orangeShermie = "shermieOrange"; const orangeTint = 0xffa500;
    const purpleColor = "purple"; const purpleShermie = "shermiePurple"; const purpleTint  = 0x800080;

    const colors = [redColor, blueColor, greenColor, yellowColor, orangeColor, purpleColor];
    const shermies = [redShermie, blueShermie, greenShermie, yellowShermie, orangeShermie, purpleShermie];
    const tints = [redTint, blueTint, greenTint, yellowTint, orangeTint, purpleTint];
    
    let colorProperties = Array(this.numOfGoals);

    for(let i = 0; i < this.numOfGoals; i++){
       const index = Math.floor(Math.random() * colors.length);
       colorProperties[i] = [colors[index], shermies[index], tints[index]];
    }

    return colorProperties;
  }
}
