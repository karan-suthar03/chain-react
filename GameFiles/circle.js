class Gola{
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.init = random()*3.14;
    }
    draw(p){
        if(p.balls === 1) {
            fill(Pcolors[p.player][0],Pcolors[p.player][1],Pcolors[p.player][2]);
            circle(size/30+size/2+margin2+(this.i*size),size/30+size/2+margin+(this.j*size),size/2);
        }else if(p.balls !== 0){
            let ang = 3.14*2/p.balls;
            fill(Pcolors[p.player][0],Pcolors[p.player][1],Pcolors[p.player][2]);
            push();
            translate(size/2+margin2+(this.i*size), size/2+margin+(this.j*size));
            rotate(this.init = this.init+0.02*deltaTime/16);
            for(let i = 0;i<p.balls;i++){
                rotate(ang);
                circle(0,size/2/3,size/2);
            }
            pop();
        }
    }
}
