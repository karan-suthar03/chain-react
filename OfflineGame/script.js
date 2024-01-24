function setup(){
    const canvas = createCanvas(400, 600);
    canvas.class('canvas-class');
    canvas.elt.removeAttribute('style');
    canvas.parent("canvas-Container");
    for(let i = 0;i<cols;i++){
        dBalls[i] = [];
        for(let j = 0;j<rows;j++){
            dBalls[i][j] = new Gola(i,j,this);
        }
    }
    check();
}


function draw(){
    clear();
    drawGrid();
    drawBalls();
    if(updateMove()){
        if(isRun){
            matrix = copyArray(duplicate);
            check();
        }
    }
    whoWon();
    if(!isRun && some){
        let k = 0;
        while (k < 50) {
            if(RemPlayers[(player+1)%(nPlayers)] === 1){
                player = (player+1)%(nPlayers);
                localStorage.setItem('gameData',encodeURIComponent(JSON.stringify({players:nPlayers,played:played,player:player,grid:rows,matrix:matrix,RemPlayers:RemPlayers})));
                break;
            }else{
                player = (player+1)%(nPlayers);
            }
            k++;
        }
        some = false;
    }
}