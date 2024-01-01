class MoveUp{
    constructor(i,j,p){
        this.position = [size/2+50+(i*size),size/2+50+(j*size)]
        this.j = j;
        this.p = p;
    }
    update(){
        if(size/2+50+(this.j*size) - this.position[1] > size){
            return true;
        }else{
            this.position[1]-= size/25;
            return false;
        }
    }
    show(){
        fill(Pcolors[this.p-1][0],Pcolors[this.p-1][1],Pcolors[this.p-1][2]);
        circle(this.position[0],this.position[1],size/2);
    }
}
class MoveDown{
    constructor(i,j,p){
        this.position = [size/2+50+(i*size),size/2+50+(j*size)]
        this.j = j;
        this.p = p;
    }
    update(){
        if(size/2+50+(this.j*size) - this.position[1] < -size){
            return true;
        }else{
            this.position[1] += size/25;
            return false;
        }
    }
    show(){
        fill(Pcolors[this.p-1][0],Pcolors[this.p-1][1],Pcolors[this.p-1][2]);        
        circle(this.position[0],this.position[1],size/2);
    }
}
class MoveLeft{
    constructor(i,j,p){
        this.position = [size/2+50+(i*size),size/2+50+(j*size)]
        this.i = i;
        this.p = p;
    }
    update(){
        if(size/2+50+(this.i*size) - this.position[0] > size){
            return true;
        }else{
            this.position[0] -= size/25;
            return false;
        }
    }
    show(){
        fill(Pcolors[this.p-1][0],Pcolors[this.p-1][1],Pcolors[this.p-1][2]);
        circle(this.position[0],this.position[1],size/2);
    }
}
class MoveRight{
    constructor(i,j,p){
        this.position = [size/2+50+(i*size),size/2+50+(j*size)]
        this.i = i;
        this.p = p;
    }
    update(){
        if(size/2+50+(this.i*size) - this.position[0] < -size){
            return true;
        }else{
            this.position[0]+= size/25;
            return false;
        }
    }
    show(){
        fill(Pcolors[this.p-1][0],Pcolors[this.p-1][1],Pcolors[this.p-1][2]);
        circle(this.position[0],this.position[1],size/2);
    }
}