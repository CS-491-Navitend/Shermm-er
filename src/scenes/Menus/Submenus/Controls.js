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

        this.add.image(300,500, "car1").setOrigin(0.5, 0.5);
        this.add.image(200,500, "car2").setOrigin(0.5, 0.5);
        this.add.image(300,600, "desertBuggy1").setOrigin(0.5, 0.5);
        this.add.image(200,600, "desertBuggy2").setOrigin(0.5, 0.5);

        this.add.image(500,500, "waterObjective").setOrigin(0.5, 0.5);
        this.add.image(520,500, "shermie").setOrigin(0.5, 0.5);
        
        this.add.image(750,490, "lavaLog").setOrigin(0.5, 0.5);
        this.add.image(750,540, "iceLog").setOrigin(0.5, 0.5);
        this.add.image(750,570, "LongLog").setOrigin(0.5, 0.5);
        this.add.image(750,610, "cherry").setOrigin(0.5, 0.5);


        this.add.text(
            250, 700, "Avoid", {
            fontFamily: "Pixel",
            fontSize: "30px",
            color: "#ffffff",
           // padding: { x: 20, y: 10 },
           // backgroundColor: "#3388FF",
        }).setOrigin(0.5)

        this.add.text(
            500, 600, "Goal", {
            fontFamily: "Pixel",
            fontSize: "30px",
            color: "#ffffff",
           // padding: { x: 20, y: 10 },
           // backgroundColor: "#3388FF",
        }).setOrigin(0.5)

        this.add.text(
            750, 700, "Safe", {
            fontFamily: "Pixel",
            fontSize: "30px",
            color: "#ffffff",
           // padding: { x: 20, y: 10 },
           // backgroundColor: "#3388FF",
        }).setOrigin(0.5)


        const graphicsAvoid = this.add.graphics();
        graphicsAvoid.lineStyle(4, 0xFF0000, 1);
        graphicsAvoid.strokeRect(130, 465, 240, 175);

        const graphicsGoal = this.add.graphics();
        graphicsGoal.lineStyle(4, 0xFFD700, 1);  // Gold color (hex: 0xFFD700), 4px thickness
        graphicsGoal.strokeRect(450, 450, 110, 100);

        const graphicsSafe = this.add.graphics();
        graphicsSafe.lineStyle(4, 0x00FF00, 1);  // Green color (hex: 0x00FF00), 4px thickness
        graphicsSafe.strokeRect(640, 465, 220, 170); 

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
        const backButtonImage = this.add
            .image(512, 900, "buttonImage")  // Position it at (512, 400)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        
        backButtonImage.setDisplaySize(250, 80);

        const backText = this.add.text(
            512, 900, "Back", {
            fontFamily: "Pixel",
            fontSize: "30px",
            color: "#ffffff",
           // padding: { x: 20, y: 10 },
           // backgroundColor: "#3388FF",
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        backText.on("pointerdown", () => {
            this.scene.stop("Controls");
            this.scene.start("MainMenu"); 
        });

        backText.on("pointerover", () => {
            this.highlightBackButton(true);
        });

        backText.on("pointerout", () => {
            this.highlightBackButton(false);
        });

        this.buttons = this.buttons || [];
        this.buttons.push({ image: backButtonImage, text: backText });
    }
    highlightBackButton(isHighlighting) {
        const backButton = this.buttons[this.buttons.length - 1]; // Get the last button (back button)

        // Set the button image tint color for highlighting
        backButton.image.setTint(isHighlighting ? 0x44AAFF : 0xFFFFFF); // Highlight in blue (0x44AAFF) or default white (0xFFFFFF)

        const highlight = isHighlighting;

        if (backButton.text) {
            backButton.text.setStyle({
                color: highlight ? "#000000" : "#FFFFFF",  // Change text color
                stroke: highlight ? "#FFFFFF" : "#000000",  // Change stroke color
                strokeThickness: highlight ? 6 : 4,        // Change stroke thickness
            });
        }

        // Update the highlight state
        this.isBackButtonHighlighted = isHighlighting;
    }
}
