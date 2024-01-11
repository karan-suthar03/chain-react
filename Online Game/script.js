let selectw = document.getElementById('gridSize');
let rows = parseInt(selectw.value),cols = parseInt(rows*0.6);
let	margin = 10;
let	size = (600-margin*2)/rows;
let margin2 = (400-(size*cols))/2;
selectw.addEventListener("change", function() {
	rows = parseInt(selectw.value),cols = parseInt(rows*0.6);
	size = (600-margin*2)/rows;
	setup();
});

function setup(){
	var canvas = createCanvas(400, 600);
	canvas.class('Gcanvas');
	canvas.elt.removeAttribute('style');
	canvas.parent("CanvasContainer");
	background(0);
	drawGrid();
}

function drawGrid(){
	stroke(255,0,0);
	for(let i = 0;i<=cols;i++){
		line(margin2+(i*size),margin,margin2+(i*size),(margin+(size*rows)));
	}
	for(let i = 0;i<=rows;i++){
		line(margin2,margin+(i*size),margin2+(size*cols),margin+(i*size));
	}
}