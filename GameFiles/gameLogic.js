function critical(x,y){
    if((x === 0 && y === 0) || (x === rows-1 && y === cols-1) || (x === 0 && y === cols-1) || (x === rows-1 && y === 0)){
        return 2;
    }

    if(x === 0 || y === 0 || x === rows-1 || y === cols-1){
        return 3;
    }
    return 4;
}

function updateMove(){
    for(let move of moves){
        move.update()
        move.show();
    }
    moves = moves.filter(move => !move.update());
    return moves.length === 0;
}

function evel(matrix,duplicate){
    let isRun = false;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].balls >= critical(j, i)) {
                if (i - 1 >= 0) {
                    moves.push(new Move(i, j, matrix[i][j].player, 'left'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i - 1][j].balls++;
                    duplicate[i - 1][j].player = matrix[i][j].player;
                }
                if (j - 1 >= 0) {
                    moves.push(new Move(i, j, matrix[i][j].player, 'up'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i][j - 1].balls++;
                    duplicate[i][j - 1].player = matrix[i][j].player;
                }
                if (i + 1 < matrix.length) {
                    moves.push(new Move(i, j, matrix[i][j].player, 'right'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i + 1][j].balls++;
                    duplicate[i + 1][j].player = matrix[i][j].player;
                }
                if (j + 1 < matrix[i].length) {
                    moves.push(new Move(i, j, matrix[i][j].player, 'down'));
                    duplicate[i][j].balls--;
                    matrix[i][j].balls--;
                    duplicate[i][j + 1].balls++;
                    duplicate[i][j + 1].player = matrix[i][j].player;
                }
                isRun = true;
            }
        }
    }
    return isRun;
}