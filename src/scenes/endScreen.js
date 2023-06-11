class End extends Phaser.Scene{
    constructor(){
        super({key: 'endScene'})
    }
    create(){
        this.add.tileSprite(0,0,480,480, 'theEnd').setOrigin(0,0);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if(keySPACE.isDown){
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('menuScene');
        }
    }
}