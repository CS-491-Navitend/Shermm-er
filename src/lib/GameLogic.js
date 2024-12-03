export class GameLogic {
  constructor(game) {
    this.game = game; // Get the game object from the scene
    this.shermieSprites = [];
  }

  goal() {
    if (!this.game.isToxic) {
      if (this.game.bonusFlag && !this.game.isToxic) {//Check to see if different color goal zone was hit
        this.game.goalCount += 1 + this.game.bonusScore;
      } else {
        this.game.goalCount++;
      }
    } else {
      if (this.game.goalCount > 0) {
        this.game.goalCount--;
      } else {
        this.game.goalCount = 0;
      }
    }
    if (this.game.goalCount < this.game.advanceNumber) {
      this.game.createShermie();
      this.resetPlayer();
    }
    else {
      this.win();
    }
    this.tryRemoveShermieSprite();
  }

  win() {
    this.game.winCount++;
    this.game.scene.start("GameWin", { game: this.game });
  }

  loseLife() {
    this.game.lives--;
    this.game.updateLives(); // Update UI after life decrement

    this.game.resetCount++;
    if (this.game.lives < 1) {
      this.gameOver();
      this.game.lives = 3;
    }
    this.resetPlayer();
  }

  gameOver() {
    this.game.goalCount = 0;
    this.game.playing = false;
    this.game.inWater = false;
    this.game.scene.start("GameOver", { game: this.game });
  }

  resetPlayer() {
    this.game.isInvincible = false;
    this.game.isAnimating = false;
    this.game.shermie.setVelocity(0, 0);
    this.game.shermie.x = this.game.width / 2;
    this.game.shermie.y = this.game.height - this.game.safeZoneSize + this.game.moveDistance / 2;

    if (this.game.shermieType == "bomb") {
      this.game.shermie.play("burnFuse");
    }
  }
  tryAddShermieSprite() {
    if (this.game.spritePlacementX < 0) {
      this.gameOver();
      return;
    }
    const newShermie = this.game.add.sprite(this.game.spritePlacementX, this.game.boundarySpriteTexture.y, 'shermie');
    // newShermie.setDisplaySize(this.game.shermie.width, this.game.shermie.height);
    this.shermieSprites.push(newShermie);
    this.game.spritePlacementX -= this.game.shermie.width;
  }

  tryRemoveShermieSprite() {
    if (this.shermieSprites.length === 0) {
      return false;
    }
    const spriteToRemove = this.shermieSprites.pop();
    spriteToRemove.destroy();

    this.game.spritePlacementX += this.game.shermie.width;

    return true;
  }


  nextLevel() {
    this.game.goalCount = 0;
    this.game.level += 1;
    if (this.game.level < this.game.getNumberOfLevels()) {
      this.game.scene.start("TutorialMenu", { level: this.game.level })
      //this.game.scene.start("Game", { level: this.game.level });
    } else {
      this.game.scene.start("Credits");
    }
  }

  tryRemoveRat() {
    const ratsContainer = document.getElementById('rats-container');
    if (ratsContainer && ratsContainer.children.length > 0) {
      ratsContainer.removeChild(ratsContainer.children[0]);
      this.tryAddShermieSprite();
    } else {
      return
    }
  }

  generateBlockers(game) {
    if (!game.block) {
      game.block = game.physics.add.staticGroup();
      console.log("Block group initialized in GameLogic.js");
    }

    if (game.block.getLength() < game.max_block) {
      const zones = game.objectiveZone.getChildren();

      if (zones.length > 0) {
        const eligibleZones = zones.filter(zone => !zone.getData("color"));
        if (eligibleZones.length > 0) {
          const randomZone = Phaser.Utils.Array.GetRandom(eligibleZones);
          const newBlock = game.add.sprite(randomZone.x, randomZone.y, "goalBlock");
          newBlock.setDepth(10);
          game.physics.add.existing(newBlock, true);
          game.block.add(newBlock);

          game.time.delayedCall(5000, () => {
            if (newBlock) {
              newBlock.destroy();
            }
          });
        }
      }
    }
  }


  spawnPowerUp(power) {
    const roadWidth = this.game.moveDistance;
    const roadStart = this.game.height - this.game.safeZoneSize;
    const roadEnd = roadStart - this.game.numberOfRoads * roadWidth;

    const powerUpSpots = [
      // [x, y]
      [100, roadEnd + roadWidth / 2 + roadWidth * 2],
      [400, roadEnd + roadWidth / 2 + roadWidth * 3],
      [700, roadEnd + roadWidth / 2 + roadWidth * 4],
      [400, roadEnd + roadWidth / 2 + roadWidth * 1],
      [100, roadEnd + roadWidth / 2 + roadWidth * 2],
      [200, roadEnd + roadWidth / 2 + roadWidth * 0],
      [600, roadEnd + roadWidth / 2 + roadWidth * 3],
      [700, roadEnd + roadWidth / 2 + roadWidth * 1],
      [500, roadEnd + roadWidth / 2 + roadWidth * 2],
      [300, roadEnd + roadWidth / 2 + roadWidth * 0],
      [800, roadEnd + roadWidth / 2 + roadWidth * 3],
      [900, roadEnd + roadWidth / 2 + roadWidth * 1],
      [700, roadEnd + roadWidth / 2 + roadWidth * 2],
      [500, roadEnd + roadWidth / 2 + roadWidth * 0],
      [100, roadEnd + roadWidth / 2 + roadWidth * 3],
      [200, roadEnd + roadWidth / 2 + roadWidth * 0],
      [300, roadEnd + roadWidth / 2 + roadWidth * 2],
      [400, roadEnd + roadWidth / 2 + roadWidth * 4],
    ];

    let color;

    // DETERMINE TEXTURES HERE
    switch (power) {
      case 0: // self service
        color = "selfService";
        break;
      // color = 0xff0000; // red
      case 1: // cleanse
        // color = 0x00ff00; // green
        color = "antidote";
        break;
      case 2: // super shermie
        // color = 0x0000ff; // blue
        color = "invulnerability";
        break;
    }

    // pick a random spot
    let spot = powerUpSpots[Math.floor(Math.random() * powerUpSpots.length)];

    // place a colored circle in the middle of the screen
    let x = spot[0];
    let y = spot[1];

    let sprite = this.game.add.sprite(x, y, color);
    let radius = 20;
    sprite.setData("type", power);
    //return [x, y, radius, powerUp, power];
    return sprite;
  }

}


export default GameLogic;
