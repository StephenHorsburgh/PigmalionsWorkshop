const io = require('socket.io')();
const { FRAME_RATE } = require('./constants');
const {  createGameState, gameLoop } = require('./game');
//const { initGame,  gameLoop, getUpdatedVelocity } = require('./game');
//const{ makeid } = require('./utils');

//const state = {};
//const clientRooms = {};

io.on('connection', client => {
    const state = createGameState();

    startGameInterval(client, state);
});

function startGameInterval(client, state){
    const intervalID = setInterval(() => {
        const winner = gameLoop(state);
        if(!winner){
            client.emit('gameState', JSON.stringify(state));
        }
        else{
            client.emit('gameOver');
            clearInterval(intervalID);
        }
    }, 1000 / FRAME_RATE)
}


io.listen(3000);