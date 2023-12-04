const [len, num, end] = [100, 1350, [31, 39]];

const grid = Array(len)
    .fill(0)
    .map((_) => Array(len).fill("."));

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        const val = x * x + 3 * x + 2 * x * y + y + y * y + num;
        const bin = val.toString(2);
        const wall = bin.split("").filter((_) => _ === "1").length % 2 === 1;
        if (wall) grid[y][x] = "#";
    }
}

const bfs = (graph, node = [1, 1]) => {
    const ADJ = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    const queue = [{ pos: node, steps: 0 }];
    const visited = [];
    while (queue.length) {
        const {
            pos: [x, y],
            steps,
        } = queue.shift();
        if (`${[x, y]}` === `${end}`) return steps;

        ADJ.map(([dx, dy]) => [x + dx, y + dy])
            .filter(([x, y]) => graph[y]?.[x] === ".")
            .filter((pos) => !visited.includes(`${pos}`))
            .forEach((pos) => {
                visited.push(`${pos}`);
                queue.push({ pos, steps: steps + 1 });
            });
    }
};

const loc = (graph, node = [1, 1]) => {
    const ADJ = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    const queue = [{ pos: node, steps: 0 }];
    const visited = [];
    while (queue.length) {
        const {
            pos: [x, y],
            steps,
        } = queue.shift();
        if (steps === 50) return visited.length;

        ADJ.map(([dx, dy]) => [x + dx, y + dy])
            .filter(([x, y]) => graph[y]?.[x] === ".")
            .filter((pos) => !visited.includes(`${pos}`))
            .forEach((pos) => {
                visited.push(`${pos}`);
                queue.push({ pos, steps: steps + 1 });
            });
    }
};

console.log(bfs(grid));
console.log(loc(grid));
