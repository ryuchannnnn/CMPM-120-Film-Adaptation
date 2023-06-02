class Menu extends Phaser.Scene{
    constructor(){
        super({key: 'menuScene'})
    }
    create(){
        console.log("At Menu");
        this.add.text(20, 20, "Menu Screen");
        let test = this.add.rectangle(centerX, centerY, 30, 30, 0xff0000);
        let test1 = this.add.rectangle(centerX-50, centerY, 40, 40, 0xff0000);
        let test2 = this.add.rectangle(centerX+50, centerY, 20, 20, 0xff0000);
    }
}