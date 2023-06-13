/**********************************************************************************************
 * Name: William Chen and Danny Chen
 * Major Components Used:
 * Physics System
 * Text Objects
 * The Animation Mangager
 * Tilemaps
 * Timers
 * 
 * Features:
 * You might notice that our game has no camera movement, as well as minamal instructions and sound effects in our game.
 * This was our creative way on adapating the style of filming of this movie. This movie primarly films in static camera,
 * meaning the camera is not moved at all. No shakes or cuts. And where there is movement with the camera, it's the emphasis 
 * the impact of the current scene. The movie also has a lot of scenes of where a character in the movie will either just be standing
 * around or walking around in place without saying a word. We adapted this aspects of these types of scene by giving players the ability
 * to roam around the area they're currently at until they complete the action of the scenes. As for the no sounds, the only sound effect in
 * this game is when you continue through the dialouge box or when you do certain actions in the game.
 * 
 * 
 * 
 * 
 * 
 * 
 */

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 480,
    height: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
            arcade:{
                debug: false
            }
    },
    zoom: 1,
    scene: [Load,Menu,play01,play02,play03,Credits,End,Rules]
}

const game = new Phaser.Game(config)

//size variables, used for functions that are require size variables
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
//keyboard Input variables
let keyLEFT, keyRIGHT, keyDOWN, keyUP, keySHIFT, keyP, keyZ, keyX, keySPACE;