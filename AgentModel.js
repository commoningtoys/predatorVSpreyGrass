/**
 -For prey:
 -Tries to move in a random direction.
 -Health increases.
 -When health reaches a threshold:
 -They will reproduce, creating a new "Prey"
 -Their health resets to 1
 
 -For predator:
 -Tries to move in a random direction.
 -Health decreases.
 -When health reaches 0, they die and turn into "Nothing".
 -If the adjacent square is a prey:
 -They will eat it, turning it into a "predator" (reproducing)
 -Their health will increase by the amount of health the eaten prey had
 */

//for the infogrphic we need to keep track of the amount of different agents
let preyCount;
let predatorCount;
let prey = [];
let predator = [];
let grassAmount = [];
let total = 0;
/** class AgentModel
* @param {int} pixSize - sets the size of the agent
* @param {int} t - sets the threshold of the prey
* @param {int} percN - percentage of the "Nothing" Agents
* @param {int} percPrey - percentage of the "Prey" Agents
* @param {int} MaxH - sets the maximum health of the agents
*/
class AgentModel {
	constructor(pixSize, t, percEmpty, percPrey, MaxH) {
		/**
		* colors of the agents
		* white = nothing
		* cyan = prey
		* magenta = predator
		*/
		this.colors = [color(255, 0), color(0, 255, 255), color(255, 0, 255)];
		this.threshold = t;
		this.ps = pixSize;
		this.agents = [];
		this.direction = [createVector(0, 1), createVector(1, 0), createVector(0, -1), createVector(-1, 0)];
		// console.log(direction[floor(random(3))].x);
		this.rows = floor(height / pixSize);
		this.cols = floor(width / pixSize);
		total = this.rows * this.cols;
		//2D array filled with Agents
		for (let x = 0; x < this.cols; x++) {
			let temp = [];
			for (let y = 0; y < this.rows; y++) {
				temp[y] = new Agent(percEmpty, percPrey, MaxH);
			}
			this.agents[x] = temp;
		}
		this.grass = new Grass(this.cols, this.rows, this.ps, 10);
		prey = [];
		predator = [];
		grassAmount = [];
	}
	/**
	 * sets the size of the pixel
	 * @param {Number} val radius of the new pixel
	 */
	setPixSize(val) {
		this.ps = val;
		this.grass.setPixelSize(val);
	}
	/**
	* this function updates the model 
	*/
	update() {
		//every time this function is called we reset the predator/prey counters
		preyCount = predatorCount = 0;
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				//update every single Agent
				this.agents[x][y].update(x, y, this.grass);
				//kill all the predator with health lower than 1
				if (this.agents[x][y].health < 1) this.agents[x][y].type = 0;
				//move the Agents that are not "Nothing"
				if (this.agents[x][y].type > 0) this.move(x, y);
				//collect data for the infographic
				if (this.agents[x][y].type == 1) preyCount++;
				if (this.agents[x][y].type == 2) predatorCount++;
			}
		}
		this.grass.update();
		//push the data into arrays
		prey.push((preyCount / total) * 100);
		predator.push((predatorCount / total) * 100);
		grassAmount.push(this.grass.grassAmountPercentage());
		//if array bigger than tot unit erase the first entry
		if (prey.length > 1000) {
			prey.splice(0, 1);
			predator.splice(0, 1);
			grassAmount.splice(0, 1);
		}
	}
	/**
	 * function move
	* genarates a random number between 0 and 3 and this defines
	* in which direction the agent moves
	* @param {int} x - x position
	* @param {int} y - y position
	*/
	move(x, y) {
		let dir = random(this.direction);
		// wrap around with modulo
		let posX = (x + dir.x + this.cols) % this.cols;
		let posY = (y + dir.y + this.rows) % this.rows;
		//if the neighbour cell is "Nothing" the agent can move
		if (this.agents[posX][posY].type == 0) {
			// swap the cells nothing and agent
			let temp = this.agents[x][y].type;//we store the Agent in a temporary variable
			this.agents[x][y].type = this.agents[posX][posY].type;//and here we swap
			this.agents[posX][posY].type = temp;
			// add the new position to the trail
			// this.agents[x][y].addTrailPoint((posX * this.ps) + this.ps/2, (posY * this.ps) + this.ps/2);	
			//reproduction: if the agent is a prey and its healty than reproduce
			if (this.agents[posX][posY].type == 1 && this.agents[posX][posY].health > this.threshold) {
				this.agents[x][y].type = 1;
				this.agents[x][y].health = 1;
				this.agents[posX][posY].health = 1;
			}
			return;
		}
		//if neighbour Agent is a predator
		//the Predator eats the prey and reproduces himself and gets the health of the prey
		if (this.agents[posX][posY].type == 2 && this.agents[x][y].type == 1) {
			let h = this.agents[x][y].health;
			this.agents[x][y].type = 2;
			this.agents[posX][posY].type = 2;
			this.agents[posX][posY].health += h;
		}
	}
	/**function show
	* shows tha agents as square / pixel 
	*/
	show() {
		this.grass.show();
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				noStroke();
				let nx = x * this.ps;
				let ny = y * this.ps;
				let c = this.colors[this.agents[x][y].type];
				fill(c);
				rect(x * this.ps, y * this.ps, this.ps, this.ps);
				// this.agents[x][y].showTrail();
			}
		}
	}
	/**
	* this function draws an infographic dispaying every moment the number of 
	* different agents drawn to the screen
	*/
	infographic() {
		let top = 500, infoH = -200, left = 10, gutter = 7;
		//first we draw a transparent background
		strokeWeight(3);
		stroke(0);
		fill(255, 200);
		rect(left - gutter, top + gutter, 50 * 3 + gutter * 2, infoH - gutter * 2);
		showData(prey, this.colors[1]);
		showData(predator, this.colors[2]);
		showData(grassAmount, color(0, 255, 0));
		phaseSpace(prey, predator);
		/**function showData
		* gets an array and a color as input and returns a small infographic
		* @param {Array} arr - an Array of values
		* @param {color} col - color to be drawn in the infographic
		*/
		function showData(arr, col) {
			noFill();
			stroke(col);
			strokeWeight(6);
			//we draw the data as a continuous line
			//with begin/endShape()
			beginShape();
			for (let i = 0; i < arr.length; i++) {
				let val = map(arr[i], 0, 100, 0, infoH);
				vertex(left + i, top + val);
			}
			endShape();
		}

		function phaseSpace(arr1, arr2) {
			noFill();
			stroke(0);
			strokeWeight(1);
			beginShape();
			let w = width / 4;
			let h = height / 4;
			for (let i = 0; i < arr1.length; i++) {
				let x = map(arr1[i], 0, 100, -w, w);
				let y = map(arr2[i], 0, 100, -h, h);
				curveVertex(width / 2 + x, height / 2 + y);
			}
			endShape();
		}
	}
	/**function addAgent
	* adds Agents into an area of 5 * 5
	* @param {int} x - x position
	* @param {int} y - y position
	* @param {int} value - gets the mouseButton value to check if it is RIGHT or LEFT button
	*/
	addAgent(x, y, value) {
		let a = 5;//area
		//scale x and y to the agents coordinates
		x = floor(x / this.ps);
		y = floor(y / this.ps);
		//and constrain the values to avoid NaN values
		x = constrain(x, a, this.cols - a);
		y = constrain(y, a, this.rows - a);
		for (let yy = -a; yy < a; yy++) {
			for (let xx = -a; xx < a; xx++) {
				this.agents[x + xx][y + yy].type = value == LEFT ? 2 : 1;//check if it is RIGTH OR LEFT button
				this.agents[x + xx][y + yy].health = 100;
			}
		}
	}

}