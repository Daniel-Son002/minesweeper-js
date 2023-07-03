function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;

    this.bomb = false;


    this.revealed = false;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w)

    if (this.revealed) {
        if (this.bomb) {
            fill(120);
            circle(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6)
            }
        }
    }
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function() {
    this.revealed = true;

    if (this.neighborCount == 0) {
        this.floodFill();
    }
}

Cell.prototype.floodFill = function() {
    for (var x_off = -1; x_off <= 1; x_off++) {
        for (var y_off = -1; y_off <= 1; y_off++) {
            var i = this.i + x_off;
            var j = this.j + y_off;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (!neighbor.bomb && !neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}

Cell.prototype.countBombs = function() {
    if (this.bomb) {
        this.neighborCount = -1;
        return;
    }

    var total = 0;

    for (var x_off = -1; x_off <= 1; x_off++) {
        for (var y_off = -1; y_off <= 1; y_off++) {
            var i = this.i + x_off;
            var j = this.j + y_off;

            if (i > -1 && i < cols && j > -1 && j < rows) {

                var neighbor = grid[i][j];

                if (neighbor.bomb) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}