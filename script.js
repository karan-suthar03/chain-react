let Pcolors = [[255,0,0],[0,0,255],[0,255,0],[2555,255,255],[125,125,125]];
let nPlayers = 2;
let rows = 12,cols = 7;
let size = 43;
let matrix = [];
let isPressed = false;
let player = 1;
let isok = false;
let moves = [];
let isRun = false;
let duplicate = [];
let dBalls = [];

function setup(){
    createCanvas(400,600);
    background(0);
    for(i = 0;i<cols;i++){
        matrix[i] = [];
        dBalls[i] = [];
        for(j = 0;j<rows;j++){
            matrix[i][j] = {balls:0,player:0};
            dBalls[i][j] = new Gola(i,j);
        }
    }
}

function drawGrid(){
    stroke(Pcolors[player-1][0],Pcolors[player-1][1],Pcolors[player-1][2]);
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
            // if(matrix[i][j].player == 1){
            //     fill(255,0,0);
            // }else{
            //     fill(0,0,255);
            // }
            dBalls[i][j].draw(matrix[i][j])
            // if(matrix[i][j].balls == 2){
            //     for(r = 1;r<3;r++){
            //         circle(30/3*r+50+(i*size),15+50+(j*size),15);
            //     }
            // }
            // if(matrix[i][j].balls == 3){
            //     for(r = 1;r<3;r++){
            //         circle(30/3*r+50+(i*size),30/3*2+50+(j*size),15);
            //     }
            //     circle(15+50+(i*size),30/3*1+50+(j*size),15);
            // }
        }
    }
}

function updateMove(){
    for(let move of moves){
        move.update()
        move.show();
    }
    moves = moves.filter(move => !move.update());
    if(moves.length == 0){
        return true;
    }else{
        return false;
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
}

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

function check(){
    duplicate = copyArray(matrix);
    isRun = false;
    for(i= 0 ;i<cols;i++){
        for(j = 0;j<rows;j++){
            if(matrix[i][j].balls >= critical(j,i)){
                if(i-1 >= 0){
                    moves.push(new MoveLeft(i,j,matrix[i][j].player));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i-1][j].balls++;
                    duplicate[i-1][j].player = matrix[i][j].player;
                }
                if(j-1 >= 0){
                    moves.push(new MoveUp(i,j,matrix[i][j].player));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i][j-1].balls++;
                    duplicate[i][j-1].player = matrix[i][j].player;
                }
                if(i+1<cols){
                    moves.push(new MoveRight(i,j,matrix[i][j].player));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i+1][j].balls++;
                    duplicate[i+1][j].player = matrix[i][j].player;
                }
                if(j+1<rows){
                    moves.push(new MoveDown(i,j,matrix[i][j].player));
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
    if (!isPressed && !isok && !isRun) {
        let i = parseInt((mouseX - 50) / size);
        let j = parseInt((mouseY - 50) / size);
        
        if ((i < cols && i >= 0) && (j < rows && j >= 0)) {
            if(matrix[i][j].player == player || matrix[i][j].balls == 0){
                matrix[i][j].balls++;
                matrix[i][j].player = player;
                if((player+1)%(nPlayers+1) == 0){
                    player = (player+2)%(nPlayers+1)
                }else{
                    player = (player+1)%(nPlayers+1)
                }
                isPressed = true;
                isok = true;
            }
        }
        check();
    }
}

function mouseReleased() {
    isPressed = false;
}
