const fs = require("fs");
const path = require("path");

const directionMap = {
    "N": [-1,0],
    "E": [0,1],
    "S": [1,0],
    "W": [0,-1],
}

const locationMap = {
    "|": [directionMap.N, directionMap.S],
    "-": [directionMap.E, directionMap.W],
    "L": [directionMap.N, directionMap.E],
    "J": [directionMap.N, directionMap.W],
    "7": [directionMap.S, directionMap.W],
    "F": [directionMap.S, directionMap.E],
}

const locations = new Set();

class Node {
    constructor(loc) {
        this.val = grid[loc[0]]?.[loc[1]];
        this.loc = loc;
        this.next = this.prev = null;
    }

    getConnections() {
        const [y,x] = this.loc;
        return locationMap[this.val]?.map(([dy,dx]) => [y+dy, x+dx]);
    }

    getNext() {
        const [y,x] = this.loc;
        return this.getConnections().find(loc => !locations.has(loc.toString()));
    }
}

class MainLoop {
    constructor(loc) {
        this.head = new Node(loc);
        this.tail = this.head;
        this.length = 1;
        locations.add(loc.toString());
    }

    append(loc) {
        const newNode = new Node(loc);
        newNode.prev = this.tail;
        this.tail.next = this.tail = newNode;
        this.length++;
        locations.add(loc.toString());
        return this;
    }
}

const grid = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

const start = grid.reduce((acc, row, y) => {
    const x = row.findIndex((cell) => cell === 'S');
    return x > -1 ? [y, x] : acc;
}, []);

const firstConnection = [directionMap.N, directionMap.E, directionMap.S, directionMap.W].map(([dy, dx]) => {
    const [y,x] = start;
    return [y+dy, x+dx];
}).find(([y,x]) => {
    const node = new Node([y,x]);
    return node.getConnections()?.find(loc => loc.toString() === start.toString());
})

const loop = new MainLoop(start);
loop.append(firstConnection);

while (true) {
    const nextLoc = loop.tail.getNext();
    if (!nextLoc) break;
    loop.append(nextLoc);
}

console.log(loop.length / 2);

const largerGrid = new Array(grid.length * 3).fill(0).map(row => new Array(grid[0].length * 3).fill(0));
const pipeMap = {
    "F": [".", ".", ".", ".", "#", "#", ".", "#", "."],
    "J": [".", "#", ".", "#", "#", ".", ".", ".", "."],
    "7": [".", ".", ".", "#", "#", ".", ".", "#", "."],
    "L": [".", "#", ".", ".", "#", "#", ".", ".", "."],
    "-": [".", ".", ".", "#", "#", "#", ".", ".", "."],
    "|": [".", "#", ".", ".", "#", ".", ".", "#", "."],
    "S": ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
}

grid.forEach((row, y) => {
    row.forEach((cell, x) => {
        const [startY, startX] = [y * 3, x * 3];
        if (!locations.has([y,x].toString())) {
            [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0],[2,1],[2,2]].map(([dy, dx]) => {
                largerGrid[startY + dy][startX + dx] = "."; 
            })
        } else {
            [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0],[2,1],[2,2]].map(([dy, dx], i) => {
                largerGrid[startY + dy][startX + dx] = pipeMap[cell][i];
            })
        }
    });
})

const queue = [[0,0]];
const visited = new Set();
while (queue.length) {
    const [y,x] = queue.pop();
    visited.add([y,x].toString());
    largerGrid[y][x] = "O";

    Object.values(directionMap)
        .map(([dy,dx]) => [y+dy,x+dx])
        .filter(([y, x]) => largerGrid[y]?.[x] === "." && !visited.has([y,x].toString()))
        .forEach(([y,x]) => {
            queue.push([y,x]);
        })
}

const enclosed = grid.reduce((acc, cur, gridy) => {
    return acc + cur.reduce((acc, cur, gridx) => {
        const [y, x] = [gridy * 3 + 1, gridx * 3 + 1];
        return acc + Number(largerGrid[y][x] === ".");
    }, 0);
},0);

console.log(enclosed);