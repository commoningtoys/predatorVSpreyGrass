const CELL = 80;
let am = null, w, h, agentSize = 10, play = false, showMenu = false, resizeBox, speed = 50;
let cnv;
let osc;
let oscPrey;
let oscPredator;
function setup() {
	w = floor(minimum() / CELL) * CELL;
	agentSize = w / CELL;
	cnv = createCanvas(w, innerHeight);
	cnv.parent('p5Sketch');
	pixelDensity(1);
	noStroke();
	initModel();
	///////////
	// sound //
	///////////
	// osc = new p5.SinOsc(240);
	// oscPredator = new p5.SinOsc(240);
	// oscPrey = new p5.SinOsc(240);
	// osc.amp(0);
	// osc.start();
	// oscPredator.start();
	// oscPrey.start();
}

function draw() {
	background(255)
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
		// let freqPred = map(predator[predator.length -1], 0, 100, 0, 440);
		// let freqPrey = map(prey[prey.length -1], 0, 100, 0, 440);
		// osc.freq(oscPredator);
		// document.getElementById('frameRate').innerHTML = frameRate();
}

function mousePressed() {
	if (play) am.addAgent(mouseX, mouseY, mouseButton);
}

/**
 * 
 * @returns the minimum between width and height of the contained div
 */
function minimum(){
	let cnvDiv = document.getElementById('p5Sketch');

	let w = cnvDiv.offsetWidth;
	let h = cnvDiv.offsetHeight;
	console.log(w, h);
	if(w < h) return w;
	else return h;
}

function windowResized(){
	w = floor(minimum() / CELL) * CELL;
	// agentSize = w / CELL;
	// am.setPixSize(agentSize);
	resizeCanvas(w, innerHeight);
}

function initModel() {
	let threshold = document.getElementById("threshold").value;
	let maxHealth = document.getElementById("maxHealth").value;
	let empty = document.getElementById("empty").value;
	let prey = document.getElementById("prey").value;
	am = new AgentModel(threshold, empty, prey, maxHealth);
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
















