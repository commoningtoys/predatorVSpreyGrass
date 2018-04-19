class Grass {
    constructor(_cols, _rows, pixSize, grassAmount) {
        this.cols = _cols;
        this.rows = _rows;
        this.ps = pixSize;
        this.grassAmount = grassAmount;
        this.growingRate = 1;
        this.grass = [];
        this.growing = false;
        this.totalGrassAmount = this.grassAmount * this.cols * this.rows;
        this.currentGrassAmount = 0;
        //2D array filled with Agents
        for (let x = 0; x < this.cols; x++) {
            let temp = [];
            for (let y = 0; y < this.rows; y++) {
                temp[y] = this.grassAmount;
            }
            this.grass[x] = temp;
        }
    }
    show() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                noStroke();
                // let alpha = this.grassAmount < 1 ? 0 : 255;
                let alpha = map(this.grass[x][y], 0, this.grassAmount, 0, 255);
                fill(0, 255, 0, alpha);
                rect(x * this.ps, y * this.ps, this.ps, this.ps);
            }
        }
    }
    update() {
        this.currentGrassAmount = 0
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.grass[x][y] < 1) this.growing = true;
                if (this.growing) {
                    this.grass[x][y] += this.growingRate;
                    if(this.grass[x][y] >= this.grassAmount)this.growing = false;
                }
                this.currentGrassAmount += this.grass[x][y];
            }
        }
    }
    grassAmountPercentage(){
        return (this.currentGrassAmount / this.totalGrassAmount) * 100;
    }
    consume(x, y, eatenAmount) {
        this.grass[x][y] -= eatenAmount;
    }
    setPixelSize(val) {
        this.ps = val;
    }
}