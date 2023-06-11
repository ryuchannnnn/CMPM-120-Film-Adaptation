class Credits extends Phaser.Scene{
    constructor(){
        super({key: 'creditsScene'})
    }
    create()
    {
        this.add.tileSprite(0,0,480,480,'creditBackground').setOrigin(0,0);

        this.add.text(0,100, "Room assets: https://opengameart.org/\ncontent/lpc-house-insides");
        this.add.text(0,140, "Grave assets: https://opengameart.org/\ncontent/lpc-grave-markers-remix");
        this.add.text(0,180, "Outdoor assets: https://opengameart.org/\ncontent/16x16-overworld-tiles");
        this.add.text(0,220, "Dad sprite: https://www.deviantart.com/\nmaicerochico/art/Platinum-Looker-Overworld-\nSprites-Ripped-651961803 (recolored by Danny)");
        this.add.text(0,270, "Son sprite: https://www.deviantart.com/\nteraneck/art/Youngster-BW-gen3-856433474 \n(recolored by Danny)");
        this.add.text(0,320, "Daughter sprite: https://www.deviantart.com/\nteraneck/art/Cassidy-856436695 \n(recolored by Danny)");
        this.add.text(0,370, "button sound: https://opengameart.org/content/\nbotton-sound-pack");
        this.add.text(0,410, "mother and gradnma sprites were drawn by Danny");
        this.add.text(0,450, "Press Space to go back to menu");
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update(){
        if(keySPACE.isDown){
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('menuScene');
        }
    }
}