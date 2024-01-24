const backMat = document.getElementById("backMat")
function current(P){
    switch (P){
        case 0:
            backMat.classList = ["backMat " + "zero"];
            break;
        case 1:
            backMat.classList = ["backMat " + "one"];
            break;
        case 2:
            backMat.classList = ["backMat " + "two"];
            break;
        case 3:
            backMat.classList = ["backMat " + "three"];
            break;
        case 4:
            backMat.classList = ["backMat " + "four"];
            break;
        case 5:
            backMat.classList = ["backMat " + "five"];
            break;
    }
}
function showPLayers(data,mine){
    let chatT = document.getElementById("chatT")
    chatT.innerHTML = data[mine].Id;
    let chatC = document.getElementById("chatC");
    chatC.classList = ["colorC " + data[mine].color]
    let parent = document.getElementById('playersC');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    for (let i = 0; i < data.length; i++) {
        let cir = document.createElement('div');
        let name = document.createElement('div');
        let div = document.createElement('div');
        cir.classList.add('colors');
        cir.classList.add(data[i].color);
        name.classList.add('playerN');
        div.classList.add('playerC');
        name.innerText = data[i].Id;
        div.appendChild(cir);
        div.appendChild(name);
        parent.appendChild(div);
    }
}

