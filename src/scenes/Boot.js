import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    //Load vehicle images
    this.load.image("car1", "/assets/car1.png");
    this.load.image("car1forward", "/assets/car1forward.png");

    this.load.image("car2", "/assets/car2.png");
    this.load.image("car2forward", "/assets/car2forward.png");

    this.load.image("car3", "/assets/car3.png");
    this.load.image("car3forward", "/assets/car3forward.png");

    this.load.image("tractor", "/assets/TractorTrailerForward.png");

    //Load images
    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("background", "/assets/background.jpeg");
    this.load.image("life", "/assets/heart.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
