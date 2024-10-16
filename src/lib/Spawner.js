export function createVehicles(scene, roadStart, roadWidth, cars, carsforward, carSpacing) {
    for (let road = 0; road < scene.numberOfRoads; road++) {
      let direction = -200 * scene.carSpeedMultiplier;
      
      // Reverse direction for even-numbered roads
      if (road % 2 == 0) {
        direction = direction * -1;
      }
  
      for (let i = 0; i < scene.numberOfCars; i++) {
        const carArray = direction > 0 ? carsforward : cars;
        const randomCar = carArray[Math.floor(Math.random() * carArray.length)];
        const randomSpacing = carSpacing[Math.floor(Math.random() * carSpacing.length)];
  
        // Call the spawnVehicle function
        scene.spawnVehicle(randomSpacing + i * randomSpacing, roadStart - roadWidth * road - roadWidth / 2, randomCar, direction);
      }
    }
  }

  export function createLogs(scene, laneStart, laneWidth, logs, logSpacing) {
    for (let lane = 0; lane < scene.numberOfLanes; lane++) {
      let direction = -200 * scene.logSpeedMultiplier;
      
      // Reverse direction for even-numbered lanes
      if (lane % 2 == 0) {
        direction = direction * -1;
      }
  
      for (let i = 0; i < scene.numberOfLogs; i++) {
        const randomLog = logs[Math.floor(Math.random() * logs.length)];
        const randomSpacing = logSpacing[Math.floor(Math.random() * logSpacing.length)];
  
        // Call the spawnLog function
        scene.spawnLog(randomSpacing + i * randomSpacing, laneStart - laneWidth * lane - laneWidth / 2, randomLog, 100, direction);
      }
    }
  }