class Move {
    constructor(i, j, p, direction) {
        this.position = [size/2 + margin2 + (i * size), size/2 + margin + (j * size)];
        this.i = i;
        this.j = j;
        this.p = p;
        this.direction = direction;
    }

    update() {
        switch (this.direction) {
            case 'up':
                return this.moveUp();
            case 'down':
                return this.moveDown();
            case 'left':
                return this.moveLeft();
            case 'right':
                return this.moveRight();
        }
    }

    moveUp() {
        if (size/2 + margin + (this.j * size) - this.position[1] > size) {
            return true;
        } else {
            this.position[1] -= size/25;
            return false;
        }
    }

    moveDown() {
        if (size/2 + margin + (this.j * size) - this.position[1] < -size) {
            return true;
        } else {
            this.position[1] += size/25;
            return false;
        }
    }

    moveLeft() {
        if (size/2 + margin2 + (this.i * size) - this.position[0] > size) {
            return true;
        } else {
            this.position[0] -= size/25;
            return false;
        }
    }

    moveRight() {
        if (size/2 + margin2 + (this.i * size) - this.position[0] < -size) {
            return true;
        } else {
            this.position[0] += size/25;
            return false;
        }
    }

    show() {
        fill(Pcolors[this.p][0], Pcolors[this.p][1], Pcolors[this.p][2]);
        circle(this.position[0], this.position[1], size/2);
    }
}
