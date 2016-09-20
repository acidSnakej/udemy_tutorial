
var game = new Phaser.Game(370, 550, Phaser.AUTO, 'block_game');
var backgroundGame;
var button;
var flappy;
var mainState = {
    
    preload: function () {
        // Load all recurses
        "use strict";
        game.load.image('background', 'img/bg.jpeg');
        game.load.spritesheet('birds', 'img/pajaros.png', 43, 30); // depends of the dimension of image, for example this image is 129x30,                                                                       therefor 129/3 = 43, then the first bird appears. 30 is the value of Y

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
    },

    update: function () {
        "use strict";
        // Animate the game
        flappy.animations.play('fly');
      
    }

};

game.state.add('main', mainState);
game.state.start('main');