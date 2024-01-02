let data = JSON.parse(decodeURIComponent(localStorage.getItem('gameData')));


let Pcolors = [[255,0,0],[0,0,255],[0,255,0],[2555,255,255],[125,125,125]];
let nPlayers = parseInt(data.players);
let rows = parseInt(data.grid),cols = parseInt(rows*0.6);
let size = 500/rows;
let matrix = data.matrix,dBalls = [],duplicate = [],moves = [];
let isPressed = false;
let player = parseInt(data.player);
let isok = false;
let isRun = false;
let played = parseInt(data.played);
let some = false;
let RemPlayers = data.RemPlayers;