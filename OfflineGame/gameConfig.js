let data = JSON.parse(decodeURIComponent(localStorage.getItem('gameData')));


let Pcolors = [[255,0,0],[0,0,255],[0,255,0],[255,255,255],[255, 125, 125]];
let nPlayers = parseInt(data.players);
let rows = parseInt(data.grid),cols = Math.floor(rows*0.6);
let margin = 10;
let size = (600-(margin*2))/rows;
let margin2 = (400-(size*cols))/2;
let matrix = data.matrix,dBalls = [],duplicate = [],moves = [];
let isPressed = false;
let player = parseInt(data.player);
let isok = false;
let isRun = false;
let played = parseInt(data.played);
let some = false;
let RemPlayers = data.RemPlayers;