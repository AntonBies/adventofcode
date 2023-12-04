const input = "hfdlxzhv";

function getKnotHash(str) {
    const data = str.split("").map((_) => _.charCodeAt(0));
    data.push(17, 31, 73, 47, 23);
    let list = [...Array(256).keys()],
        pos = 0,
        skip = 0;
    const denseHash = [];
    for (let i = 0; i < 64; i++) {
        for (let len of data) {
            list = [...list.slice(pos), ...list.slice(0, pos)];
            list = [...list.slice(0, len).reverse(), ...list.slice(len)];
            list = [...list.slice(-pos), ...list.slice(0, -pos)];
            pos = (pos + len + skip++) % list.length;
        }
    }

    for (let i = 0; i < 16; i++) {
        const xorValue = list
            .slice(i * 16, i * 16 + 16)
            .reduce((acc, cur) => acc ^ cur);
        denseHash.push(xorValue);
    }
    const zeropad = (n) => ("0" + n).slice(-2);
    return denseHash.map((el) => zeropad(el.toString(16))).join("");
}

function convertToBinary(hash) {
    return hash
        .split("")
        .map((_) => parseInt(_, 16).toString(2).padStart(4, "0"))
        .join("");
}

function bfs(graph, id, node) {
    const ADJ = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    const queue = [{ pos: node }];
    const visited = [];
    while (queue.length) {
        const {
            pos: [x, y],
        } = queue.shift();

        ADJ.map(([dx, dy]) => [x + dx, y + dy])
            .filter(([x, y]) => graph[y]?.[x] === "1")
            .forEach(([x, y]) => {
                graph[y][x] = id;
                queue.push({ pos: [x, y] });
            });
    }
}

const grid = [...Array(128).keys()];

for (let row of grid) {
    grid[row] = convertToBinary(getKnotHash(input + "-" + row)).split("");
}

console.log(
    grid.reduce((acc, cur) => acc + cur.map(Number).filter(Boolean).length, 0)
);

let groupId = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "1") {
            grid[y][x] = ++groupId;
            bfs(grid, groupId, [x, y]);
        }
    }
}

console.log(groupId);
