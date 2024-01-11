function copyArray(array1) {
    let d = [];
    for(i = 0;i<cols;i++){
        d[i] = []
        for(j = 0;j<rows;j++){
            d[i][j] = {player: array1[i][j].player,  balls: array1[i][j].balls};
        }
    }
    return d;
}

function critical(x,y){
    if((x == 0 && y == 0) || (x == rows-1 && y == cols-1) || (x == 0 && y == cols-1) || (x == rows-1 && y == 0)){
        return 2;
    }

    if(x == 0 || y == 0 || x == rows-1 || y == cols-1){
        return 3;
    }
    return 4;
}
var count = 0;
function check(){
    duplicate = copyArray(matrix);
    isRun = false;
    mat = false;
    if(myID == player){
        gameD.child('matrix').set(matrix).then(()=>{
            mat = true;
        })
        console.log(count++);
    }
    for(i= 0 ;i<cols;i++){
        for(j = 0;j<rows;j++){
            if(matrix[i][j].balls >= critical(j,i)){
                if(i-1 >= 0){
                    moves.push(new Move(i,j,matrix[i][j].player,'left'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i-1][j].balls++;
                    duplicate[i-1][j].player = matrix[i][j].player;
                }
                if(j-1 >= 0){
                    moves.push(new Move(i,j,matrix[i][j].player,'up'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i][j-1].balls++;
                    duplicate[i][j-1].player = matrix[i][j].player;
                }
                if(i+1<cols){
                    moves.push(new Move(i,j,matrix[i][j].player,'right'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i+1][j].balls++;
                    duplicate[i+1][j].player = matrix[i][j].player;
                }
                if(j+1<rows){
                    moves.push(new Move(i,j,matrix[i][j].player,'down'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i][j+1].balls++;
                    duplicate[i][j+1].player = matrix[i][j].player;
                }
                isRun = true;
            }
        }
    }
    isok = false;
}

function mousePressed() {
    if (!isPressed && !isok && !isRun && myID == player) {
        let i = parseInt((mouseX - margin2) / size);
        let j = parseInt((mouseY - margin) / size);
        console.log(i,j)
        if ((i < cols && i > 0 || Object.is(i, 0)) && (j < rows && j > 0 || Object.is(j, 0))) {
            if(matrix[i][j].player == player || matrix[i][j].balls == 0){
                matrix[i][j].balls++;
                matrix[i][j].player = player;
                if(played<=nPlayers+1){
                    played++;
                }
                gameD.child('played').set(played)
                isPressed = true;
                isok = true;
                some = true;
            }
        }
        check();
    }
}

function mouseReleased() {
    isPressed = false;
}


function updateMove(){
    for(let move of moves){
        move.update()
        move.show();
    }
    moves = moves.filter(move => !move.update());
    return moves.length == 0;
}

function whoWon(){
    if(played > nPlayers){
        let playeds = 0;
        for(p = 0;p<nPlayers;p++){
            let stop = false
            for(i = 0;i<matrix.length;i++){
                for(j = 0;j<matrix[i].length;j++){
                    if(p == matrix[i][j].player){
                        stop = true;
                        playeds++;
                        break;
                    }
                }
                if(stop){
                    break;
                }
            }
            if(!stop){
                RemPlayers[p] = 0;
                if(player == myID){
                    gameD.child('RemPlayers').set(RemPlayers);
                }
            }
        }
        if(playeds == 1){
            for(let i = 0;i<nPlayers;i++){
                if(RemPlayers[i] == 1){
                    window.location.href = '../index.html';
                    background(0);
                    drawGrid();
                    //drawBalls();
                    //localStorage.setItem('gameData',encodeURIComponent(JSON.stringify({players:nPlayers,player:player,grid:rows,matrix:matrix,RemPlayers:RemPlayers})));
                    noLoop();
                }
            }
        }
    }
}