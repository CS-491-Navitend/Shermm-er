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
            "Johnny Mayo",
            " ",
            "Sound Design",
            
            "Johnny Mayo",
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
            if (this.isBackButtonHighlighted = true) {
                this.scene.stop("Credits");
                this.scene.start("MainMenu");// Go back to the main menu
            }
        });
    }
    // creating back button
    createBackButton() {

        const backButtonImage = this.add
            .image(200, 900, "buttonImage")
            .setOrigin(0.5)
            .setInteractive({ userHandCursor: true });

         const backText = this.add.text(
            200, 900, "Back", {
            fontFamily: "Pixel",
            fontSize: "20px",
            color: "#ffffff",
           // padding: { x: 20, y: 10 },
            //backgroundColor: "#3388FF",
        })
            .setOrigin(0.5)

        backButtonImage.setDisplaySize(250, 80);

        backButtonImage.on("pointerdown", () => {
            this.scene.stop("Credits");
            this.scene.start("MainMenu");// Go back to the main menu
        });

        backButtonImage.on("pointerover", () => {
            this.highlightBackButton(true);
        });

        backButtonImage.on("pointerout", () => {
            this.highlightBackButton(false);
        });

        this.buttons = this.buttons || [];
        this.buttons.push({ image: backButtonImage, text: backText });
    }
    highlightBackButton(isHighlighting) {
        const backButton = this.buttons[this.buttons.length - 1]; // Get the last button (Back button)

        // Set button image tint color for highlighting
        backButton.image.setTint(isHighlighting ? 0x44AAFF : 0xFFFFFF); 

        // Update text style based on highlight state
        const highlight = isHighlighting;

        // Change text style (color, stroke, stroke thickness)
        if (backButton.text) {
            backButton.text.setStyle({
                color: highlight ? "#000000" : "#FFFFFF",  
                stroke: highlight ? "#FFFFFF" : "#000000",  
                strokeThickness: highlight ? 6 : 4,        
            });
        }
    }
}