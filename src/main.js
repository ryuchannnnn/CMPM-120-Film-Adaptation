let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 720,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
            arcade:{
                debug: true
            }
    },
    zoom: 1,
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