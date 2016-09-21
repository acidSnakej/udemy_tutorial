
var game = new Phaser.Game(370, 550, Phaser.AUTO, 'block_game');
var backgroundGame;
var button;
var flappy;
var cursors;
var person;
var looking = 'up';
var mainState = {
    
    preload: function () {
        // Load all recurses
        "use strict";
        game.load.image('background', 'img/bg.jpeg');
        game.load.spritesheet('birds', 'img/pajaros.png', 43, 30); // depends of the dimension of image, for example this image is 129x30,                                                                       therefor 129/3 = 43, then the first bird appears. 30 is the value of Y
        game.load.spritesheet('persons', 'img/persona.png', 64, 64);

    },

    create: function () {
        // Show all recurses
        "use strict";
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        /*
        flappy = game.add.sprite(100, 100, 'birds');
        flappy.frame = 1; // with this take the 3 images like a array, the second bird is the position 1 by default
        flappy.animations.add('fly', [0, 1, 2], 10, true); // first argument name of animation, 
                                                          // second argument array order position of animation
                                                         // Thir argument speed of animation
        cursors = game.input.keyboard.createCursorKeys(); // create all cursors
        game.physics.startSystem(Phaser.Physics.ARCADE); // All physics 
        game.physics.arcade.enable(flappy);
        flappy.body.collideWorldBounds = true; // limit of windows or world flappy cant advance.
        */
        person = game.add.sprite(game.width/2, game.height/2, 'persons');
        person.anchor.setTo(0.5, -2);
        person.animations.add('right', [27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true); // depends the position the sprite to animate
        person.animations.add('up', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        person.animations.add('down', [18, 19, 20, 21, 23, 24, 25, 26], 10, true);
        person.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        game.physics.arcade.enable(person);
        person.body.collideWorldBounds = true;
        cursors = game.input.keyboard.createCursorKeys();
        
        
        
    },

    update: function () {
        "use strict";
        // Animate the game
        //flappy.animations.play('fly');
        
        if(cursors.right.isDown)
            {
                person.animations.play('right');
                person.position.x += 2;
                backgroundGame.tilePosition.x -= 1;
                if(looking != 'right')
                {
                    looking = 'right';
                }
                // flappy.position.x += 5;
            }
        else if(cursors.down.isDown)
            {
                person.animations.play('down');
                person.position.y += 2;
                if(looking != 'down')
                {
                    looking = 'down';
                }
                // flappy.position.y += 5;
            }
        else if(cursors.left.isDown)
            {
                person.animations.play('left');
                person.position.x -= 2;
                backgroundGame.tilePosition.x += 1;
                if(looking != 'left')
                {
                    looking = 'left';
                }
                // flappy.position.x -= 5;
                
            }
        else if(cursors.up.isDown)
            {
                person.animations.play('up');
                person.position.y -= 2;
                if(looking != 'up')
                {
                    looking = 'up';
                }
                // flappy.position.y -= 5;
            }
        else
            {
                if(looking != 'waiting')
                {
                    person.animations.stop();
                    backgroundGame.tilePosition.x = 0;
                }
                looking = 'espera';
            }
        
        
        
    }

};

game.state.add('main', mainState);
game.state.start('main');