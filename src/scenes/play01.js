class play01 extends Phaser.Scene{
    constructor(){
        super({key: 'play01Scene'})
    }

    preload(){
        //Father Animation
        this.anims.create({

            key: "down", //you'll need this key when you need to play an animation
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('father', {
                frames: ["dadSprite00", "dadSprite01", "dadSprite02", "dadSprite03"] //names are from the json files
            })
        })
        this.anims.create({

            key: "up",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('father', {
                frames: ["dadSprite012", "dadSprite013", "dadSprite014", "dadSprite015"]
            })
        })
        this.anims.create({

            key: "right",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('father', {
                frames: ["dadSprite08", "dadSprite09", "dadSprite010", "dadSprite011"]
            })
        })

        this.anims.create({

            key: "left",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('father', {

                frames: ["dadSprite04", "dadSprite05", "dadSprite06", "dadSprite07"]
            })
        })
    }


    create(){
        //text boxes
        let textConfig = {
            fontFamily: 'Copperplate',
            fontSize: '28px',
            backgroundColor: '#DE3163',
            color: '#ffff00',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
           }
        //variables
        
        this.textBox = false;
        console.log("At Play01");

        //array list

        //max five lines in a box, copy this for each index => "1\n2\n3\n4\n5"
        this.dialougeScript = 
        ["Seems I am the only one left to keep you company. When Min Min was home,\nI thought… she'd solve all the problems around here. But now… there's no\none to do it. And I really don't know when she will be back.\nIt's hard for me to mumble like this. I hope you won't be offended if I \nsay… It's like praying.", 
        "I'm not sure if the other party can hear me… and I'm not sure if I'm\nsincere enough.",
        "Frankly...\nThere's very little I'm sure about these days. I wake up feeling unsure\nabout almost everything, and I wonder why I wake up at all, just to face\nthe same uncertainties again and again.", 
        "...", 
        "Would you want to wake up if you were me?", 
        "Maybe Yang Yang is right. You lived so many more years. Other than these\nquestions we can't answer...",
        "what is there to tell you?", 
        "Anyhow I guess you don't blame Yang Yang for not talking to you,\nin many ways he takes after me.", 
        "Really."];
        this.currentDialouge = 0;
        this.speakerOption = ["NJ"];
        

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


        //father
        this.father = this.physics.add.sprite(centerX, centerY, 'father', 'dadSprite00');
        this.father.body.setCollideWorldBounds(true);
        this.vel = 100;

        //collison code
        this.physics.add.collider(this.father, wallsLayer);
        this.physics.add.collider(this.father, furnitureLayer);

        //text
        this.dialougeBox = this.add.rectangle(0, borderUISize - borderPadding+350, w, borderUISize*3, 0x9c0d03).setOrigin(0,0);
        //this.dialougeBox.visible = false;
        
        this.dialouge = this.add.text(12, borderUISize - borderPadding + 380, this.dialougeScript[this.currentDialouge]);
        this.speaker = this.add.text(12, borderUISize - borderPadding + 360, this.speakerOption[0]);

        this.speaker.visible = true;        
        this.dialouge.visible = true;
    }
    update(time,delta){
        this.direction = new Phaser.Math.Vector2(0);

        if(this.textBox==false){
            if(keyZ.isDown && time>this.zLastClicked){
                console.log("Z was clicked");
                this.zLastClicked = time + 500;
            }
            if(keyLEFT.isDown){
                this.father.play("left", true); //play animation key for hiting left
                this.direction.x = -5;
            }else if(keyRIGHT.isDown){
                this.direction.x = 5;
                this.father.play("right", true);
            }
            if(keyUP.isDown){
                this.father.play("up", true);
                this.direction.y = -5;
            }else if(keyDOWN.isDown){
                this.father.play("down", true);
                this.direction.y = 5;
                
            }
            this.direction.normalize();
            this.father.setVelocity(this.vel * this.direction.x, this.vel * this.direction.y);     
            if(this.father.x==362 && (264<=this.father.y<=268)){ //carpet X = 630 and Y = (362,374)
                console.log("On Carpet");
                //this.textBox=true;
            }
            console.log("coord at: ("+this.father.x+","+this.father.y+")");      
        }else if(this.textBox==true){
            this.dialougeBox.visible = true;
            this.dialouge.visible = true;
            this.speaker.visible = true;
            if(keyZ.isDown && time>this.zLastClicked){
                console.log("Z was clicked");
                this.zLastClicked = time + 500;
                this.currentDialouge +=1;
                if(this.currentDialouge<this.dialougeScript.length){
                    this.dialouge.text = this.dialougeScript[this.currentDialouge];
                }
            }
            if(this.currentDialouge>=this.dialougeScript.length){
                this.scene.start('endScene');
            }
        }

        
    }
}