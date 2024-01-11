var RoomD = JSON.parse(localStorage.getItem('roomD'));
if(RoomD.myId == -1){
    document.getElementById('joinMenu').classList.add('showIt');
}
var Room = RoomD.roomCode;
var RoomC = document.getElementById('roomCode');
RoomC.innerText = Room;
var Dcolor = 'Red';
var id;
function showColors(colors){
    var list = document.getElementById('listColors');
    list.innerHTML = "";
    if (!colors.includes('Red')) {
        list.innerHTML += `<button class='color' onclick="setcolor('Red');"><div class='circle Red'></div></button>`;
        Dcolor = 'Red';
    }
    if (!colors.includes('Blue')) {
        list.innerHTML += `<button class='color' onclick="setcolor('Blue');"><div class='circle Blue'></div></button>`;
        Dcolor = 'Blue';
    }
    if (!colors.includes('Green')) {
        list.innerHTML += `<button class='color' onclick="setcolor('Green');"><div class='circle Green'></div></button>`;
        Dcolor = 'Green';
    }
    if (!colors.includes('White')) {
        list.innerHTML += `<button class='color' onclick="setcolor('White');"><div class='circle White'></div></button>`;
        Dcolor = 'White';
    }
    if (!colors.includes('Pink')) {
        list.innerHTML += `<button class='color' onclick="setcolor('Pink');"><div class='circle Pink'></div></button>`;
        Dcolor = 'Pink';
    }
    var colorB = document.getElementById('now');
    colorB.classList = ['circle '+Dcolor];
}
function addPlayers(data) {
    let = parent = document.getElementById('players');
    let colors = [];
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    if(JSON.parse(localStorage.getItem('roomD')).myId != -1){
        if(data[JSON.parse(localStorage.getItem('roomD')).myId].isReady){
            let b = document.getElementById('ready1');
            b.classList = ['startB'+' disabled']
            b.innerText = 'waiting';
            b.disabled = true;
        }
    }
    id = data.length;
    let allReady = true;
    for (let i = 0; i < data.length; i++) {
        let cir = document.createElement('div');
        let name = document.createElement('div');
        let div = document.createElement('div');
        colors.push(data[i].color);
        cir.classList.add('colors');
        cir.classList.add(data[i].color);
        name.classList.add('playerN');
        div.classList.add('playerC');
        if(data[i].isReady){
            div.classList.add('readyyy');
        }else{
            allReady = false;
        }
        name.innerText = data[i].Id;
        div.appendChild(cir);
        div.appendChild(name);
        parent.appendChild(div);
        
    }
    if(allReady && data.length > 1){
        startGame();
    }
    showColors(colors);
}

var data = database.ref(Room);
var players;
data.child('player').on('value',(snapshot)=>{
    players = snapshot.val();
    addPlayers(players);
});


function setcolor(color){
    var colorB = document.getElementById('now');
    colorB.classList = ['circle '+color];
    Dcolor = color;
}

var NameIn = document.getElementById('name');
function filterInput() {
    NameIn = document.getElementById('name');
    NameIn.classList.remove('shake');
    NameIn.value = NameIn.value.replace(/\s/g, '');
}

function invalidName(){
    NameIn = document.getElementById('name');
    NameIn.classList.add('shake');
}

function JoinB(){
    NameIn = document.getElementById('name');
    if(NameIn.value == null || NameIn.value == '' || NameIn.value == undefined || NameIn.value.length < 2 || NameIn.value.length > 7){
        invalidName();
        return;
    }
    players.push({Id:NameIn.value,color:Dcolor,isReady:false})
    data.child('player').set(players).then(()=>{
        console.log(players.length-1)
        localStorage.setItem('roomD',JSON.stringify({roomCode:Room,myId:players.length-1,started:0}));
        document.getElementById('joinMenu').classList.remove('showIt')
    })
}

function ready(){
    players[JSON.parse(localStorage.getItem('roomD')).myId].isReady = true;
    data.child('player').set(players);
}

function startGame(){
    localStorage.setItem('roomD',JSON.stringify({roomCode:Room,myId:JSON.parse(localStorage.getItem('roomD')).myId,started:0}));
    var RemPlayers = []
    for(i = 0;i<parseInt(players.length);i++){
        RemPlayers[i] = 1;
    } 
    let matrix= [];
    for(i= 0;i<parseInt(selectw.value*0.6);i++){
      	matrix[i] = [];
      	for(j= 0;j<selectw.value;j++){
        	matrix[i][j] = {player:-1,balls:0};
      	}
    }
    data.child('game').set({player:0,played:0,RemPlayers:RemPlayers,grid:selectw.value,matrix:matrix}).then(()=>{
        data.child('start').set('start').then(()=>{
            window.location.href = 'Main/index.html';
        });
    })
}