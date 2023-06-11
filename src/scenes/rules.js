class Rules extends Phaser.Scene{
    constructor(){
        super({key: 'rulesScene'})
    }
    create(){
        this.add.tileSprite(0,0,480,480, 'theRules').setOrigin(0,0);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if(keySPACE.isDown){
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('menuScene');
        }
    }
}