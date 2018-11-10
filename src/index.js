import Game from './game';
import Player from './player';

// Create the game
var game = new Game(512, 512);

// Create the player and add it to the game
game.addEntity(new Player(256, 256, 0, false, 512, 512));

// Start the main game loop
game.loop();
