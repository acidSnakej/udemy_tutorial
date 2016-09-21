
var game = new Phaser.Game(370, 550, Phaser.AUTO, 'block_game');
var backgroundGame;
var ship;
var cursors;
var mainState = {
    
    preload: function () {
        // Load all recurses
        "use strict";
        game.load.image('background', 'img/space.png');
        game.load.image('ship', 'img/nave.png');

    },

    create: function () {
        // Show all recurses
        "use strict";
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        ship = game.add.sprite(game.width/2, 500, 'ship');
        ship.anchor.setTo(0.5);
        cursors = game.input.keyboard.createCursorKeys();
        
        
    },

    update: function () {
        "use strict";
        if(cursors.right.isDown)
            {
                ship.position.x += 3;
            }
        else if(cursors.left.isDown)
            {
                ship.position.x -= 3;
            }
        
    }

};

game.state.add('main', mainState);
game.state.start('main');