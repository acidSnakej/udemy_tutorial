var ship;
var bullets;
var bulletTime = 400;
var time_game = 0;
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
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE; // Set the propieties of arcade
        bullets.createMultiple(30, 'laser');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('checkWorldBounds', true); // Make sure the ammo never goes to 0
        bullets.setAll('outOfBoundsKill', true);
        

    },
    
    update: function () {
        "use strict";
         ship.rotation = game.physics.arcade.angleToPointer(ship) + Math.PI/2 // Aim with the cursor  with Math.PI/2
         
         if (game.input.activePointer.leftButton.isDown) {
             this.shoot();
        }
    },
    
    shoot: function () {
        
        if (game.time.now > time_game && bullets.countDead() > 0) {
            
            time_game = game.time.now + bulletTime;
            var bullet = bullets.getFirstDead();
            bullet.anchor.setTo(0.5);
            bullet.reset(ship.x, ship.y);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet) + Math.PI/2
            game.physics.arcade.moveToPointer(bullet, 200);
            
            
        }
        
    }
    
    
};