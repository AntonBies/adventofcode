const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

function findRoute(grid, min, max) {
    const start = [0,0].toString();
    const visited = {};
    const queue = [{pos: start, dir: start, count: 0, heatLoss: 0}];

    while(queue.length) {
        const {pos, dir, count, heatLoss} = queue.shift();
        const [y,x,dy,dx] = pos.split(",").concat(dir.split(",")).map(Number);
        if (y === grid.length - 1 && x === grid[0].length - 1 && count >= min) return heatLoss;
        if (visited[pos+dir+count] !== undefined) continue;
        visited[pos+dir+count] = heatLoss;

        if (count < max && dir !== "0,0") {
            const [ny,nx] = [y+dy,x+dx]; 
            if (grid[ny]?.[nx]) {
                queue.push({pos: [ny,nx].toString(), dir, count: count + 1, heatLoss: heatLoss + Number(grid[ny][nx])});
            }
        }

        if (count >= min || dir === "0,0") {
            for (const [ndy, ndx] of [[-1,0],[0,1],[1,0],[0,-1]]) {
                if ((ndy !== dy || ndx !== dx) && (ndy !== dy * -1 || ndx !== dx * -1)) {
                    const [ny,nx] = [y+ndy,x+ndx];
                    if (grid[ny]?.[nx]) {
                        queue.push({pos: [ny,nx].toString(), dir: [ndy,ndx].toString(), count: 1, heatLoss: heatLoss + Number(grid[ny][nx])})
                    }
                }
            }
        }

        queue.sort((a,b) => a.heatLoss - b.heatLoss);
    }
}

const heatLoss = findRoute(data, 0, 3);
console.log(heatLoss);
const minHeatLoss = findRoute(data, 4, 10);
console.log(minHeatLoss);