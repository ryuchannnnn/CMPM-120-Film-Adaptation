class Load extends Phaser.Scene{
    constructor(){
        super('loadscene');
    }

    preload(){
        
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        //

        this.load.path = './assets/';
        console.log('assets path has been set');
        //playScene 1 assets
        this.load.image('tilesetHouseImage', 'house_inside.png');
        this.load.tilemapTiledJSON('scene1Json', 'tileMap/scene1TileMap.json');
        //playScene 2 assets

        //playScene 3 assets

        //temp character assets
        this.load.image('bSquare', 'temp/l0_sprite_square12.png' );

        //father character assets
        this.load.atlas('father', 'characterSprite/dadSpriteImages/dadSpritesheet.png', 'characterSprite/dadSpriteImages/dadSpritesheetJSON.json');

        this.load.image('grandmaBed', 'characterSprite/grandmainBed.png');




        console.log('assets have finished loading');

    }
    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
        // this.scene.start('play01Scene');
    }
}

