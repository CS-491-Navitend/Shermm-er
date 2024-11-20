export class Stats{
    constructor() {
        this.isBackButtonHighlighted = false;
    }

    create() {
        // Title
        this.add.text(512, 100, "Stats", {
            fontFamily: "Pixel",
            fontSize: "32px",
            color: "#ffffff",
        }).setOrigin(0.5);

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
            .image(512, 400, "buttonImage")  // Position it at (512, 400)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        backButtonImage.setDisplaySize(250, 80);

        const backText = this.add.text(
            512, 400, "Back", {
            fontFamily: "Pixel",
            fontSize: "30px",
            color: "#ffffff",
            // padding: { x: 20, y: 10 },
            // backgroundColor: "#3388FF",
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        backText.on("pointerdown", () => {
            this.scene.stop("Stats");
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