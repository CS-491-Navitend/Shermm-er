import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale, Game } from 'phaser';
import { GameOver } from './scenes/GameOver';

const config = {
    type: AUTO,
    width: 850,
    height: 780,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, //handy to show collision
        },
    },
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        MainGame, GameOver
    ]
};

export default new Game(config, config);
