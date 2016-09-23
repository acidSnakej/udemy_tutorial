var bg;
var tubes;
var flappy;
var Game = {
    
    preload: function () {
        game.load.image('bg', 'img/bg.jpeg');
        game.load.spritesheet('birds', 'img/pajaros.png', 43, 30);
        game.load.image('tube', 'img/tubo.png');
        
        game.forceSingleUpdate = true;
    },
    
    create: function () {
        bg = game.add.tileSprite(0, 0, 370, 550, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        tubes = game.add.group();
        tubes.enableBody = true;
        tubes.createMultiple(20, 'tube');
        
        flappy = game.add.sprite(100, 245, 'birds');
        flappy.frame = 1;
        flappy.animations.add('fly', [0, 1, 2], 10, true);
    },
    
    update: function () {
        
        bg.tilePosition.x -= 1;
        
    }
    
};