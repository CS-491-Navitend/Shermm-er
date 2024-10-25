export function createVehicles(scene, roadStart, roadWidth, cars, carsForward, carSpacing) {
  for (let road = 0; road < scene.numberOfRoads; road++) {
    const randomSpeed = Phaser.Math.Between(100, 300) * scene.carSpeedMultiplier * (road % 2 === 0 ? 1 : -1);

    let lastVehicleX = 0;

    for (let i = 0; i < scene.numberOfCars; i++) {
      const randomCar = (randomSpeed > 0 ? carsForward : cars)[Math.floor(Math.random() * (randomSpeed > 0 ? carsForward.length : cars.length))];
      const randomSpacing = carSpacing[Math.floor(Math.random() * carSpacing.length)];

      lastVehicleX += randomSpacing;

      scene.spawnVehicle(lastVehicleX, roadStart - roadWidth * road - roadWidth / 2, randomCar, randomSpeed);
    }
  }
}

export function createLogs(scene, laneStart, laneWidth, logs, logSpacing) {
  for (let lane = 0; lane < scene.numberOfLanes; lane++) {
    const randomSpeed = Phaser.Math.Between(100, 300) * scene.logSpeedMultiplier * (lane % 2 === 0 ? 1 : -1);

    let lastLogX = 0;

    for (let i = 0; i < scene.numberOfLogs; i++) {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      const randomSpacing = logSpacing[Math.floor(Math.random() * logSpacing.length)];

      lastLogX += randomSpacing;

      scene.spawnLog(lastLogX, laneStart - laneWidth * lane - laneWidth / 2, randomLog, randomSpeed);
    }
  }
}
