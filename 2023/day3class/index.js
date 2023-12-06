const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n");

const getAdjecentCells = (([i,j]) => [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(([di,dj]) => `${i+di}-${j+dj}`));

const getNumbersAndSymbols = (input) => {
    const rowLen = input[0].length;
    const colLen = input.length;
    const numbers = [];
    const symbols = [];

    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            const cur = input[i][j];
            if (cur.match(/[^\d.]/)) {
                const adj = getAdjecentCells([i,j]);
                symbols.push({symbol: cur, coordinate: `${i}-${j}`, adjacent: adj});
                continue;
            }
            if (isNaN(cur)) continue;
            let n = cur;
            const c = [`${i}-${j}`];
            while (++j < colLen) {
                if (isNaN(input[i][j])) break;
                n += input[i][j];
                c.push(`${i}-${j}`)
            }
            --j;
            numbers.push({number: n, coordinates: c});
        }
    }
    return {numbers, symbols};
}

const {numbers, symbols } = getNumbersAndSymbols(data);
for (const num of numbers) {
    num["adjacentSymbols"] = [];
}
for (const sym of symbols) {
    sym["adjacentNumbers"] = [];
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