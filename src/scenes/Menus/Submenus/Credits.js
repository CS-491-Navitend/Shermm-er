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
            "Game Development",
            " ",
            "Colin",
            "Steve",
            "Johnny",
            "Mike",
            "Sean",
            " ",
            "Art and Design",
            " ",
            "Sean",
            " ",
            "Sound Design",
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
        this.createBackButton();
    }
    // creating back button
    createBackButton() {
        const backButton = this.add.text(
            512, 700, "Back", {
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