function setup(){
    var canvas = createCanvas(400, 600);
    canvas.class('canvas-class');
    canvas.elt.removeAttribute('style');
    canvas.parent("canvas-Container");
    background(0);
    for(i = 0;i<cols;i++){
        dBalls[i] = [];
        for(j = 0;j<rows;j++){
            dBalls[i][j] = new Gola(i,j);
        }
    }
    check();
}

function drawGrid(){
    stroke(Pcolors[player][0],Pcolors[player][1],Pcolors[player][2]);
    for(let i = 0;i<=cols;i++){
        line(50+(i*size),50,50+(i*size),(50+(size*rows)));
    }
    for(let i = 0;i<=rows;i++){
        line(50,50+(i*size),50+(size*cols),50+(i*size));
    }
}

function drawBalls(){
    stroke(0)
    for(i = 0;i<cols;i++){
        for(j = 0;j<rows;j++){
            dBalls[i][j].draw(matrix[i][j])
        }
    }
}

function draw(){
    background(0);
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
        while (true && k<50) {
            if(RemPlayers[(player+1)%(nPlayers)] == 1){
                player = (player+1)%(nPlayers);
                localStorage.setItem('gameData',encodeURIComponent(JSON.stringify({players:nPlayers,player:player,played:played,grid:rows,matrix:matrix,RemPlayers:RemPlayers})));
                break;
            }else{
                player = (player+1)%(nPlayers);
            }
            k++;
        }
        some = false;
    }
}
