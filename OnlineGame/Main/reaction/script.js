
function draw(){
    if(!start && !mat){
        return;
    }
    clear();
    drawGrid();
    drawBalls();
    if(updateMove()){
        if(isRun){
            matrix = copyArray(duplicate);
            check();
        }else{
            gameD.child('player').once("value").then((snapshot)=>{
                player = snapshot.val();
                current(player);
            });
            gameD.child('played').once("value").then((snapshot)=>{
                played = snapshot.val();
            });
        }
    }
    whoWon();
    if(!isRun && some){
        let k = 0;
        let x = player;
        while (k < 50) {
            if(RemPlayers[(x+1)%(nPlayers)] === 1){
                if(player === myID){
                    gameD.child('player').set((x+1)%(nPlayers));
                }
                break;
            }else{
                x = (x+1)%(nPlayers);
            }
            k++;
        }
        some = false;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
      window.history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', function(event) {
            window.history.pushState(null, null, window.location.href);
      });

      window.onbeforeunload = function() {
            return "Are you sure you want to leave this page?";
      };
});
