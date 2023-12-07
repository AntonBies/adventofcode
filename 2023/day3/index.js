const fs = require("fs");
const path = require("path");

class PartNumber {
    constructor(number, coordinates) {
        this.number = number;
        this.coordinates = coordinates;
        this.adjacentSymbols = [];
    }
}

class PartSymbol {
    constructor(symbol, i, j) {
        this.symbol = symbol;
        this.coordinate = `${i}-${j}`;
        this.adjacent = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(([di,dj]) => `${i+di}-${j+dj}`);
        this.adjacentNumbers = [];
    }
}

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n");

const rowLen = data[0].length;
const colLen = data.length;
const numbers = [];
const symbols = [];

for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
        const cur = data[i][j];
        if (cur.match(/[^\d.]/)) {
            symbols.push(new PartSymbol(cur, i, j));
            continue;
        }
        if (isNaN(cur)) continue;
        let n = cur;
        const c = [`${i}-${j}`];
        while (++j < colLen) {
            if (isNaN(data[i][j])) break;
            n += data[i][j];
            c.push(`${i}-${j}`)
        }
        --j;
        numbers.push(new PartNumber(n, c));
    }
}

const partone = numbers.reduce((acc, cur) => {
    const adjSymbols = symbols.filter(sym => {
        const coorSet = new Set(sym.adjacent.concat(cur.coordinates));
        const isAdjacent = coorSet.size < sym.adjacent.length + cur.coordinates.length;
        if (isAdjacent) {
            sym.adjacentNumbers.push(cur);
        }
        return isAdjacent;
    });

    for (const sym of adjSymbols) {
        cur.adjacentSymbols.push(sym);
    }

    return cur.adjacentSymbols.length ? acc + Number(cur.number) : acc;

}, 0);

const parttwo = symbols.reduce((acc, cur) => {
    return cur.symbol === '*' && cur.adjacentNumbers.length === 2 
        ? Number(cur.adjacentNumbers[0].number) * Number(cur.adjacentNumbers[1].number) + acc
        : acc;
}, 0);

console.log(partone);
console.log(parttwo);