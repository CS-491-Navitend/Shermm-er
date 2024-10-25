import { Scene } from "phaser";
import { Timer } from "/src/lib/Timer";
import { Game } from "/src/scenes/Game";
import { MainMenu } from "./MainMenu";

export class PauseMenu extends Scene {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.pauseMenu = null;
    this.isActive = false;
  }

  create() {
    //create the menu
    this.pauseMenu = this.scene.add.container(this.scene.width / 2, this.scene.height / 2);
    this.pauseMenu.setDepth(10);

    //create the background color
    const background = this.scene.add.graphics();
    background.fillStyle(0x000000, 0.8); // Semi-transparent background
    background.fillRect(-200, -150, 400, 300);
    this.pauseMenu.add(background);

    //border around the menu
    const border = this.scene.add.graphics();
    // Width, color, alpha
    border.lineStyle(2, 0xffffff, 1);
    // x, y, width, height
    border.strokeRect(-200, -150, 400, 300);
    this.pauseMenu.add(border);

    //Paused text
    const text = this.scene.add
      .text(0, -100, "Paused", {
        fontSize: "40px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    this.pauseMenu.add(text);

    //Create resume button
    this.createResumeButton();

    //create main menu button
    this.createMainMenuButton();

    //Hide menu
    this.pauseMenu.setVisible(false);
  }

  createResumeButton() {
    const resumeButton = this.scene.add
      .text(0, 70, "Resume", {
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setOrigin(0.5)
      .setInteractive();

    resumeButton.on("pointerover", () => {
      resumeButton.setStyle({ fill: "#ff0" }); // Change color on hover
    });

    resumeButton.on("pointerout", () => {
      resumeButton.setStyle({ fill: "#ffffff" }); // Reset color
    });

    resumeButton.on("pointerdown", () => {
      this.hide();
    });

    // Add border around the resume button
    this.addButtonBorder(resumeButton);
    this.pauseMenu.add(resumeButton);
  }

  createMainMenuButton() {
    const mainMenuButton = this.scene.add
      .text(0, -20, "Main Menu", {
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setOrigin(0.5)
      .setInteractive();

    mainMenuButton.on("pointerover", () => {
      mainMenuButton.setStyle({ fill: "#ff0" }); // Change color on hover
    });
    mainMenuButton.on("pointerout", () => {
      mainMenuButton.setStyle({ fill: "#ffffff" }); // Reset color
    });

    mainMenuButton.on("pointerdown", () => {
      //if(!this.scene.paused) return; //Prevent action if not paused
      this.scene.scene.stop("Game");
      this.scene.scene.start("MainMenu");
      console.log("starting MainMenu");
    });

    this.addButtonBorder(mainMenuButton);
    this.pauseMenu.add(mainMenuButton);
  }
  addButtonBorder(button) {
    const border = this.scene.add.graphics();
    border.lineStyle(2, 0xffffff, 1);
    border.strokeRect(button.x - button.width / 2 - 10, button.y - button.height / 2 - 10, button.width + 20, button.height + 20);
    this.pauseMenu.add(border);
  }

  show() {
    // Pause the Game
    if (this.isActive) return;
    this.isActive = true;
    this.pauseMenu.setVisible(true);
    this.scene.physics.pause();
    // this.scene.timer.pause();
    this.scene.paused = true;

    // this.scene.input.enabled = false;
  }

  hide() {
    // Resume the Game
    if (!this.isActive) return;
    this.isActive = false;
    this.pauseMenu.setVisible(false);
    this.scene.physics.resume(); // Resume the physics
    // this.scene.timer.resume();
    this.scene.paused = false;
    //this.scene.input.enabled = true;
  }

  reset() {
    this.isActive = false;
    this.pauseMenu.setVisible(false);
  }

  destroy() {
    if (this.pauseMenu) {
      this.pauseMenu.destroy();
      this.pauseMenu = null;
    }
  }
}
