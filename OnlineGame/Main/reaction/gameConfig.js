let Pcolors = [[255,0,0],[0,0,255],[0,255,0],[255,255,255],[255, 125, 125]];
let nPlayers;
let rows,cols;
let margin = 10;
let size;
let margin2;
let matrix,dBalls = [],duplicate = [],moves = [];
let isPressed = false;
let player;
let isok = false;
let isRun = false;
let played;
let some = false;
let RemPlayers;
let start = false;

const myID = JSON.parse(localStorage.getItem('roomD')).myId;
console.log(myID)
let mat = false;
game = database.ref(JSON.parse(localStorage.getItem('roomD')).roomCode);
game.once("value").then((snapshot)=>{
    let main = snapshot.val();
    for(let i = 0;i<main.player.length;i++){
        if(main.player[i].color === 'Pink'){
            Pcolors[i] = [255, 125, 125]
        }
        if(main.player[i].color === 'Red'){
            Pcolors[i] = [255, 0, 0]
        }
        if(main.player[i].color === 'Green'){
            Pcolors[i] = [0, 255, 0]
        }
        if(main.player[i].color === 'Blue'){
            Pcolors[i] = [0, 0, 255]
        }
        if(main.player[i].color === 'White'){
            Pcolors[i] = [255, 255, 255]
        }
    }
    showPLayers(main.player,myID);
    initiateChat(main.player,JSON.parse(localStorage.getItem('roomD')).roomCode);
    let data = main.game;
    nPlayers = parseInt(main.player.length);
    rows = parseInt(data.grid),cols = parseInt(rows*0.6);
    size = (600-(margin*2))/rows;
    margin2 = (400-(size*cols))/2;
    matrix = data.matrix;
    player = parseInt(data.player);
    played = parseInt(data.played);
    RemPlayers = data.RemPlayers
    for(let i = 0;i<cols;i++){
        dBalls[i] = [];
        for(j = 0;j<rows;j++){
            dBalls[i][j] = new Gola(i,j);
        }
    }
    check();
    start = true;
})

function setup(){
    var canvas = createCanvas(400, 600);
    canvas.class('Gcanvas');
    canvas.elt.removeAttribute('style');
    canvas.parent("CanvasContainer");
}
gameD = game.child('game')
gameD.child('RemPlayers').on('value',(snapshot)=>{
    if(player !== myID){
        RemPlayers = snapshot.val();
    }
})
gameD.child('matrix').on('value',(snapshot)=>{
    if(player !== myID){
        matrix = snapshot.val();
        check();
    }
});