var ship;
var Game = {
    
    preload: function () {
        "use strict";
        game.load.image('bg', 'img/bg.png');
        game.load.image('enemy', 'img/malo.png');
        game.load.image('ship', 'img/nave.png');
        game.load.image('laser', 'img/laser.png');
    },
    
    create: function () {
        "use strict";
        game.add.tileSprite(0, 0, 400, 540, 'bg');
        ship = game.add.sprite(game.width/2, 490, 'ship');
        ship.anchor.setTo(0.5);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(ship);
    },
    
    update: function () {
        "use strict";
    }
    
};