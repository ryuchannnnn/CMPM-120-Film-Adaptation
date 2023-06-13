class play02 extends Phaser.Scene{
    constructor(){
        super({key: 'play02Scene'})
    }

    preload(){
        //Daughter Animation, animations will be played depending on what keys are clicked (ie: up will play the her walking up)
        
        // sprite is moving downward
        this.anims.create({

            key: "downDaughter", // you'll need this key when you need to play an animation
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {
                frames: ["daughterSprite00", "daughterSprite01", "daughterSprite02", "daughterSprite03"] //names are from the json files
            })
        })
        // sprite is moving up 
        this.anims.create({

            key: "upDaughter",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {
                frames: ["daughterSprite12", "daughterSprite13", "daughterSprite14", "daughterSprite15"]
            })
        })
        // sprite is moving to the right
        this.anims.create({

            key: "rightDaughter",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {
                frames: ["daughterSprite08", "daughterSprite09", "daughterSprite10", "daughterSprite11"]
            })
        })
         // sprite is moving to the left 
        this.anims.create({

            key: "leftDaughter",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {

                frames: ["daughterSprite04", "daughterSprite05", "daughterSprite06", "daughterSprite07"]
            })
        })
    }


    create(){
        //text boxes for our hint text
        let textConfig = {
            fontFamily: 'Copperplate',
            fontSize: '28px',
            backgroundColor: '#cc0000',
            color: '#ffff00',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
           }
        
        
        this.textBox = false; //If the textbox should be on the screen, this var should be true
        console.log("At Play02");

        //array list, contains the dialouge that is being shown on the screen

        this.dialougeScript = 
        [
            "I thought it was the nurse in here, \nbut it seems you are awake.",
            "I was at the police station. I cannot face going\nback to school.",
            "I haven't slept in so long.\nI'm so tired grandma. \nBut now... you've forgiven me, I can sleep.",
            "Grandma.. Why is the world so different \nfrom what we thought it was?",
            "Now that you're awake and see it again...\nHas it changed at all?",
            "Now... I close my eyes.. the world \nI see... is so beautiful"
        ];
        this.currentDialouge = 0; // counter for which dialogue to show
        this.speakerOption = "Ting Ting (daughter)"; // counter for clicks, to prevent speeding through text
        

        //KeyInput Codes
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.zLastClicked = 0; // counter for clicks

        //creating tile map code
        const map = this.add.tilemap('scne2Json');
        const tileset01 = map.addTilesetImage('house_inside', 'tilesetHouseImage');
        const bgLayer = map.createLayer('Background', tileset01);
        const wallsLayer = map.createLayer('Wall', tileset01);
        const furnitureLayer = map.createLayer('Furnitures',tileset01);
        wallsLayer.setCollisionByProperty({ collides: true });
        furnitureLayer.setCollisionByProperty({collides: true});


        //daughter sprite
        const daughterSpawn = map.findObject('Spawn', obj => obj.name === 'daugtherSpawn');
        this.daughter = this.physics.add.sprite(daughterSpawn.x, daughterSpawn.y, 'daughter', 'daughterSprite00');
        this.daughter.body.setCollideWorldBounds(true);
        this.vel = 100;

        //grandma sprite
        const grandmaSpawn = map.findObject('Spawn', obj => obj.name === 'grandmaSpawn');
        this.grandma = this.physics.add.sprite(grandmaSpawn.x, grandmaSpawn.y, 'gradmaDream');
        this.grandma.body.setImmovable();

        //collison code with objects, sprites, and tilemap
        this.physics.add.collider(this.daughter, wallsLayer);
        this.physics.add.collider(this.daughter, furnitureLayer);
        this.physics.add.collider(this.daughter, this.grandma);

        //textbox (set to visibility false until player reaches a spot on the floor)
        this.dialougeBox = this.add.rectangle(0, borderUISize - borderPadding+350, w, borderUISize*3, 0x9c0d03).setOrigin(0,0);
        this.dialougeBox.visible = false;
        
        this.dialouge = this.add.text(10, borderUISize - borderPadding + 380, this.dialougeScript[this.currentDialouge]);
        this.speaker = this.add.text(10, borderUISize - borderPadding + 360, this.speakerOption);

        this.speaker.visible = false;        
        this.dialouge.visible = false;


        //hint text, displays hint when 10 seconds have passed
        this.hint = this.add.text(centerX,30, "Talk to Grandma", textConfig).setOrigin(0.5);
        this.hint.visible = false;
        this.clock = this.time.delayedCall(10000, ()=> {
            if(this.textBox==false){
                this.hint.visible = true;
            }
        })



    }
    update(time,delta){
        this.direction = new Phaser.Math.Vector2(0);
        //If the textBox is false, it'll allow the players to move around
        if(this.textBox==false){
            if(keyLEFT.isDown){
                this.daughter.play("leftDaughter", true); //play animation key for hiting left
                this.direction.x = -5;
            }else if(keyRIGHT.isDown){
                this.direction.x = 5;
                this.daughter.play("rightDaughter", true); //play animation key for hitting right
            }
            if(keyUP.isDown){
                this.daughter.play("upDaughter", true); // play animation key for hitting up
                this.direction.y = -5;
            }else if(keyDOWN.isDown){
                this.daughter.play("downDaughter", true); // play animation key for hitting down
                this.direction.y = 5;
            }
            this.direction.normalize();
            this.daughter.setVelocity(this.vel * this.direction.x, this.vel * this.direction.y);     
            if(this.daughter.x==370 && (270<=this.daughter.y) && (this.daughter.y <=274)){ 
                this.sound.play('beap', { volume: 0.5 });
                console.log("On Carpet");
                this.daughter.setFrame("daughterSprite12");
                this.textBox=true; //When players are on the location to trigger dialouge box, it'll set this.textBox to true
            }   
        }else if(this.textBox==true){ //If the textBox is true, it'll stop the players from moving and the dialouge will play out
            this.dialougeBox.visible = true;
            this.dialouge.visible = true;
            this.speaker.visible = true;
            if(keyZ.isDown && time>this.zLastClicked){ //Checks to see if it has been 1 second since Z was last clicked
                this.sound.play('beap', { volume: 0.5 });
                console.log("Z was clicked");
                this.zLastClicked = time + 1000;
                this.currentDialouge +=1;
                if(this.currentDialouge<this.dialougeScript.length){ //checks that we don't go beyond the dialouge array
                    this.dialouge.text = this.dialougeScript[this.currentDialouge]; //changes the text in the text box
                }
            }
            // go to next scene once the dialouge if finished
            if(this.currentDialouge>=this.dialougeScript.length){
                this.scene.start('play03Scene');
            }
        }

        
    }
}