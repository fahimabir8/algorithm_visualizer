
var cols,rows;
var w = 20;
var grid = [];

var current;
var stack = []; 

function setup() {
    createCanvas(400,400);
    cols = floor(width/w);
    rows = floor(height/w);
    // frameRate(5);

    for (var i = 0; i < rows; i++){
        for (var j = 0; j < cols; j++){
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    } 

    current = grid[0];



}

function draw() {
    background(51);
    for (var i = 0; i < grid.length; i ++){
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    //Step 1                   
    var next = current.checkNeighbours();
    if (next){
        
        next.visited = true;

        //step 2
        stack.push(current);

        //step 3
        removeWalls(current, next);


        //step 4
        current = next;

    }
    else if (stack.length > 0) {
        current = stack.pop();
     

    }


}

function index (i,j) {
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) {
        return -1;
    }
    return i + j * cols;
}

function Cell(j,i) {
    this.i = i;
    this.j = j;
    this.walls = [true,true,true,true];
    this.visited = false;

    this.checkNeighbours = function() {
        var neighbours  = [];
        
        var top = grid [index(i-1, j)];
        var right = grid[ index(i, j+1)];
        var bottom = grid[index(i+1, j)];
        var left = grid[ index(i, j-1)]
        

        if (top && !top.visited) {
            neighbours.push(top);
        }
        if (right && !right.visited) {
            neighbours.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && !left.visited) {
            neighbours.push(left);
        }

        if (neighbours.length > 0){
            var r  = floor ( random(0 , neighbours.length));
            return neighbours[r];
        }
        else { 
            return undefined;
        }

    }

    this.highlight = function() {
        var x = this.j * w; 
        var y = this.i * w;

        noStroke();
        fill(0,0,255,100);
        rect(x, y, w, w);
    }

    this.show = function() {
        var x = this.j*w; 
        var y = this.i*w;

        stroke(225);
        if (this.walls[0]){
            line(x,   y,     x+w,   y);    //top 
        }
        if (this.walls[1]){

            line(x+w, y,     x+w,  y+w);// right
        }
        if (this.walls[2]){

            line(x+w, y+w,    x,   y+w);// bottom
        }
        if (this.walls[3]){

            line(x,   y+w,    x,    y);    // left
        }

        if (this.visited){
            noStroke();
            fill(255,0,255,100);
            rect(x, y, w, w);
        }
    }
}






function removeWalls(a, b) {
   
    var x = a.j - b.j;
    if (x === 1) {
        a.walls[3] = false; // left wall of a
        b.walls[1] = false; // right wall of b
    } else if (x === -1) {
        a.walls[1] = false; // right wall of a
        b.walls[3] = false; // left wall of b
    }

    var y = a.i - b.i;
    if (y === 1) {
        a.walls[0] = false; // top wall of a
        b.walls[2] = false; // bottom wall of b
    } else if (y === -1) {
        a.walls[2] = false; // bottom wall of a
        b.walls[0] = false; // top wall of b
    }
} 