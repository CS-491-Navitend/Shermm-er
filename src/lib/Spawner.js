export function createVehicles(scene, roadStart, roadWidth, cars, carsForward, spacing) {
  // Iterate over each road
  for (let road = 0; road < scene.numberOfRoads; road++) {
    const speed = Phaser.Math.Between(100, 300) * scene.carSpeedMultiplier * (road % 2 === 0 ? 1 : -1);
    let lastVehicleX = 0;

    const vehicleArray = road % 2 === 0 ? carsForward : cars;
    
    const vehicleType = vehicleArray[Math.floor(Math.random() * vehicleArray.length)];

    // for(let i =0 ; i<spacing.length; i++){console.log(spacing[i])}
    for (let i = 0; i < scene.numberOfCars; i++) {
      const spacingIndex = Math.floor(Math.random() * spacing.length);
      lastVehicleX += spacing[spacingIndex];
      scene.spawnVehicle(lastVehicleX, roadStart - roadWidth * road - roadWidth / 2, vehicleType, speed);
    }
  }
}

export function createLogs(scene, laneStart, laneWidth, logTextures, spacingOptions) {
  //Iterate over each water lane -- TODO - Change for lanes to only be occupied by one body
  for (let laneIndex = 0; laneIndex < scene.numberOfLanes; laneIndex+=2) {//TEMP - SET UP LOGS TO BE ON EVEN LANES
    // Determine log speed, alternating direction based on lane index
    const speed = Phaser.Math.Between(100, 300) * scene.logSpeedMultiplier * (laneIndex % 2 === 0 ? 1 : -1);
    let currentX = 0;

    // Pre-assign a random log texture for this lane
    const logTexture = logTextures[Math.floor(Math.random() * logTextures.length)];

    // Spawn logs on the current lane using the pre-assigned texture
    for (let logIndex = 0; logIndex < scene.numberOfLogs; logIndex++) {
      const spacing = spacingOptions[Math.floor(Math.random() * spacingOptions.length)];
      currentX += spacing;
      console.log(spacing)

      // Spawn the log at the calculated position using the pre-assigned texture
      scene.spawnLog(currentX, laneStart - laneWidth * laneIndex - laneWidth / 2, logTexture, speed);
    }
  }
}

export function createTurtles(scene, laneStart, laneWidth, turtleTextures, turtleTexturesForward, spacingOptions) {
  //Iterate over each water lane -- TODO - Change for lanes to only be occupied by one body
  for(let laneIndex = 1; laneIndex < scene.numberOfLanes; laneIndex+=2) {//TEMP - SET UP TURTLES ON ODD LANES
    const speed = Phaser.Math.Between(100, 300) * scene.turtleSpeedMultiplier * (laneIndex % 2 === 0 ? 1 : -1);
    let currentX = 0;
    
    const turtleArray = laneIndex % 2 === 0 ? turtleTextures : turtleTexturesForward;
    
    const turtleTexture = turtleArray[Math.floor(Math.random() * turtleTextures.length)];

    for(let turtleIndex = 0; turtleIndex < scene.numberOfTurtles; turtleIndex++) {
      const spacing = spacingOptions[Math.floor(Math.random() * spacingOptions.length)];
      currentX += spacing;
      console.log(spacing);

      scene.spawnTurtle(currentX, laneStart - laneWidth * laneIndex - laneWidth / 2, turtleTexture, speed);
    }
  }
}
