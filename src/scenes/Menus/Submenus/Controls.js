import { Scene } from "phaser";
import FontFaceObserver from 'fontfaceobserver';

export class Controls extends Scene {
    constructor() {
        super("Controls");
    }

    create() {
        // Title
        this.add.text(512, 100, "Controls", {
            fontFamily: "Pixel",
            fontSize: "32px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Controls content
        const controls = [
            { action: "Move Left", key: "©" },
            { action: "Move Right", key: "¨" },
            
        ];

        controls.forEach((control, index) => {
            this.add.text(512, 150 + index * 40, `${control.action}: ${control.key}`, {
                fontFamily: "Pixel",
                fontSize: "20px",
                color: "#ffffff",
            }).setOrigin(0.5);
        });

        // Return instruction
        this.add.text(512, 150 + controls.length * 40 + 20, "Press Enter to return", {
            fontFamily: "Pixel",
            fontSize: "20px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Input to return
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.stop("Controls");
            this.scene.start("MainMenu");
        });
    }
}
