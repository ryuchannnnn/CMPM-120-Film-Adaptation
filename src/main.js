let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    physics: {
        default: 'arcade',
            arcade:{
                debug: true
            }
    },
    zoom: 2,
    scene: [Load,Menu]
}

const game = new Phaser.Game(config)

//size variables
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;