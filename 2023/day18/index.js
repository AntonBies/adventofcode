const fs = require("fs");
const path = require("path");

const directions = {
    "R": [0,1],
    "L": [0,-1],
    "U": [-1,0],
    "D": [1,0],
}

let [y,x] = [0,0];
let outside = 0;

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        const [dir, n, color] = row.split(" ");
        return {
            dir,
            n: Number(n),
            color: color.slice(2, -1),
        }
    });

const getPoints = (part) => {
    return data.reduce((acc, {dir, n, color}) => {
        let [y,x] = acc.loc;
        const [dy,dx] = part === 1 ? directions[dir] : directions[["R","D","L","U"][color.slice(-1)]];
        const steps = part === 1 ? n : parseInt(color.slice(0,-1), 16);
        [y,x] = [y+dy*steps,x+dx*steps];
        acc.outside += steps;
        acc.loc = [y,x];
        acc.points.push([y,x]);
        return acc;
    }, {points: [], loc: [0,0], outside: 0});
}

const points = getPoints(1);
const morePoints = getPoints(2);

const area = Math.floor(points.points.reduce((acc, cur, i, arr) => {
    if (i === arr.length - 1) return acc + points.outside;
    return acc + cur[1] * arr[i+1][0] - cur[0] * arr[i+1][1];
}, 0)) / 2 + 1;

const bigArea = Math.floor(morePoints.points.reduce((acc, cur, i, arr) => {
    if (i === arr.length - 1) return acc + morePoints.outside;
    return acc + cur[1] * arr[i+1][0] - cur[0] * arr[i+1][1];
}, 0)) / 2 + 1;

console.log(area);
console.log(bigArea);