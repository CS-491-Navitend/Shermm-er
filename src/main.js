
import { Boot } from "./scenes/Boot";
// menus
import { MainMenu } from "./scenes/Menus/MainMenu";
import { LevelMenu } from "./scenes/Menus/LevelMenu";
import { PauseMenu } from "./scenes/Menus/PauseMenu";
import { PauseMenu } from "./scenes/Menus/";
//submenus
import { Credits } from "./scenes/Menus/Submenus/Credits";
import { Controls } from "./scenes/Menus/Submenus/Controls"
import { Stats } from "./scenes/Menus/Submenus/Stats"
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
  audio: {
    disableWebAudio: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false, //handy to show collision
    },
  },
  scale: {
    mode: Scale.FIT,
  },

  scene: [Boot, MainMenu, LevelMenu, MainGame, PauseMenu, GameOver, GameWin, Credits, Controls, Stats, TutorialMenu],
  parent: 'phaser-game',

};

export default new Game(config);
