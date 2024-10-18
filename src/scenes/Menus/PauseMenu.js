import { Scene } from "phaser";



class PauseMenu extends Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    create() { 
        //creates the background of the menu
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5).setOrigin(0.5);

        //Adds text that say 'Paused'
        this.add.text(400, 200, 'Paused', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        
        const resumeButton = this.add.text(400, 300, 'Resume', { fontSize: '24px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();


        const quitButton = this.add.text(400, 400, 'Quit', { fontSize: '24px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

        resumeButton.on('pointerdown', () => {
            this.scene.resume("Game"); // Resume the game scene
            this.scene.stop(); // Stop this pause scene
        });

        quitButton.on('pointerdown', () => {
            this.scene.start("MainMenu"); 
        });
    }
}
export default PauseMenu;