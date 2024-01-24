function copyArray(array1) {
    let d = [];
    for(let i = 0;i<cols;i++){
        d[i] = []
        for(let j = 0;j<rows;j++){
            d[i][j] = {player: array1[i][j].player,  balls: array1[i][j].balls};
        }
    }
    return d;
}

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
    for(let i = 0;i<cols;i++){
        for(let j = 0;j<rows;j++){
            dBalls[i][j].draw(matrix[i][j])
        }
    }
}
