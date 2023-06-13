class play03 extends Phaser.Scene{
    constructor(){
        super({key: 'play03Scene'})
    }

    preload(){
        //son Animation, animations will be played depending on what keys are clicked
        
        // sprite is moving downward
        this.anims.create({

            key: "downSon", //you'll need this key when you need to play an animation
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {
                frames: ["sonSprite00", "sonSprite01", "sonSprite02", "sonSprite03"] //names are from the json files
            })
        })
        // sprite is moving up 
        this.anims.create({

            key: "upSon",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {
                frames: ["sonSprite012", "sonSprite013", "sonSprite014", "sonSprite015"]
            })
        })
        // sprite is moving to the right
        this.anims.create({

            key: "rightSon",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {
                frames: ["sonSprite08", "sonSprite09", "sonSprite010", "sonSprite011"]
            })
        })
         // sprite is moving to the left 
        this.anims.create({

            key: "leftSon",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {

                frames: ["sonSprite04", "sonSprite05", "sonSprite06", "sonSprite07"]
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
        console.log("At Play03");

        //array list, contains the dialouge that is being shown on the screen

        this.dialougeScript = [
        "I'm sorry grandma, it's not that I don't want to \ntalk to you. I think of all the stuff I could \ntell you, you must already know.", 
        "Otherwise, you wouldn't always tell me to listen. \n", 
        "They say you've all gone away\nbut you didn't tell me where you went.", 
        "I guess its someplace you think I should know, \nbut grandma, I know so little.", 
        "Do you know what I want to do when I grow up?", 
        "I want to tell people the things they don't know\nshow them the stuff they haven't seen.", 
        "It'll be so much fun. Perhaps one day... \nI'll find out where you've gone, and if I do, \ncan I tell everyone and bring them to visit you?", 
        "Grandma... I miss you. Especially when I see \nmy newborn cousin who still doesn't have a name.", 
        "He reminds me that you always said you felt old.\nI want to tell him that I feel old too.",
        "... ", 
        ];
        this.currentDialouge = 0; // counter for which dialogue to show
        this.speakerOption = "Yang Yang (son)"; // the character who is speaking
        

        //KeyInput Codes
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.zLastClicked = 0; // counter for clicks, to prevent speeding through text

        //These lines of code load our map for our scene
        const map = this.add.tilemap('scene3Json');
        const tileset01 = map.addTilesetImage('outsideTile', 'outsideImage');
        const tileset02 = map.addTilesetImage('grave_markers', 'graveStones');
        const floorLayer = map.createLayer("Floor", tileset01);
        const treesLayer = map.createLayer('trees', tileset01);
        const graveLayer = map.createLayer('Graves',tileset02);
        floorLayer.setCollisionByProperty({ collides: true });
        treesLayer.setCollisionByProperty({collides: true});
        graveLayer.setCollisionByProperty({collides: true});



        //Created the son character, which is what the player will be controlling for this scene
        this.son = this.physics.add.sprite(15, centerY+50, 'son', 'sonSprite00');
        this.son.body.setCollideWorldBounds(true);
        this.vel = 100;

        //created the family to be in the scene
        this.father = this.physics.add.sprite(215, 211, 'father', 'dadSprite08');
        this.father.body.setImmovable();
        this.mother = this.physics.add.sprite(300, 211, 'mother');
        this.mother.body.setImmovable();
        this.daughter = this.physics.add.sprite(330, 211, 'daughter', 'daughterSprite00');
        this.daughter.body.setImmovable();


        //collison code with objects, sprites, and tilemap
        this.physics.add.collider(this.son, floorLayer);
        this.physics.add.collider(this.son, treesLayer);
        this.physics.add.collider(this.son, graveLayer);
        this.physics.add.collider(this.son, this.father);
        this.physics.add.collider(this.son, this.mother);
        this.physics.add.collider(this.son, this.daughter);

        //textbox (set to visibility false until player reaches a spot on the floor)
        this.dialougeBox = this.add.rectangle(0, borderUISize - borderPadding+350, w, borderUISize*3, 0x9c0d03).setOrigin(0,0);
        this.dialougeBox.visible = false;
        
        this.dialouge = this.add.text(10, borderUISize - borderPadding + 380, this.dialougeScript[this.currentDialouge]);
        this.speaker = this.add.text(10, borderUISize - borderPadding + 360, this.speakerOption);

        this.speaker.visible = false;        
        this.dialouge.visible = false;

        //hint text, displays hint when 10 seconds have passed
        this.hint = this.add.text(centerX,30, "Approach the Grave", textConfig).setOrigin(0.5);
        this.hint.visible = false;
        this.clock = this.time.delayedCall(10000, ()=> {
            if(this.textBox==false){
                this.hint.visible = true;
            }
        })
    }
    update(time,delta){
        this.direction = new Phaser.Math.Vector2(0);

        // if the player hasnt reached the carpet spot yet, they are free to move wherever they want
        if(this.textBox==false){
            if(keyLEFT.isDown){
                this.son.play("leftSon", true); //play animation key for hiting left
                this.direction.x = -5;
            }else if(keyRIGHT.isDown){
                this.direction.x = 5;
                this.son.play("rightSon", true); //play animation key for hitting right
            }
            if(keyUP.isDown){
                this.son.play("upSon", true); // play animation key for hitting up
                this.direction.y = -5;
            }else if(keyDOWN.isDown){
                this.son.play("downSon", true); // play animation key for hitting down
                this.direction.y = 5;
                
            }
            this.direction.normalize();
            this.son.setVelocity(this.vel * this.direction.x, this.vel * this.direction.y);   // how fast the sprite moves  
            if((242<=this.son.x  && this.son.x<=272) && this.son.y==211){
                console.log("Front of Grave");
                this.sound.play('beap', { volume: 0.5 });
                this.son.setFrame("sonSprite012");
                this.textBox=true; //When players are on the location to trigger dialouge box, it'll set this.textBox to true
            }
     
        }else if(this.textBox==true){ // if the textbox is true, we start showing the dialogue
            this.hint.visible = false;
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
                this.scene.start('endScene');
            }
        }

        
    }
}