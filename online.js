
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

const NameIn = document.getElementById('name');

function invalidName(){
    NameIn.classList.add('shake');
}
function filterInput() {
    NameIn.classList.remove('shake');
    NameIn.value = NameIn.value.replace(/\s/g, '');
}
function createGame(){
    if(NameIn.value == null || NameIn.value === '' || NameIn.value === undefined || NameIn.value.length < 2 || NameIn.value.length > 7){
        invalidName();
        return;
    }
    let room = generateCode();
    let DbRoom = database.ref(room);
    DbRoom.child('start').set(0);
    DbRoom.child('player').set([{Id:NameIn.value,color:Dcolor,isReady:false}]).then(()=>{
        localStorage.setItem('roomD',JSON.stringify({roomCode:room,myId:0,started:0}));
        window.location.href = 'OnlineGame/index.html';
    })
}


function joinRoom(){
    let roomcode = document.getElementById('roomCode');
    roomcode.classList.remove('shake');
    if(roomcode.value == null || roomcode.value === '' || roomcode.value === undefined){
        roomcode.classList.add('shake');
        return;
    }
    database.ref(roomcode.value).once('value').then((snapshot)=>{
        if(snapshot.exists()){
            if(snapshot.val().start === 0){
                localStorage.setItem('roomD',JSON.stringify({roomCode:roomcode.value,myId:-1,started:0}));
                window.location.href = 'OnlineGame/index.html';
            }else{
                roomcode.classList.add('shake');
            }
        }else{
            roomcode.classList.add('shake');
        }
    })
}

function startPreviousOnlineGame(B){
    B.classList.remove('shake');
    let roomD = JSON.parse(localStorage.getItem('roomD'));
    if(roomD === null){
        return;
    }
    let room = roomD.roomCode;
    database.ref(room).once('value').then((snapshot)=>{
        if(!snapshot.exists()){
            B.classList.add('shake');
            return;
        }
        if(snapshot.val().game.ended){
            B.classList.add('shake');
            return;
        }
        window.location.href = 'https://karan-suthar03.github.io/chain-react/OnlineGame/Main/index.html';
    });
}
