var GameOver = {
    
    preload: function () {
        game.stage.backgroundColor = '#FFF';
        game.load.image('button', 'img/btn.png');
    },
    
    create: function () {
        // the two first arguments is to position, then the name of recurse, the four argument is a pointer to function, and the last is the object itself
        var button = this.add.button(game.width/2, game.height/2, 'button', this.startGame, this);
        button.anchor.setTo(0.5);
        var txtLabelPoints= this.add.text(game.width/2, game.height/2 -85, 'Puntos: ', {font: 'bold 24px sans-serif', fill:'black', align:"center"});
        txtLabelPoints.anchor.setTo(0.5);
        if (points == -1)
            points = 0;
        var txtPointsNum = this.add.text(game.width/2 +50, game.height/2 -85, points.toString(), {font: 'bold 20px sans-serif', fill:'black', align:"center"});
        txtPointsNum.anchor.setTo(0.5);
        var titleText = this.add.text(game.width/2, game.height/2 -125, 'Juego Terminado', {font: 'bold 32px sans-serif', fill:'black', align:"center"});
        titleText.anchor.setTo(0.5);
        sound.pause();
        
    },
    
    startGame: function () {
        this.state.start('Game');
    }
    
}