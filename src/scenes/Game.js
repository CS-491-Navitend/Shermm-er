import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    let canMove = true;
    globalThis.canMove = canMove;
    let moveDistance = 60;
    globalThis.moveDistance = moveDistance;

    let graphics = this.make.graphics({x: 0, y: 0, add: false});
    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(0, 0, 60, 30);
    graphics.generateTexture('car1', 60, 30);
    graphics.destroy();

    graphics = this.make.graphics({x: 0, y: 0, add: false});
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillRect(0, 0, 80, 30);
    graphics.generateTexture('car2', 80, 30);
    graphics.destroy();


    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("background", "/assets/background.jpeg");
  }

  create() {
    this.add.image(425, 390, "background").setScale(1);

    let shermie = this.physics.add.sprite(425, 10, "shermie");
    globalThis.shermie = shermie;
    shermie.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    const roadLines = this.add.graphics({lineStyle:{ width: 4, color: 0xffffff }});
    roadLines.strokeLineShape(new Phaser.Geom.Line(10, 420, 840, 420));
    drawDashedLine(roadLines, 10, 485, 840, 485, 20, 10);
    drawDashedLine(roadLines, 10, 545, 840, 545, 20, 10);
    drawDashedLine(roadLines, 10, 605, 840, 605, 20, 10);
    drawDashedLine(roadLines, 10, 665, 840, 665, 20, 10);
    roadLines.strokeLineShape(new Phaser.Geom.Line(10, 722, 840, 722));

    let goalZone = this.physics.add.staticGroup();
    let goal = this.add.rectangle(400, 50, 800, 50);
    this.physics.add.existing(goal, true);
    goalZone.add(goal);

    let vehicles = this.physics.add.group();
    globalThis.vehicles = vehicles;

    spawnVehicle(100, 635, 'car1', 100);
    spawnVehicle(700, 695, 'car2', -150);

    this.physics.add.overlap(shermie, goalZone, win, null, this);
    this.physics.add.overlap(shermie, vehicles, gameOver, null, this);
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

    //shermie arcade move
    if (canMove){
        if (this.cursors.left.isDown && shermie.x > 10) {
            shermie.x -= moveDistance;
            canMove = false;
        }
        if (this.cursors.right.isDown && shermie.x < 850) {
            shermie.x += moveDistance;
            canMove = false;
        }
        if (this.cursors.up.isDown && shermie.y > 10) {
            shermie.y -= moveDistance;
            canMove = false;
        }
        if (this.cursors.down.isDown && shermie.y < 780) {
            shermie.y += moveDistance;
            canMove = false;
        }
    }
    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown){canMove = true;}

    shermie.x = Phaser.Math.Clamp(shermie.x, 10, 850);
    shermie.y = Phaser.Math.Clamp(shermie.y, 10, 780);

    /*
    if (shermie.x < 10) shermie.x = 10;
    if (shermie.x > 790) shermie.x = 790;
    if (shermie.y < 50) shermie.y = 50;
    if (shermie.y > 550) shermie.y = 550;
    */

    vehicles.getChildren().forEach((vehicle)=>{
        //console.log(`Vehicle Position: x=${vehicle.x}, y=${vehicle.y}, VelocityX=${vehicle.body.velocity.x}`); //used to test movement
        if (vehicle.x > 800 + vehicle.width / 2)vehicle.x = -vehicle.width / 2;
        else if (vehicle.x < -vehicle.width / 2)vehicle.x = 800 + vehicle.width / 2; 
    });
}

}

function drawDashedLine(graphics, x1, y1, x2, y2, dashLength, gapLength){
    let x = x1;
    const step = dashLength + gapLength;

    while(x < x2){
        graphics.strokeLineShape(new Phaser.Geom.Line(x, y1, x + dashLength, y2));
        x += step;
    }
}

function spawnVehicle(x, y, texture, speed){
    let vehicle = vehicles.create(x, y, texture);
    vehicle.body.setVelocityX(speed);
    vehicle.body.allowGravity = false;
    vehicle.body.immovable = true;

    //console.log(`Created vehicle: ${texture}, at (${x}, ${y}), Speed: ${speed}`);//line to show velocity
}

//temp win condition

//TODO: Implement logic into a menu
function win(){
    console.log('Win triggered.');
    reset();
}

//TODO: Implement logic into a menu
function gameOver(){
    console.log('Game Over!');
    reset();
}

//TODO: Implement logic into a menu
function reset(){
    shermie.x = 415;
    shermie.y = 775;
}
