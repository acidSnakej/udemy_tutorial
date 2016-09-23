var game = new Phaser.Game(370, 550, Phaser.AUTO, 'game');
game.state.add('Menu', Menu);
game.state.add('Game', Game);
//game.state.add('GameOver', GameOver);

game.state.start('Menu');