var game = new Phaser.Game(370, 550, Phaser.AUTO, 'block_game');
var backgroundGame;
var button;
var flappy;
var mainState = {
    
    preload: function(){
        // Load all recurses
        game.load.image('background','img/bg.jpeg');
        game.load.image('bird', 'img/pajaro1.png');
        game.load.image('btn', 'img/btn.png');
    },

    create: function(){
        // Show all recurses
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        flappy = game.add.sprite(game.width/2, game.height/2, 'bird');
        flappy.anchor.setTo(0.5);
        flappy.scale.setTo(1) // change size of image
        // button = game.add.sprite(game.width/2, game.height/2, 'btn'); // Image management
        // button.anchor.setTo(0.5); // Change support point of image, where superior corner left
    },

    update: function(){
        // Animate the game
        backgroundGame.tilePosition.x -= 1;
        flappy.angle += 0.2; // change the angle of image

    }

};

game.state.add('main', mainState);
game.state.start('main');