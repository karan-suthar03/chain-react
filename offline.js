let button = document.getElementById('StartButton');
button.addEventListener('click',()=>{
    startGame();
});
let NumOfPlayers = document.getElementById('players');
function startGame(){
    let matrix= [];
    for(let i= 0;i<Math.floor(gridSize.value*0.6);i++){
        matrix[i] = [];
        for(let j= 0;j<gridSize.value;j++){
            matrix[i][j] = {player:-1,balls:0};
        }
    }
    let RemPlayers = [];
    for(let i = 0;i<parseInt(NumOfPlayers.value);i++){
        RemPlayers[i] = 1;
    }
    setData({player:0,played:0,players:NumOfPlayers.value,grid:gridSize.value,matrix:matrix,RemPlayers:RemPlayers});
    window.location.href = 'OfflineGame/index.html';
}
function setData(value) {
    localStorage.setItem('gameData',encodeURIComponent(JSON.stringify(value)));
}

function startPreviousOfflineGame(B){
    B.classList.remove('shake');
    gameData = JSON.parse(decodeURIComponent(localStorage.getItem('gameData')));
    if(gameData === null){
        setTimeout(function() {
            B.classList.add('shake');
        }, 1);
        return;
    }
    window.location.href = 'OfflineGame/index.html';
}