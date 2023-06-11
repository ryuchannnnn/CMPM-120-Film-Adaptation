class Credits extends Phaser.Scene{
    constructor(){
        super({key: 'creditsScene'})
    }
    create(){
        this.add.text(20, 20, "Credits Scene");
        this.add.text()


        this.add.text(20, 40, "Press Space to go back to menu");
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update(){
        if(keySPACE.isDown){
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('menuScene');
        }
    }
}