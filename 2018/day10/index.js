const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) => {
        const [input, x, y, dx, dy] = row
            .match(
                /position=<\s?(-?\d+),\s+(-?\d+)>\svelocity=<\s?(-?\d+),\s+(-?\d+)>/
            )
            .map(Number);
        return { x, y, dx, dy };
    });

let min = Number.MAX_VALUE;
let i = 0;

while (true) {
    let max = Number.MIN_VALUE;
    data.forEach((obj) => {
        obj.x += obj.dx;
        obj.y += obj.dy;
        max = Math.max(Math.abs(obj.y), max);
    });

    if (max < min) min = max;
    else {
        data.forEach((obj) => {
            obj.x -= obj.dx;
            obj.y -= obj.dy;
        });
        break;
    }
    i++;
}

let minX = Number.MAX_VALUE;
let minY = Number.MAX_VALUE;
let maxX = Number.MIN_VALUE;
let maxY = Number.MIN_VALUE;

data.forEach((obj) => {
    minX = Math.min(obj.x, minX);
    minY = Math.min(obj.y, minY);
    maxX = Math.max(obj.x, maxX);
    maxY = Math.max(obj.y, maxY);
});

let totalX = maxX + 2;
let totalY = maxY + 2;

let grid = new Array(totalY).fill(0).map((item) => new Array(totalX).fill("."));

data.forEach((obj) => (grid[obj.y][obj.x] = "#"));

if (minY > 0) grid = grid.slice(minY - 1);
if (minX > 0) grid = grid.map((arr) => arr.slice(minX - 1));

const string = grid.reduce((acc, cur) => {
    const row = cur.reduce((a, b) => a + b, "");
    return acc + row + "\n";
}, "");

console.log(string);
console.log("After %s seconds.", i);
