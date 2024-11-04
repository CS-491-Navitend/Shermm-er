import { Scene } from "phaser";


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

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.stop("Credits");
            this.scene.start("MainMenu");
        });
    }
    // creating back button
    createBackButton() {
        const backButton = this.add.text(
            200, 900, "Back", {
            fontFamily: "Pixel",
            fontSize: "20px",
            color: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#3388FF",
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        backButton.on("pointerdown", () => {
            this.scene.stop("Credits")
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