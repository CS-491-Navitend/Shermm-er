import { Scene } from "phaser";
export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
        this.fontFamily = "sans-serif";
        this.rem = 16;
        this.buttons = [];
        this.selectedButtonIndex = 0; // Tracks the selected button
        this.isActive = false;
        this.isMuted = false;
    }


    create(buttons) {
        this.selectedButtonIndex = 0; 
        //background
        this.add.image(512, 384, "background").setOrigin(0.5, 0.5);
        this.backgroundMusic = this.sound.add("backgroundMusic", {
            volume: 0.25,
            loop: true,
        });
        //console.log("Data received: ", buttons);
        this.isActive = true;
        this.destroyButtons();
        // console.log("Data received: ", buttons);


        //console.log(this.buttons);
        // Main menu text
        this.add
            .text(512, 200, "Shermm-er", {
                fontFamily: 'Pixel',
                fontStyle: "bold",
                fontSize: this.rem * 4 + "px",
                color: "#FFFFFF", // White text
                stroke: "#000000", // Black outline
                strokeThickness: 6,
            })
            .setOrigin(0.5);



        // Create buttons
        const playButton = this.createButton(512, 330, 'Play', 0);
        const levelSelectButton = this.createButton(512, 440, "Level Select", 1);
        const controlsButton = this.createButton(512, 550, "Controls", 2);
        const creditsButton = this.createButton(512, 660, "Credits", 3); 
        const statsButton = this.createButton(512, 770, "Stats", 4);

        this.createMuteButton(950, 50);

        this.buttons.push(playButton, levelSelectButton, controlsButton, creditsButton, statsButton);
        //console.log("Current buttons array after creation: ", this.buttons);

        // Keyboard inputs

        this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
        this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
        this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());

        //console.log(this.buttons);
        this.highlightButton(this.selectedButtonIndex);
    }
    createMuteButton(x, y) {
        const muteButtonText = this.add.text(x, y, 'Mute', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#444444',
            padding: { x: 10, y: 5 },
            align: 'center'
        }).setOrigin(0.5);

        muteButtonText.setInteractive({ useHandCursor: true });

        muteButtonText.on("pointerdown", () => this.toggleMute());

        // Set initial text to "Mute" or "Unmute" based on the mute state
        if (this.isMuted) {
            muteButtonText.setText('Unmute');
        } else {
            muteButtonText.setText('Mute');
        }

        /*
        const muteButtonImage = this.add.image(x, y, "muteButton").setOrign(0.5).setScale(0.5);
        muteButtonImage.setInteractive({ userHandCursor: true });

        muteButtonImage.on("pointerdown", () => this.toggleMute());
        */
        /*
        if (this.isMuted) {
            muteButtonImage.setFrame(1); // Mute icon
        } else {
            muteButtonImage.setFrame(0); // Unmute icon
        }
        */
    }
    toggleMute() {
        this.isMuted = !this.isMuted;

        this.sys.game.registry.set("isMuted", this.isMuted);

        if (this.isMuted) {
            this.sound.mute = true;

        } else {
            this.sound.mute = false;
        }

        const muteButtonText = this.children.getAt(this.children.length - 1);
        muteButtonText.setText(this.isMuted ? 1 : 0);
    }

    createButton(x, y, text, mainButtonIndex) {
        const buttonImage = this.add.image(x, y, "buttonImage").setOrigin(0.5);

        buttonImage.setScale(1);

        const buttonText = this.add
            .text(x, y, text, {
                fontFamily: 'Pixel',
                fontStyle: "bold",
                fontSize: this.rem * 1.8 + "px",
                //padding: { x: 100, y: 20 },
                //backgroundColor: "#3388FF",
            })
            .setOrigin(0.5)
            
        //console.log("Creating Button: ", text);

        //buttons length for main menu

        buttonImage.setInteractive({ useHandCursor: true });

        buttonImage.on("pointerover", () => {
            this.selectedButtonIndex = mainButtonIndex; // Update the selected index on hover
            this.highlightButton(this.selectedButtonIndex);
        });

        buttonImage.on("pointerout", () => {
            this.highlightButton(this.selectedButtonIndex);
        });

        buttonImage.on("pointerdown", () => {
            this.confirmSelection();
        });

        return { buttonImage, buttonText };
    }

    changeSelection(direction) {
        // Highlight the selected button
        this.highlightButton(this.selectedButtonIndex, false);

        // Update the selected button index
        this.selectedButtonIndex += direction;

        // Wrap around if needed
        if (this.selectedButtonIndex < 0) {
            this.selectedButtonIndex = this.buttons.length - 1;
        } else if (this.selectedButtonIndex >= this.buttons.length) {
            this.selectedButtonIndex = 0;
        }

        // Highlight the new selection
        this.highlightButton(this.selectedButtonIndex);
    }

    highlightButton(index) {
        this.buttons.forEach((buttonobj, i) => {
            const highlight = i === index;
            const buttonImage = buttonobj.buttonImage;
            const buttonText = buttonobj.buttonText;

            if (buttonImage) {
                buttonImage.setTint(highlight ? 0x44AAFF : 0xFFFFFF);
            }

            if (buttonText) {
                buttonText.setStyle({
                    color: highlight ? "#000000" : "#FFFFFF",  // Change text color
                    stroke: highlight ? "#FFFFFF" : "#000000",  // Change stroke color
                    strokeThickness: highlight ? 6 : 4,        // Change stroke thickness
                });
            }
        });
    }

    confirmSelection() {

        const selectedButton = this.buttons[this.selectedButtonIndex];
        // console.log('selected Button', this.selectedButtonIndex);
        if (selectedButton === this.buttons[0]) {
            this.backgroundMusic.play();
            this.scene.start("TutorialMenu", { level: 1 });
            //console.log("Starting level 1");
        } else if (selectedButton === this.buttons[1]) {
            this.scene.start("LevelMenu");
            //console.log("Starting level menu");
        } else if (selectedButton == this.buttons[3]) {
            this.scene.start("Credits");
        } else if (selectedButton == this.buttons[2]) {
            this.scene.start("Controls");
        } else if (selectedButton == this.buttons[4]) {
            this.scene.start("Stats");
        }
    }
    destroyButtons() {
        if (this.buttons.length > 0) {
            //console.log("Destorying Buttons...")
            this.buttons.forEach(button => {
                button.buttonImage.off("pointerdown");
                button.buttonImage.off("pointerover");
                button.buttonImage.off("pointerout");
                button.buttonImage.destroy();
                button.buttonText.destroy();
                // console.log("Button destroyed: ", button.buttonText.text);
            });
            this.buttons = [];
            this.input.keyboard.removeAllListeners();
        }
        
        
    }
}

