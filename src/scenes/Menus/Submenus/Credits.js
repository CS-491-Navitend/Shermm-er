import { Scene } from "phaser";


export class Credits extends Scene {
    constructor() {
        super("Credits");
        this.isBackButtonHighlighted = false;
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
            "Project Manager",
            
            "Steve Curran",
            " ",
            "UI/UX",
            
            "Colin Chik",
            " ",
            "Art and Assets",
            
            "Steve Curran",
            "Sean Ruddiman",
            " ",
            "Game Logic Design",
            
            "Steve Curran",
            "Mike Luland",
            "Johhny Mayo",
            " ",
            "Sound Design",
            
            "Johhny Mayo",
            " ",
            "Special Thanks",
            
            "Frank Ableson",
            "Vin Nordfords",
            "Julian",
            "John Leanord",
        ];

        credits.forEach((line, index) => {
            this.add.text(512, 150 + index * 30, line, {
                fontFamily: "Pixel",
                fontSize: "20px",
                color: "#ffffff",
            }).setOrigin(0.5);
        });

        // Input to return
        this.createBackButton();

        this.input.keyboard.on('keydown-DOWN', () => {
            this.highlightBackButton(true);
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.isBackButtonHighlighted) {
                this.scene.stop("Credits");
                this.scene.start("MainMenu");// Go back to the main menu
            }
        });
    }
    // creating back button
    createBackButton() {
         this.backButton = this.add.text(
            200, 900, "Back", {
            fontFamily: "Pixel",
            fontSize: "20px",
            color: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#3388FF",
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        this.backButton.on("pointerdown", () => {
            this.scene.stop("Credits");
            this.scene.start("MainMenu");// Go back to the main menu
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