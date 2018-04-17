const CELL = 80;
let am = null, w, h, agentSize = 10, play = false, showMenu = false, resizeBox, speed = 1;
let cnv;
function setup() {
	w = floor(windowHeight / CELL) * CELL;
	agentSize = w / CELL;
	cnv = createCanvas(w, w);
	cnv.parent('p5Sketch');
	pixelDensity(1);
	noStroke();
	initModel();
}

function draw() {
		if (speed >= 50) {
			let loop = abs(50 - speed);
			if(loop == 0)loop = 1;
			for (let i = 0; i < loop; i++) {
				am.update();
			}
		} else {

			let timer = floor(map(speed, 0, 49, 10, 1));
			// console.log(timer);
			if (frameCount % timer == 0) {
				am.update();
			}
		}
		am.show();
		am.infographic();

		// document.getElementById('frameRate').innerHTML = frameRate();
}

function mousePressed() {
	if (play) am.addAgent(mouseX, mouseY, mouseButton);
}


function windowResized(){
	w = floor(windowHeight / CELL) * CELL;
	agentSize = w / CELL;
	am.setPixSize(agentSize);
	resizeCanvas(w, w);
}

function initModel() {
	let input1 = document.getElementById("threshold").value;
	let input2 = document.getElementById("maxHealth").value;
	let input3 = document.getElementById("empty").value;
	let input4 = document.getElementById("prey").value;
	am = new AgentModel(agentSize, input1, input3, input4, input2);
}
function updateValue() {
	document.getElementById("thehreshold").innerHTML = "THRESHOLD: " + document.getElementById("threshold").value;
	document.getElementById("themaxHealth").innerHTML = "MAX HEALTH: " + document.getElementById("maxHealth").value;
	document.getElementById("theempty").innerHTML = "EMPTY: " + document.getElementById("empty").value + "%";
	document.getElementById("theprey").innerHTML = "PREY: " + document.getElementById("prey").value + " %";
	let docSpeed = parseFloat(document.getElementById("speed").value);
	document.getElementById("thespeed").innerHTML = "SPEED: " + docSpeed + " %";
	// speed = floor(map(docSpeed, 1, 100, 10, 1));
	speed = docSpeed;

}

function showDescription() {
	showMenu = !showMenu;
	document.getElementById("howButton").innerHTML = showMenu == true ? "HIDE DESCRIPTION" : "HOW IT WORKS";
	let myDesc = document.getElementById("description");
	let left = 200, gutter = 20;
	myDesc.style.top = gutter + "px";
	myDesc.style.left = left + "px";
	myDesc.style.width = (w - left - gutter) + "px";
	myDesc.style.height = (w - 2 * gutter) + "px";
	let txt = document.getElementsByClassName("textElement");
	for (let i = 0; i < txt.length; i++) {
		txt[i].style.display = showMenu == true ? "block" : "none";
	}
}
// function checkWindow() {
// 	let thisW = window.innerWidth;
// 	let gutter = 30;
// 	if (thisW > w - gutter && thisW < w + gutter) {
// 		play = true;
// 	} else play = false;
// }
















