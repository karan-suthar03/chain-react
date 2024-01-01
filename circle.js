class Gola{
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.init = random();
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
        fill(Pcolors[p-1][0],Pcolors[p-1][1],Pcolors[p-1][2]);
        circle(random()*size/30+size/2+50+(this.i*size),random()*size/30+size/2+50+(this.j*size),size/2);
    }
    two(p){
        fill(Pcolors[p-1][0],Pcolors[p-1][1],Pcolors[p-1][2]);
        push();
        translate(size/2+50+(this.i*size), size/2+50+(this.j*size));
        rotate(this.init = this.init+0.05);
        circle(random()*size/20,random()*size/20,size/2);
        circle(random()*size/20,random()*size/20+size*4/15,size/2);
        pop();
    }
    three(p){
        fill(Pcolors[p-1][0],Pcolors[p-1][1],Pcolors[p-1][2]);
        push();
        translate(size/2+50+(this.i*size), size/2+50+(this.j*size));
        rotate(this.init = this.init+0.05);
        circle(random()*size/10,random()*size/10,size/2);
        circle(random()*size/10,random()*size/10+size*4/15,size/2);
        circle(random()*size/10+size*4/15,random()*size/10+size*3/15,size/2);
        pop();
    }
}
