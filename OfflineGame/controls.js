function check(){
    duplicate = copyArray(matrix);
    isRun = evel(matrix,duplicate);
    isok = false;
}

function mousePressed() {
    if (!isPressed && !isok && !isRun) {
        let i = Math.floor((mouseX - margin2) / size);
        let j = Math.floor((mouseY - margin) / size);
        console.log(i,j)
        if ((i < cols && i > 0 || Object.is(i, 0)) && (j < rows && j > 0 || Object.is(j, 0))) {
            if(matrix[i][j].player === player || matrix[i][j].balls === 0){
                matrix[i][j].balls++;
                matrix[i][j].player = player;
                if(played<=nPlayers+1){
                    played++;
                }
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

function whoWon(){
    if(played > nPlayers){
        let playeds = 0;
        for(let p = 0;p<nPlayers;p++){
            let stop = false
            for(let i = 0;i<matrix.length;i++){
                for(let j = 0;j<matrix[i].length;j++){
                    if(p === matrix[i][j].player){
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
            }
        }
        if(playeds === 1){
            for(let i = 0;i<nPlayers;i++){
                if(RemPlayers[i] === 1){
                    noLoop();
                    localStorage.removeItem('gameData');
                    window.location.href = '../index.html';
                }
            }
        }
    }
}
