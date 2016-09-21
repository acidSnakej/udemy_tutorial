var game = new Phaser.Game(400, 540, Phaser.AUTO, 'game');
game.state.add('Game', Game);
game.state.add('Finish', Finish);

game.state.start('Game');