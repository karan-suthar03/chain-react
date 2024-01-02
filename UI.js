let button = document.getElementById('StartButton');
button.addEventListener('click',()=>{
    startGame();
});
let NumOfPlayers = document.getElementById('players');
function startGame(){
  	let matrix= [];
    for(i= 0;i<parseInt(selectw.value*0.6);i++){
      	matrix[i] = [];
      	for(j= 0;j<selectw.value;j++){
        	matrix[i][j] = {player:-1,balls:0};
      	}
    }
    RemPlayers = [];
    for(i = 0;i<parseInt(NumOfPlayers.value);i++){
      	RemPlayers[i] = 1;
    }
    setData({player:0,played:0,players:NumOfPlayers.value,grid:selectw.value,matrix:matrix,RemPlayers:RemPlayers});
    window.location.href = 'actual game/index.html';
}
function setData(value) {
    localStorage.setItem('gameData',encodeURIComponent(JSON.stringify(value)));
}