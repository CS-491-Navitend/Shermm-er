import { Scene } from "phaser";
import FontFaceObserver from 'fontfaceobserver';

export class Credits extends Scene {
    constructor() {
        super("Credits");
    }

    create() {
        // Title
        this.add.text(512, 100, "Credits", {
            fontFamily: "Pixel",
            fontSize: "32px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Credits content
        const credits = [
            "Game Development",
            "Colin Chik",
            "Steve",
            "Johnny",
            "Art and Design",
            "Music",
            "Special Thanks",
            "Press Enter to return"
        ];

        credits.forEach((line, index) => {
            this.add.text(512, 150 + index * 30, line, {
                fontFamily: "Pixel",
                fontSize: "20px",
                color: "#ffffff",
            }).setOrigin(0.5);
        });

        // Input to return
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.stop("Credits")
            this.scene.start("MainMenu");

        });

 
    }
}