const RoomD = JSON.parse(localStorage.getItem('roomD'));
if (RoomD.started === 1) {
    window.location.href = "Main/index.html";
}

if (RoomD.myId === -1) {
    document.getElementById('joinMenu').classList.add('showIt');
}

const Room = RoomD.roomCode;
const RoomC = document.getElementById('roomCode');
RoomC.innerText = Room;
let Dcolor = 'Red';
let id;

function showColors(colors) {
    const list = document.getElementById('listColors');
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
    const colorB = document.getElementById('now');
    colorB.classList = ['circle ' + Dcolor];
}

function addPlayers(data) {
    let parent = document.getElementById('players');
    let colors = [];
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    if (JSON.parse(localStorage.getItem('roomD')).myId !== -1) {
        if (data[JSON.parse(localStorage.getItem('roomD')).myId].isReady) {
            let b = document.getElementById('ready1');
            b.classList = ['startB' + ' disabled']
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
        if (data[i].isReady) {
            div.classList.add('readyyy');
        } else {
            allReady = false;
        }
        name.innerText = data[i].Id;
        div.appendChild(cir);
        div.appendChild(name);
        parent.appendChild(div);
    }
    if (allReady && data.length > 1) {
        startGame();
    }
    showColors(colors);
}

const data = database.ref(Room);
let players;
data.child('player').on('value', (snapshot) => {
    data.child('start').once('value', (snapshot1) => {
        if (snapshot1.val() === 1) {
            localStorage.setItem('roomD', JSON.stringify({ ...RoomD, started: 1 }));
            window.location.href = "Main/index.html";
        } else {
            players = snapshot.val();
            addPlayers(players);
        }
    });
});

function setcolor(color) {
    const colorB = document.getElementById('now');
    colorB.classList = ['circle ' + color];
    Dcolor = color;
}

let NameIn = document.getElementById('name');

function filterInput() {
    NameIn = document.getElementById('name');
    NameIn.classList.remove('shake');
    NameIn.value = NameIn.value.replace(/\s/g, '');
}

function invalidName() {
    NameIn = document.getElementById('name');
    NameIn.classList.add('shake');
}

function JoinB() {
    NameIn = document.getElementById('name');
    if (NameIn.value == null || NameIn.value === '' || NameIn.value === undefined || NameIn.value.length < 2 || NameIn.value.length > 7) {
        invalidName();
        return;
    }
    players.push({ Id: NameIn.value, color: Dcolor, isReady: false })
    data.child('player').set(players).then(() => {
        console.log(players.length - 1)
        localStorage.setItem('roomD', JSON.stringify({ roomCode: Room, myId: players.length - 1, started: 0 }));
        document.getElementById('joinMenu').classList.remove('showIt')
    })
}

function ready() {
    players[JSON.parse(localStorage.getItem('roomD')).myId].isReady = true;
    data.child('player').set(players);
}

function startGame() {
    localStorage.setItem('roomD', JSON.stringify({ roomCode: Room, myId: JSON.parse(localStorage.getItem('roomD')).myId, started: 1 }));
    const RemPlayers = [];
    for (let i = 0; i < parseInt(players.length); i++) {
        RemPlayers[i] = 1;
    }
    let matrix = [];
    for (let i = 0; i < Math.floor(gridSize.value * 0.6); i++) {
        matrix[i] = [];
        for (let j = 0; j < gridSize.value; j++) {
            matrix[i][j] = { player: -1, balls: 0 };
        }
    }
    data.child('game').set({ player: 0, played: 0, RemPlayers: RemPlayers, grid: gridSize.value, matrix: matrix, ended: false }).then(() => {
        data.child('start').set(1).then(() => {
            window.location.href = 'Main/index.html';
        });
    })
}
