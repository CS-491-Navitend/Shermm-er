export function createVehicles(scene, roadStart, roadWidth, cars, carsForward, spacing) {
  // Iterate over each road
  for (let road = 0; road < scene.numberOfRoads; road++) {
    // Determine vehicle speed, alternating direction based on road index
    const speed = Phaser.Math.Between(100, 300) * scene.carSpeedMultiplier * (road % 2 === 0 ? 1 : -1);

    let lastVehicleX = 0;

    // Spawn vehicles on the current road
    for (let i = 0; i < scene.numberOfCars; i++) {
      // Choose a car based on speed direction
      const car = (speed > 0 ? carsForward : cars)[Math.floor(Math.random() * (speed > 0 ? carsForward.length : cars.length))];
      // Select a random spacing between vehicles
      const spacingIndex = Math.floor(Math.random() * spacing.length);
      lastVehicleX += spacing[spacingIndex];

      // Spawn the vehicle at the calculated position
      scene.spawnVehicle(lastVehicleX, roadStart - roadWidth * road - roadWidth / 2, car, speed);
    }
  }
}

export function createLogs(scene, laneStart, laneWidth, logTextures, spacingOptions) {
  // Iterate over each water lane
  for (let laneIndex = 0; laneIndex < scene.numberOfLanes; laneIndex++) {
    // Determine log speed, alternating direction based on lane index
    const speed = Phaser.Math.Between(100, 300) * scene.logSpeedMultiplier * (laneIndex % 2 === 0 ? 1 : -1);
    let currentX = 0;

    // Spawn logs on the current lane
    for (let logIndex = 0; logIndex < scene.numberOfLogs; logIndex++) {
      // Choose a random log texture
      const texture = logTextures[Math.floor(Math.random() * logTextures.length)];
      // Select a random spacing between logs
      const spacing = spacingOptions[Math.floor(Math.random() * spacingOptions.length)];
      currentX += spacing;

      // Spawn the log at the calculated position
      scene.spawnLog(currentX, laneStart - laneWidth * laneIndex - laneWidth / 2, texture, speed);
    }
  }
}
