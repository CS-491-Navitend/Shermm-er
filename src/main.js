
import { Boot } from "./scenes/Boot";
// menus
import { MainMenu } from "./scenes/Menus/MainMenu";
import { LevelMenu } from "./scenes/Menus/LevelMenu";
import { PauseMenu } from "./scenes/Menus/PauseMenu";
//submenus
import { Credits } from "./scenes/Menus/Submenus/Credits";
import { Controls } from "./scenes/Menus/Submenus/Controls"
// game
import { Game as MainGame } from "./scenes/Game";
import { AUTO, Scale, Game } from "phaser";
import { GameOver } from "./scenes/GameOver";
import { GameWin } from "./scenes/GameWin";

const config = {
  type: AUTO,
  width: 1000,
  height: 1000,
  parent: "game-container",
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      debug: false, //handy to show collision
    },
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_HORIZONTALLY,
  },

  scene: [Boot, MainMenu, LevelMenu, MainGame, PauseMenu, GameOver, GameWin, Credits, Controls],
  parent: 'phaser-game',

};

export default new Game(config);
