class play01 extends Phaser.Scene{
    constructor(){
        super({key: 'play01Scene'})
    }
    create(){

        //variables
        
        this.textBox = false;
        console.log("At Play01");

        //KeyInput Codes
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.zLastClicked = 0;

        //map
        const map = this.add.tilemap('scene1Json');
        const tileset01 = map.addTilesetImage('house_inside', 'tilesetHouseImage');
        const bgLayer = map.createLayer('Background', tileset01);
        const wallsLayer = map.createLayer('Wall', tileset01);
        const furnitureLayer = map.createLayer('Furnitures',tileset01);
        wallsLayer.setCollisionByProperty({ collides: true });
        furnitureLayer.setCollisionByProperty({collides: true});

        //temp character
        this.tempChar = this.physics.add.sprite(centerX, centerY, 'bSquare');
        this.tempChar.body.setCollideWorldBounds(true);
        this.vel = 100;

        //collison code
        this.physics.add.collider(this.tempChar, wallsLayer);
        this.physics.add.collider(this.tempChar, furnitureLayer);
    }
    update(time,delta){
        this.direction  = new Phaser.Math.Vector2(0);
        if(keyZ.isDown && time>this.zLastClicked){
            console.log("Z was clicked");
            this.zLastClicked = time + 500;
        }
        if(this.textBox==false){
            if(keyLEFT.isDown){
                this.direction.x = -5;
            }else if(keyRIGHT.isDown){
                this.direction.x = 5;
            }
            if(keyUP.isDown){
                this.direction.y = -5;
            }else if(keyDOWN.isDown){
                this.direction.y = 5;
            }
            this.direction.normalize();
            this.tempChar.setVelocity(this.vel * this.direction.x, this.vel * this.direction.y);
            
        }
    }
}