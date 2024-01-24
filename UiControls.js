document.body.addEventListener('click', function(event) {
    const onlineOP = document.getElementById('onlineOP');
    if(event.target.classList.contains('onlineB')){
        onlineOP.classList.toggle('showIt');
    }else{
        onlineOP.classList.remove('showIt');
    }
    if(event.target.classList.contains('CR')){
        document.getElementById('createMenu').classList.add('showIt');
    }
    if(event.target.classList.contains('createMenu')){
        if(document.getElementById('listColors').classList.contains('showIt')){
            document.getElementById('listColors').classList.remove('showIt')
        }else{
            document.getElementById('createMenu').classList.remove('showIt');
        }
    }
    if(event.target.classList.contains('color') || event.target.classList.contains('circle')){
        document.getElementById('listColors').classList.toggle('showIt');
    }

    if(event.target.classList.contains('JR')){
        document.getElementById('joinMenu').classList.add('showIt');
    }
    if(event.target.classList.contains('joinMenu')){
        document.getElementById('joinMenu').classList.remove('showIt');
    }
});

const gridSize = document.getElementById('gridSize');