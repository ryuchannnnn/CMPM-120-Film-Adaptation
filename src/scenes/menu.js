class Menu extends Phaser.Scene{
    constructor(){
        super({key: 'menuScene'})
    }

    create(){
        this.add.tileSprite(0,0,480,480,'menuBackground').setOrigin(0,0);
        console.log("At Menu");
        // let test = this.add.rectangle(centerX, centerY, 30, 30, 0xff0000);
        // let test1 = this.add.rectangle(centerX-50, centerY, 40, 40, 0xff0000);
        // let test2 = this.add.rectangle(centerX+50, centerY, 20, 20, 0xff0000);
        // key control used to navigate through the menu
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.pLastClicked = 0;
    }

    update(time,delta)
    {
        // goes to play screen
        if(keyP.isDown)
        {
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('play01Scene');
        }
        else if(keyZ.isDown) // goes to the rules of the game 
        {
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('rulesScene');

        }
        else if(keyX.isDown) // goes to the credits in the game
        {
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('creditsScene');
        }
    }
}