import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //Load vehicle images
    this.load.image("car1", "/assets/car1.png");
    this.load.image("car1forward", "/assets/car1forward.png");

    this.load.image("car2", "/assets/car2.png");
    this.load.image("car2forward", "/assets/car2forward.png");

    this.load.image("car3", "/assets/car3.png");
    this.load.image("car3forward", "/assets/car3forward.png");

    this.load.image("tractor", "/assets/TractorTrailer.png");
    this.load.image("tractorforward", "/assets/TractorTrailerforward.png");

    //Load images
    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("background", "/assets/background.jpeg");
    this.load.image("life", "/assets/heart.png");

    //TODO - Load water assets (Turtles and Logs)
    
  }

  create() {
    // this.scene.start("Game", { level: 0 }); //dev level on start
    this.scene.start("MainMenu");
  }
}
