import { Scene } from "phaser";


export class Controls extends Scene {
    constructor() {
        super("Controls");
        this.isBackButtonHighlighted = false;
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
            { action: "Move Up", key: "\u2191 (Up Arrow)" },    // Up Arrow
            { action: "Move Down", key: "\u2193 (Down Arrow)" }, // Down Arrow
            { action: "Move Left", key: "\u2190 (Left Arrow)" }, // Left Arrow
            { action: "Move Right", key: "\u2192 (Right Arrow)" }, // Right Arrow
            { action: "Confirm Selection", key: "ENTER"}
            
        ];

        controls.forEach((control, index) => {
            this.add.text(512, 150 + index * 40, `${control.action}: ${control.key}`, {
                fontFamily: "sans-serif",
                fontSize: "20px",
                color: "#ffffff",
            }).setOrigin(0.5);
        });

        // Return instruction
        this.createBackButton();

        this.input.keyboard.on('keydown-DOWN', () => {
            this.highlightBackButton(true); // Highlight back button
        });
        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.isBackButtonHighlighted) {
                this.scene.stop("Controls");
                this.scene.start("MainMenu"); 
            }
        });
        
    }
    // creating back button
    createBackButton() {
        this.backButton = this.add.text(
            512, 400, "Back", {
            fontFamily: "Pixel",
            fontSize: "20px",
            color: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#3388FF",
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        this.backButton.on("pointerdown", () => {
            this.scene.stop("Controls");
            this.scene.start("MainMenu"); 
        });

        this.backButton.on("pointerover", () => {
            this.highlightBackButton(true);
        });

        this.backButton.on("pointerout", () => {
            this.highlightBackButton(false);
        });
    }
    highlightBackButton(isHighlighting) {
        this.isBackButtonHighlighted = isHighlighting; // Update the highlight state
        this.backButton.setStyle({
            backgroundColor: isHighlighting ? "#44AAFF" : "#3388FF"
        });
    }
}
