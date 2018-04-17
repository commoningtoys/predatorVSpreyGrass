class Grass {
    constructor(_cols, _rows, pixSize) {
        this.cols = _cols;
        this.rows = _rows;
        this.ps = pixSize;
        this.grassAmount = 10;
        this.grass = []
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
                fill(0, 255, 0);
                rect(x * this.ps, y * this.ps, this.ps, this.ps);
             }
        }
    }

    setPixelSize(val){
        this.ps = val;
    }
}