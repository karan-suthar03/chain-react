

function drawGrid(){
    stroke(Pcolors[player][0],Pcolors[player][1],Pcolors[player][2]);
    for(let i = 0;i<=cols;i++){
        line(margin2+(i*size),margin,margin2+(i*size),(margin+(size*rows)));
    }
    for(let i = 0;i<=rows;i++){
        line(margin2,margin+(i*size),margin2+(size*cols),margin+(i*size));
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
    if(!start && !mat){
        return;
    }
    clear();
    drawGrid();
    drawBalls();
    if(updateMove()){
        if(isRun){
            matrix = copyArray(duplicate);
            check();
        }else{
            gameD.child('player').once("value").then((snapshot)=>{
                player = snapshot.val();
            });
            gameD.child('played').once("value").then((snapshot)=>{
                played = snapshot.val();
            });
        }
    }
    whoWon();
    if(!isRun && some){
        let k = 0;
        while (true && k<50) {
            let x = player;
            if(RemPlayers[(x+1)%(nPlayers)] == 1){
                if(player == myID){
                    gameD.child('player').set((x+1)%(nPlayers));
                }
                break;
            }else{
                x = (x+1)%(nPlayers);
            }
            k++;
        }
        some = false;
    }
}