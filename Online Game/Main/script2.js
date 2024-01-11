function copyArray(array1) {
    return array1.map(row => row.map(cell => ({ player: cell.player, balls: cell.balls })));
  }
  
  function critical(x, y) {
    if ((x === 0 && y === 0) || (x === rows - 1 && y === cols - 1) || (x === 0 && y === cols - 1) || (x === rows - 1 && y === 0)) {
      return 2;
    }
  
    if (x === 0 || y === 0 || x === rows - 1 || y === cols - 1) {
      return 3;
    }
    return 4;
  }
  
  function check() {
    const tempMatrix = copyArray(matrix);
    let isRun = false;
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (matrix[i][j].balls >= critical(j, i)) {
          handleMove(i, j, -1, 0, tempMatrix);
          handleMove(i, j, 1, 0, tempMatrix);
          handleMove(i, j, 0, -1, tempMatrix);
          handleMove(i, j, 0, 1, tempMatrix);
  
          isRun = true;
        }
      }
    }
    return isRun;
  }
  
  function handleMove(x, y, offsetX, offsetY, tempMatrix) {
    if (x + offsetX >= 0 && x + offsetX < cols && y + offsetY >= 0 && y + offsetY < rows) {
      moves.push(new Move(x, y, matrix[x][y].player, offsetX, offsetY));
      tempMatrix[x][y].balls--;
      matrix[x][y].balls--;
      tempMatrix[x + offsetX][y + offsetY].balls++;
      tempMatrix[x + offsetX][y + offsetY].player = matrix[x][y].player;
    }
  }
  
  function mousePressed() {
    if (!isPressed && played <= nPlayers + 1 && !check()) {
      const i = parseInt((mouseX - margin2) / size);
      const j = parseInt((mouseY - margin) / size);
  
      if (isValidCell(i, j)) {
        matrix[i][j].balls++;
        matrix[i][j].player = player;
        played++;
        isPressed = true;
        check();
      }
    }
  }
  
  function isValidCell(i, j) {
    return (i < cols && i >= 0) && (j < rows && j >= 0) && (matrix[i][j].player === player || matrix[i][j].balls === 0);
  }
  
  function mouseReleased() {
    isPressed = false;
  }
  
  function updateMove() {
    moves = moves.filter(move => !move.update());
    moves.forEach(move => move.show());
    return moves.length === 0;
  }
  
  function drawGrid() {
    stroke(Pcolors[player][0], Pcolors[player][1], Pcolors[player][2]);
    for (let i = 0; i <= cols; i++) {
      line(margin2 + (i * size), margin, margin2 + (i * size), (margin + (size * rows)));
    }
    for (let i = 0; i <= rows; i++) {
      line(margin2, margin + (i * size), margin2 + (size * cols), margin + (i * size));
    }
  }
  
  function drawBalls() {
    stroke(0);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dBalls[i][j].draw(matrix[i][j]);
      }
    }
  }
  
  function draw() {
    clear();
    drawGrid();
    drawBalls();
    if (updateMove()) {
      if (check()) {
        matrix = copyArray(duplicate);
        check();
      }
    }
    //whoWon();
    if (!check() && played <= nPlayers + 1) {
      updatePlayer();
    }
  }
  
  function updatePlayer() {
    let k = 0;
    while (k < 50) {
      if (RemPlayers[(player + 1) % nPlayers] === 1) {
        player = (player + 1) % nPlayers;
        localStorage.setItem('gameData', encodeURIComponent(JSON.stringify({ players: nPlayers, played: played, player: player, grid: rows, matrix: matrix, RemPlayers: RemPlayers })));
        break;
      } else {
        player = (player + 1) % nPlayers;
      }
      k++;
    }
  }