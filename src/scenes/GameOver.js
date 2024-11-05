import { Scene } from "phaser";


export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create({ game }) {
    
    document.getElementById('ui-bar').style.display = 'none';
    const x = game.width / 2;
    const y = 250;

      this.add.text(x, y, "Game Over!", {
          fontFamily: "Pixel",
          fontSize: "32px",
          fill: "#fff"
      }).setOrigin(0.5);

      this.add.text(x, y + 50, `Wins: ${game.winCount}`, {
          fontFamily: "Pixel",
          fontSize: "32px",
          fill: "#fff"
      }).setOrigin(0.5);


      this.add.text(x, y + 100, `Resets: ${game.resetCount}`, {
          fontFamily: "Pixel",
          fontSize: "32px",
          fill: "#fff"
      }).setOrigin(0.5);

      this.add.text(game.width / 2, 450, "Press M for Main Menu", {
          fontFamily: "Pixel",
          fontSize: "32px",
          fill: "#fff"
      }).setOrigin(0.5);


      this.add.text(x, y + 150, "Press R to restart", {
          fontFamily: "Pixel",
          fontSize: "32px",
          fill: "#fff"
      }).setOrigin(0.5);

    this.input.keyboard.once("keydown-R", () => {
      console.log(game.inWater)
      game.inWater=false
      this.scene.start("Game", { level: game.level });
    });
    
    // Go to main menu on 'M' key press
    this.input.keyboard.on("keydown-M", () => {
      this.scene.start("MainMenu");
    });
  }
}
