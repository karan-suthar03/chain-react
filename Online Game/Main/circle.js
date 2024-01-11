class Gola{
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.init = random()*3.14;
    }
    draw(p){
        if(p.balls == 1){
            this.one(p.player);
        }
        if(p.balls == 2){
            this.two(p.player);
        }
        if(p.balls == 3){
            this.three(p.player);
        }
    }
    one(p){
        fill(Pcolors[p][0],Pcolors[p][1],Pcolors[p][2]);
        circle(size/30+size/2+margin2+(this.i*size),size/30+size/2+margin+(this.j*size),size/2);
    }
    two(p){
        fill(Pcolors[p][0],Pcolors[p][1],Pcolors[p][2]);
        push();
        translate(size/2+margin2+(this.i*size), size/2+margin+(this.j*size));
        rotate(this.init = this.init+0.05);
        circle(size/30,size/30,size/2);
        circle(size/20,size/20+size*4/15,size/2);
        pop();
    }
    three(p){
        fill(Pcolors[p][0],Pcolors[p][1],Pcolors[p][2]);
        push();
        translate(size/2+margin2+(this.i*size), size/2+margin+(this.j*size));
        rotate(this.init = this.init+0.05);
        circle(size/15,size/15,size/2);
        circle(size/15,size/15+size*4/15,size/2);
        circle(size/15+size*4/15,size/15+size*3/15,size/2);
        pop();
    }
}