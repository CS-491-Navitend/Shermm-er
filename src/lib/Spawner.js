export function createVehicles(scene, roadStart, roadWidth, cars, carsforward, carSpacing) {
  for (let road = 0; road < scene.numberOfRoads; road++) {
    let randomSpeed = Phaser.Math.Between(100, 300) * scene.carSpeedMultiplier;

    // Reverse direction for even-numbered roads
    if (road % 2 == 0) {
      randomSpeed = randomSpeed * -1;
    }

    for (let i = 0; i < scene.numberOfCars; i++) {
      const carArray = randomSpeed > 0 ? carsforward : cars;
      const randomCar = carArray[Math.floor(Math.random() * carArray.length)];
      const randomSpacing = carSpacing[Math.floor(Math.random() * carSpacing.length)];

      scene.spawnVehicle(randomSpacing + i * randomSpacing, roadStart - roadWidth * road - roadWidth / 2, randomCar, randomSpeed);
    }
  }
}

  export function createLogs(scene, laneStart, laneWidth, logs, logSpacing) {
    for (let lane = 0; lane < scene.numberOfLanes; lane++) {
      let randomSpeed = Phaser.Math.Between(100, 300) * scene.logSpeedMultiplier;
      if (lane % 2 == 0) {
        randomSpeed = randomSpeed * -1;
      }

      for (let i = 0; i < scene.numberOfLogs; i++) {
        const randomLog = logs[Math.floor(Math.random() * logs.length)];
        const randomSpacing = logSpacing[Math.floor(Math.random() * logSpacing.length)];
        // Call the spawnLog function
        scene.spawnLog(randomSpacing + i * randomSpacing, laneStart - laneWidth * lane - laneWidth / 2, randomLog, randomSpeed);
      }
    }
  }