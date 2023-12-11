const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(row => row.split(""));

const empty = data.reduce((acc, cur, y, arr) => {
    if (cur.every(cell => cell === ".")) acc.rows.push(y); 
    if (y !== 0) return acc;
    for (let x in arr[0]) {
        if (arr.every(row => row[x] === ".")) acc.cols.push(Number(x));
    }
    return acc;
},{rows:[], cols:[]});

const galaxies = data.reduce((acc, row, y) => {
    const found = row.reduce((acc, cur, x) => {
        if (cur !== "#") return acc;
        return [...acc, [y,x].toString()];
    }, []);
    return [...acc, ...found];
}, []);

const distances = (multiplier) => {
    return galaxies.reduce((acc, a, i, arr) => {
        const [ay,ax] = a.split(',').map(Number);
        const rest = arr.slice(i+1);
        return acc + rest.reduce((acc, b) => {
            const [by, bx] = b.split(',').map(Number);
            const [miny, maxy] = [ay, by].sort((a, b) => a - b);
            const [minx, maxx] = [ax, bx].sort((a, b) => a - b);
            const emptyRows = empty.rows.reduce((acc, cur) => acc + Number(cur <= maxy && cur >= miny),0);
            const emptyCols = empty.cols.reduce((acc, cur) => acc + Number(cur <= maxx && cur >= minx),0);
            return acc + Math.abs(ay-by) + Math.abs(ax-bx) + (emptyRows + emptyCols) * (multiplier - 1);
        }, 0);
    }, 0);
}

console.log(distances(2));
console.log(distances(1000000));