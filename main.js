
var game = new Phaser.Game(370, 550, Phaser.AUTO, 'block_game');
var backgroundGame;
var ship;
var cursors;
var bullets;
var bulletTime = 0;
var shootButton;

var mainState = {
    
    preload: function () {
        // Load all recurses
        "use strict";
        game.load.image('background', 'img/space.png');
        game.load.image('ship', 'img/nave.png');
        game.load.image('laser', 'img/laser.png');

    },

    create: function () {
        // Show all recurses
        "use strict";
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        ship = game.add.sprite(game.width/2, 500, 'ship');
        ship.anchor.setTo(0.5);
        cursors = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        bullets = game.add.group();
        bullets.enableBody = true; // Prepare to collision
        bullets.physicsBodyType = Phaser.Physics.ARCADE; // Prepare the body to bullets
        bullets.createMultiple(20, 'laser'); // How many bullets
        bullets.setAll('anchor.x', 0.5); // From where is shooting
        bullets.setAll('anchor.y', 1); // From where is shooting
        bullets.setAll('outOfBoundsKill', true); // If the Bullet reach the limit of the world dies
        bullets.setAll('checkWorldBounds', true); // Verify where is the bullet
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(ship);
        ship.body.collideWorldBounds = true;
        
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
        if(shootButton.isDown)
            {
                if(game.time.now > bulletTime)
                {
                    var bullet = bullets.getFirstExists(false);
                }
                if(bullet)
                {
                    bullet.reset(ship.x, ship.y);
                    bullet.body.velocity.y = -300;
                    bulletTime = game.time.now + 800;
                }
            }
        
    }

};

game.state.add('main', mainState);
game.state.start('main');