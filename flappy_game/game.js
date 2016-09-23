var bg;
var tubes;
var flappy;
var jump;
var timer;
var sound;
var points;
var txtPoints;
var Game = {
    
    preload: function () {
        game.load.image('bg', 'img/bg.jpeg');
        game.load.spritesheet('birds', 'img/pajaros.png', 43, 30);
        game.load.image('tube', 'img/tubo.png');
        game.load.audio('audio', ['audio/FF7BossBattlePiano_byTannerHelland.ogg']);
        
        game.forceSingleUpdate = true;
    },
    
    create: function () {
        bg = game.add.tileSprite(0, 0, 370, 550, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // group of image
        tubes = game.add.group();
        tubes.enableBody = true;
        tubes.createMultiple(20, 'tube');
        
        // animation to flappy
        flappy = game.add.sprite(100, 245, 'birds');
        flappy.frame = 1;
        // support point of sprite
        flappy.anchor.setTo(0, 0.5);
        flappy.animations.add('fly', [0, 1, 2], 10, true);
        game.physics.arcade.enable(flappy);
        flappy.body.gravity.y = 1200;
        // jump with the mouse
        jump = game.input.onDown.add(this.jump, this);
        sound = game.add.audio('audio');
        sound.play();
        timer = game.time.events.loop(1500, this.createColumn, this);
        
        points = -1;
        txtPoints = game.add.text(20, 20, '0', {font: '30px arial', fill:'#FFF'});
        
    },
    
    update: function () {
        // conditions to lose
        if (flappy.inWorld == false){
            
            this.state.start('GameOver');
            sound.pause();
        }
        else if (flappy.position.y > 460){
            flappy.alive = false;
            this.state.start('GameOver');
            
        }
        else {
            bg.tilePosition.x -= 1;
            game.physics.arcade.overlap(flappy, tubes, this.touchTube, null, this);
        }
        
        flappy.animations.play('fly');
        // animation when flappy is falling
        if (flappy.angle < 20) {
            flappy.angle += 1;    
        }
        
    },
    
    jump: function () {
        if (flappy.alive == true){
            flappy.body.velocity.y = -350;
            // this is the animation when flappy jump
            game.add.tween(flappy).to({angle:-20}, 100).start();
        }
    },
    
    createColumn: function () {
        var hole = Math.floor(Math.random()*5)+1;
        
        for ( var i = 0; i < 8; i++){
            if ( i != hole && i != hole+1){
                this.createTube(370, i*55+20);
            }
        }
        
        points += 1;
        txtPoints.text = points;
    
    },
    
    createTube: function (x, y) {
        var tube = tubes.getFirstDead();
        tube.reset(x, y);
        tube.body.velocity.x = -180;
        tube.checkWorldBounds = true;
        tube.outOfBoundsKill = true;
    },
    
    touchTube: function () {
        if (flappy.alive == false)
            return;
        flappy.alive = false;
        game.time.events.remove(timer);
        tubes.forEachAlive(function(t){
            t.body.velocity.x = 0;
        }, this);
    }
    
};