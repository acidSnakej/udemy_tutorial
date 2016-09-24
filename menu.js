var Menu = {
    
    preload: function () {
        game.stage.backgroundColor = '#FFF';
        game.load.image('button', 'img/btn.png');
        
    },
    
    create: function () {
        // the two first arguments is to position, then the name of recurse, the four argument is a pointer to function, and the last is the object itself
        var button = this.add.button(game.width/2, game.height/2, 'button', this.startGame, this);
        button.anchor.setTo(0.5);
        var initText = this.add.text(game.width/2, game.height/2 -85, 'Iniciar juego', {font: 'bold 24px sans-serif', fill:'black', align:"center"});
        initText.anchor.setTo(0.5);
        var titleText = this.add.text(game.width/2, game.height/2 -125, 'Flappy Game', {font: 'bold 32px sans-serif', fill:'black', align:"center"});
        titleText.anchor.setTo(0.5);
    },
    
    startGame: function () {
       this.state.start('Game'); 
    }
    
};