const fs = require("fs");
const path = require("path");
const { urlToHttpOptions } = require("url");

class Pattern {
    constructor(arr) {
        this.pattern = arr;
        this.transposedPattern = this.transpose(this.pattern);
        this.dir1 = null;
        this.num1 = null;
        this.dir2 = null;
        this.num2 = null;
    }

    transpose() {
        return this.pattern[0].map((_, x) => this.pattern.map(row => row[x]));
    }

    findReflection(pattern, amount) {
        for (let row = 1; row < pattern.length; row++) {
            let y = row;
            let prev = y - 1;
            let counter = 0;
            while (prev > -1 && y < pattern.length) {
                for (let x = 0; x < pattern[y].length; x++) {
                    if (pattern[y][x] !== pattern[prev][x]) counter++;
                }
                if (counter > amount) break;
                prev--, y++;
            }
            if (counter === amount) return row;
        }
        return 0;
    }

    getReflection(amount) {
        const hIndex = this.findReflection(this.pattern, amount);
        const vIndex = this.findReflection(this.transposedPattern, amount);
        if (amount === 0) {
            this.num1 = Math.max(hIndex, vIndex);
            this.dir1 = hIndex ? 100 : 1;
        } else {
            this.num2 = Math.max(hIndex, vIndex);
            this.dir2 = hIndex ? 100 : 1;
        }
        return this;    
    }
}

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .map((pattern) => new Pattern(pattern.split("\n").map(row => row.split(""))))
    .map(pattern => {
        pattern.getReflection(0);
        return pattern.getReflection(1);
    });

const summary = data.reduce((acc, cur) => acc + cur.dir1 * cur.num1, 0);
const sumCleaned = data.reduce((acc, cur) => acc + cur.dir2 * cur.num2, 0);
console.log(summary);
console.log(sumCleaned);