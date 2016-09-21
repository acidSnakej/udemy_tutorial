
var game = new Phaser.Game(370, 550, Phaser.AUTO, 'block_game');
var backgroundGame;
var ship;
var cursors;
var bullets;
var bulletTime = 0;
var shootButton;
var enemies;
var mainState = {
    
    preload: function () {
        // Load all recurses
        "use strict";
        game.load.image('background', 'img/space.png');
        game.load.image('ship', 'img/nave.png');
        game.load.image('laser', 'img/laser.png');
        game.load.image('enemy', 'img/pajaro2.png');

    },

    create: function () {
        // Show all recurses
        "use strict";
        // Scenario
        backgroundGame = game.add.tileSprite(0, 0, 370, 550, 'background');
        ship = game.add.sprite(game.width / 2, 500, 'ship');
        ship.anchor.setTo(0.5);
        // Bullets
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
        // Physics of the ship
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(ship);
        ship.body.collideWorldBounds = true;
        // Group of enemies
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        // Create enemies on Screen
        
        for (var y = 0; y < 6; y++) {
            
            for (var x = 0; x < 7; x++) {
                var enemy = enemies.create(x*40, y*20, 'enemy');
                enemy.anchor.setTo(0.5);
            }
        }
        enemies.x = 50;
        enemies.y = 30;
        
        var anim = game.add.tween(enemies).to({x:100}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        anim.onRepeat.add(descend, this); // The tutorial says onLoop but dont work, work with onRepeat
        
    },

    update: function () {
        "use strict";
        if (cursors.right.isDown) {
            
            ship.position.x += 3;
            
        } else if (cursors.left.isDown) {
            
            ship.position.x -= 3;
        }
        if (shootButton.isDown) {
            
            if (game.time.now > bulletTime) {
                
                var bullet = bullets.getFirstExists(false);
            }
            
            if (bullet) {
                
                bullet.reset(ship.x, ship.y);
                bullet.body.velocity.y = -250;
                bulletTime = game.time.now + 400;
            }
        }
        
        game.physics.arcade.overlap(bullets, enemies, collision, null, this);
        
    }

};

function collision (bullet, enemy) {
    bullet.kill();
    enemy.kill();
}
function descend () {
    enemies.y += 10;
}



game.state.add('main', mainState);
game.state.start('main');