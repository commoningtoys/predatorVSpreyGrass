class Agent {
	constructor(perc1, perc2, mH) {
		this.health = 0
		this.type = 0;
		this.health = 60;
		this.maxHealth = mH
		this.inc = 1;
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
}