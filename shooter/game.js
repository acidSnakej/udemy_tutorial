var ship;
var bullets;
var bulletTime = 400;
var time_game = 0;
var enemies;
var timer;
var points;
var textPoints;
var lifes;
var textLifes;
var music;
var cursors;
var laser_shoot;
var Game = {
    
    preload: function () {
        "use strict";
        game.load.image('bg', 'img/bg.png');
        game.load.image('enemy', 'img/malo.png');
        game.load.image('ship', 'img/nave.png');
        game.load.image('laser', 'img/laser.png');
        game.load.audio('example', ['audio/RoccoW_-_08_-_Sweet_Self_Satisfaction.mp3']);
        game.load.audio('shoot_sound', ['audio/laser_shoot.wav']);
    },
    
    create: function () {
        "use strict";
        music = game.add.audio('example');
        music.play();
        game.add.tileSprite(0, 0, 400, 540, 'bg');
        ship = game.add.sprite(game.width/2, 490, 'ship');
        ship.anchor.setTo(0.5);
        cursors = game.input.keyboard.createCursorKeys();
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
        
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE; // Set the propieties of arcade
        enemies.createMultiple(30, 'enemy');
        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('checkWorldBounds', true); // Make sure the ammo never goes to 0
        enemies.setAll('outOfBoundsKill', true);
        
        timer = game.time.events.loop(2000, this.createEnemy, this);
        
        points = 0;
        game.add.text(20, 20, 'Puntos: ', {font: '14px Arial', fill: '#FFF'});
        textPoints = game.add.text(80, 20, '0', {font: '14px Arial', fill: '#FFF'});
        
        lifes = 3;
        game.add.text(310, 20, 'Vidas: ', {font: '14px Arial', fill: '#FFF'});
        textLifes = game.add.text(360, 20, '3', {font: '14px Arial', fill: '#FFF'});
    },
    
    update: function () {
        "use strict";
         ship.rotation = game.physics.arcade.angleToPointer(ship) + Math.PI/2 // Aim with the cursor  with Math.PI/2
         
         if (game.input.activePointer.leftButton.isDown) {
             this.shoot();
        }
        
        game.physics.arcade.overlap(bullets, enemies, this.collision, null, this); // When the bullet and the enemy collision
        
        enemies.forEachAlive (function (enemy) {
            if (enemy.position.y > 520 && enemy.position.y < 521){
                enemy.kill();
                lifes--;
                textLifes.text = lifes;
            }
        });
        
        if (cursors.left.isDown)
            ship.position.x -= 1.5;
        
        if (cursors.right.isDown)
            ship.position.x += 1.5;
        
        if (lifes == 0)
            game.state.start('Finish');
    },
    
    shoot: function () {
        
        if (game.time.now > time_game && bullets.countDead() > 0) {
            laser_shoot = game.add.audio('shoot_sound');
            laser_shoot.play();
            time_game = game.time.now + bulletTime;
            var bullet = bullets.getFirstDead();
            bullet.anchor.setTo(0.5);
            bullet.reset(ship.x, ship.y);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet) + Math.PI/2
            game.physics.arcade.moveToPointer(bullet, 200);
            
        }
        
    },
    
    createEnemy: function () {
        var enem = enemies.getFirstDead();
        var num = Math.floor(Math.random()*10)+1;
        enem.reset(num*39, 0);
        enem.anchor.setTo(0.5);
        enem.body.velocity.y = 100;
        enem.checkWorldBounds = true;
        enem.outOfBoundsKill = true;
    },
    
    collision: function (bullets, enemies) {
        bullets.kill();
        enemies.kill();
        points += 20;
        textPoints.text = points;
    
    }
    
    
};