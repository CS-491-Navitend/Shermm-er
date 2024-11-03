import { Scene } from "phaser";


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
        this.createBackButton();

        
    }
    // creating back button
    createBackButton() {
        const backButton = this.add.text(
            512, 400, "Back", {
            fontFamily: "Pixel",
            fontSize: "20px",
            color: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#3388FF",
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        backButton.on("pointerdown", () => {
            this.scene.stop("Controls")
            this.scene.start("MainMenu"); // Call the return method on click
        });

        backButton.on("pointerover", () => {
            backButton.setStyle({ backgroundColor: "#44AAFF" });
        });

        backButton.on("pointerout", () => {
            backButton.setStyle({ backgroundColor: "#3388FF" });
        });
    }
}
