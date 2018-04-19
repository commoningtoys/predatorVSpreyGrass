class Agent {
	constructor(perc1, perc2, mH) {
		this.health = 0
		this.type = 0;
		this.health = 60;
		this.maxHealth = mH
		this.inc = 1;
		this.trail = [];
		let prob = random(100);
		if (prob < perc1) {
			this.type = 0;
		} else {
			let prob2 = random(100);
			if (prob2 < perc2) {
				this.type = 1;
			}
			else this.type = 2;
		}
	}
	update(x, y, food) {
		if (this.type == 1) {
			if (!food.growing) {
				this.health += this.inc;
				food.consume(x, y, this.inc);
			}
		}
		if (this.type == 2) this.health -= this.inc;
		if (this.health > this.maxHealth) this.health = this.maxHealth;
	}
	/**
	 * this function adds points to the trail of each agent
	 * @param {Number} x position on x axis
	 * @param {Number} y position on y axis
	 */
	addTrailPoint(x, y){
		this.trail.push(createVector(x, y));
		if(this.trail.length > 3)this.trail.splice(0, 1);
	}
	showTrail(){
		noFill();
		stroke(255 * (this.type - 1))
		strokeWeight(2)
		beginShape();
		for(let p of this.trail){
			vertex(p.x, p.y)
		}
		endShape();
	}
}