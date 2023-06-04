class End extends Phaser.Scene{
    constructor(){
        super({key: 'endScene'})
    }
    create(){
        this.add.text(20, 20, "End Scene");
    }
}