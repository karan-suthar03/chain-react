let button = document.getElementById('StartButton');
button.addEventListener('click',()=>{
    startGame();
});
let NumOfPlayers = document.getElementById('players');
function startGame(){
  	let matrix= [];
    for(i= 0;i<parseInt(selectw.value*0.6);i++){
      	matrix[i] = [];
      	for(j= 0;j<selectw.value;j++){
        	matrix[i][j] = {player:-1,balls:0};
      	}
    }
    RemPlayers = [];
    for(i = 0;i<parseInt(NumOfPlayers.value);i++){
      	RemPlayers[i] = 1;
    }
    setData({player:0,played:0,players:NumOfPlayers.value,grid:selectw.value,matrix:matrix,RemPlayers:RemPlayers});
}

function setData(value) {
    game.set(value).then(window.location.href = 'actual game/index.html');
}



let Dcolor = 'Red';
let colorB = document.getElementById('colorB');
function generateCode() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result.toUpperCase();
}
function setcolor(color) {
    Dcolor = color;
    colorB.classList = ['color '+color];
}
var NameIn = document.getElementById('name');
function invalidName(){
    NameIn.classList.add('shake');
}
function filterInput() {
    NameIn.classList.remove('shake');
    NameIn.value = NameIn.value.replace(/\s/g, '');
}
function createGame(){
    if(NameIn.value == null || NameIn.value == '' || NameIn.value == undefined || NameIn.value.length < 2 || NameIn.value.length > 7){
        invalidName();
        return;
    }
    room = generateCode();
    DbRoom = database.ref(room);
    DbRoom.child('start').set(0);
    DbRoom.child('player').set([{Id:NameIn.value,color:Dcolor,isReady:false}]).then(()=>{
        localStorage.setItem('roomD',JSON.stringify({roomCode:room,myId:0,started:0}));
        window.location.href = 'Online Game/Lobby.html';
    })
}


function joinRoom(){
    let roomcode = document.getElementById('roomCode');
    roomcode.classList.remove('shake');
    if(roomcode.value == null || roomcode.value == '' || roomcode.value == undefined){
        roomcode.classList.add('shake');
        return;
    }
    database.ref(roomcode.value).once('value').then((snapshot)=>{
        if(snapshot.exists()){
            if(snapshot.val().start == 0){
                localStorage.setItem('roomD',JSON.stringify({roomCode:roomcode.value,myId:-1,started:0}));
                window.location.href = 'Online Game/Lobby.html';
            }else{
                roomcode.classList.add('shake');
            }
        }else{
            roomcode.classList.add('shake');
        }
    })
}