let selectw = document.getElementById('gridSize');
let rows = parseInt(selectw.value),cols = parseInt(rows*0.6);
let size = (600-margin*2)/rows;
selectw.addEventListener("change", function() {
	rows = parseInt(selectw.value),cols = parseInt(rows*0.6);
	size = (600-margin*2)/rows;
	//setup();
});

// function setup(){
// 	var canvas = createCanvas(400, 600);
// 	canvas.class('canvas-class');
// 	canvas.elt.removeAttribute('style');
// 	canvas.parent("canvas-Container");
// 	background(0);
// 	drawGrid();
// }

// function drawGrid(){
// 	stroke(255,0,0);
// 	for(let i = 0;i<=cols;i++){
// 		line(margin+(i*size),margin,margin+(i*size),(margin+(size*rows)));
// 	}
// 	for(let i = 0;i<=rows;i++){
// 		line(margin,margin+(i*size),margin+(size*cols),margin+(i*size));
// 	}
// }