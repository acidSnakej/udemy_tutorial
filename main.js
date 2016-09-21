
var game = new Phaser.Game(370, 550, Phaser.AUTO, 'block_game');
var backgroundGame;
var button;
var flappy;
var cursors;
var person;
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
        flappy = game.add.sprite(100, 100, 'birds');
        flappy.frame = 1; // with this take the 3 images like a array, the second bird is the position 1 by default
        flappy.animations.add('fly', [0, 1, 2], 10, true); // first argument name of animation, 
                                                          // second argument array order position of animation
                                                         // Thir argument speed of animation
        cursors = game.input.keyboard.createCursorKeys(); // create all cursors
        game.physics.startSystem(Phaser.Physics.ARCADE); // All physics 
        game.physics.arcade.enable(flappy);
        flappy.body.collideWorldBounds = true; // limit of windows or world flappy cant advance.
        
    },

    update: function () {
        "use strict";
        // Animate the game
        flappy.animations.play('fly');
        if(cursors.right.isDown)
            {
                flappy.position.x += 5;
            }
        if(cursors.down.isDown)
            {
                flappy.position.y += 5;
            }
        if(cursors.left.isDown)
            {
                flappy.position.x -= 5;
            }
        if(cursors.up.isDown)
            {
                flappy.position.y -= 5;
            }
        backgroundGame.tilePosition.x -= 10;
        
    }

};

game.state.add('main', mainState);
game.state.start('main');