const fs = require("fs");
const path = require("path");

const directions = {
    "N": [-1,0],
    "E": [0,1],
    "S": [1,0],
    "W": [0,-1],
}

class Beam {
    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
    }

    continue(y,x) {
        const [dy, dx] = directions[this.dir];
        this.pos = [y+dy,x+dx].toString();
        return [this];
    }

    fwdMirror(y,x) {
        const map = {
            "N": "E",
            "E": "N",
            "S": "W",
            "W": "S"
        }
        this.dir = map[this.dir];
        return this.continue(y,x);
    }

    bwdMirror(y,x) {
        const map = {
            "N": "W",
            "W": "N",
            "S": "E",
            "E": "S"
        }
        this.dir = map[this.dir];
        return this.continue(y,x);
    }

    pipe(y,x) {
        if (["N", "S"].includes(this.dir)) return this.continue(y,x);
        const newBeam = new Beam([y,x].toString(), "N");
        this.dir = "S";
        return [...this.continue(y,x), ...newBeam.continue(y,x)];
    }

    dash(y,x) {
        if (["E", "W"].includes(this.dir)) return this.continue(y,x);
        const newBeam = new Beam([y,x].toString(), "E");
        this.dir = "W";
        return [...this.continue(y,x), ...newBeam.continue(y,x)];
    }

    move(y, x, char) {
        const options = {
            ".": this.continue,
            "/": this.fwdMirror,
            "\\": this.bwdMirror,
            "|": this.pipe,
            "-": this.dash,
        }

        return options[char].call(this, y,x);
    }
}
const grid = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

function count(y,x,dir) {
    const energized = new Set();
    const visited = new Set;
    const beams = [new Beam([y,x].toString(), dir)];
    while (beams.length) {
        const current = beams.pop();
        const [y,x] = current.pos.split(",").map(Number);
        if (!grid[y]?.[x] || visited.has(current.pos + current.dir)) continue;
        energized.add(current.pos);
        visited.add(current.pos+current.dir);
        const next = current.move(y,x,grid[y][x]);
        beams.push(...next);
    }

    return energized.size;
}
const maxy = grid.length - 1;
const maxx = grid[0].length - 1;

let maxe = 0
for (let y = 0; y < grid.length; y++) {
    maxe = Math.max(maxe, count(y, 0, "E"));
    maxe = Math.max(maxe, count(y, maxx, "W"));
}
for (let x = 0; x <= maxx; x++) {
    maxe = Math.max(maxe, count(0, x, "S"));
    maxe = Math.max(maxe, count(maxy, x, "N"));
}

console.log(maxe);