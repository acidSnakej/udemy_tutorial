var Finish = {
    
    preload: function () {
        "use strict";
        
    },
    
    create: function () {
        "use strict";
        game.stage.backgroundColor = "#990000";
        if (confirm('¿Desea reiniciar el juego?')) {
            game.state.start('Game');
        }
    },
    
    update: function () {
        "use strict";
    }
    
};