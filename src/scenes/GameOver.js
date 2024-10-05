import { Scene } from "phaser";

export class GameOver extends Scene {
    constructor() {
        super("GameOver");
    }

    init(data) {
        this.winCount = data.winCount || 0;
        this.resetCount = data.resetCount || 0;
    }

    preload() {
        
    }
    create(data) { 
   
        this.add.text(400, 250, "Game Over!", { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 300, `Wins: ${this.winCount-1}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 350, `Resets: ${this.resetCount-1}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 400, "Press R to restart", { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('Game');

        });
    }

}