export function createVehicles(scene, roadStart, roadWidth, cars, carsforward, carSpacing) {
  for (let road = 0; road < scene.numberOfRoads; road++) {
    let randomSpeed = Phaser.Math.Between(100, 300) * scene.carSpeedMultiplier;

    if (road % 2 === 0) {
      randomSpeed = randomSpeed * -1;
    }

    let lastVehicle = null;  // Track last vehicle for this specific road

    for (let i = 0; i < scene.numberOfCars; i++) {
      const carArray = randomSpeed > 0 ? carsforward : cars;
      const randomCar = carArray[Math.floor(Math.random() * carArray.length)];
      const randomSpacing = carSpacing[Math.floor(Math.random() * carSpacing.length)];

      let newVehicleX = randomSpacing + i * randomSpacing;

      if (lastVehicle) {
        if (randomSpeed > 0) {
          newVehicleX = lastVehicle.x + lastVehicle.width + randomSpacing;
        } else {
          newVehicleX = lastVehicle.x - randomSpacing - lastVehicle.width;
        }
      }

      let vehicle = scene.spawnVehicle(newVehicleX, roadStart - roadWidth * road - roadWidth / 2, randomCar, randomSpeed);

      lastVehicle = vehicle;
    }
  }
}

export function createLogs(scene, laneStart, laneWidth, logs, logSpacing) {
  for (let lane = 0; lane < scene.numberOfLanes; lane++) {
    let randomSpeed = Phaser.Math.Between(100, 300) * scene.logSpeedMultiplier;
    
    if (lane % 2 === 0) {
      randomSpeed = randomSpeed * -1;  // Reverse direction for even-numbered lanes
    }
    let lastLog = null;

    for (let i = 0; i < scene.numberOfLogs; i++) {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      const randomSpacing = logSpacing[Math.floor(Math.random() * logSpacing.length)];

      //nolastlog uses default
      let newLogX = randomSpacing + i * randomSpacing;

      if (lastLog) {
        if (randomSpeed > 0) {
          // left to right after last log
          newLogX = lastLog.x + lastLog.width + randomSpacing;
        } else {
          // right to left after lastlog
          newLogX = lastLog.x - randomSpacing - lastLog.width;
        }
      }
      // Spawn the new log
      let log = scene.spawnLog(newLogX, laneStart - laneWidth * lane - laneWidth / 2, randomLog, randomSpeed);
      lastLog = log;
    }
  }
}