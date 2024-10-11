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

    this.load.image("car4", "/assets/car4.png");
    this.load.image("car4forward", "/assets/car4forward.png");

    this.load.image("car5", "/assets/car5.png");
    this.load.image("car5forward", "/assets/car5forward.png");

    this.load.image("car6", "/assets/car6.png");
    this.load.image("car6forward", "/assets/car6forward.png");

    this.load.image("car7", "/assets/car7.png");
    this.load.image("car7forward", "/assets/car7forward.png");

    this.load.image("car8", "/assets/car8.png");
    this.load.image("car8forward", "/assets/car8forward.png");

    this.load.image("car9", "/assets/car9.png");
    this.load.image("car9forward", "/assets/car9forward.png");

    this.load.image("car10", "/assets/car10.png");
    this.load.image("car10forward", "/assets/car10forward.png");

    this.load.image("car11", "/assets/car11.png");
    this.load.image("car11forward", "/assets/car11forward.png");

    this.load.image("car12", "/assets/car12.png");
    this.load.image("car12forward", "/assets/car12forward.png");

    this.load.image("car13", "/assets/car13.png");
    this.load.image("car13forward", "/assets/car13forward.png");

    this.load.image("f1car", "/assets/f1car.png");

    this.load.image("tractor", "/assets/TractorTrailerForward.png");

    //Load Logs and turtles
    this.load.image("ShortLogo", "/assets/ShortLogo.png");
    this.load.image("LongLog", "/assets/LongLogo.png");
    this.load.image("Turtle", "/assets/turtle.png");
    this.load.image("turtleforward", "/assets/turtleforward.png");

    //Load images
    this.load.image("shermie", "/assets/shermie.png");
    this.load.image("background", "/assets/background.jpeg");
    this.load.image("life", "/assets/heart.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
