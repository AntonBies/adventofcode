const grid = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .map((row) => row.split(""));

const findNode = (n) => {
    return grid.reduce((acc, curRow, y) => {
        const x = curRow.findIndex((_) => _ === n);
        if (x > -1) return [y, x];
        return [...acc];
    }, []);
};

const bfs = (graph, startNode, endNode) => {
    const ADJ = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    const queue = [{ node: startNode, steps: 0 }];
    const visited = [];

    while (queue.length) {
        const {
            node: [y, x],
            steps,
        } = queue.shift();
        if (`${[y, x]}` === `${endNode}`) return steps;

        ADJ.map(([dy, dx]) => [y + dy, x + dx])
            .filter(([y, x]) => graph[y]?.[x] !== "#")
            .filter((node) => !visited.includes(`${node}`))
            .forEach((node) => {
                visited.push(`${node}`);
                queue.push({ node, steps: steps + 1 });
            });
    }
};

const calculateDistance = (arr, prev, dist, route) => {
    if (arr.length === 0) routes.push([dist, ...route]);
    for (let node of arr) {
        const distance = dist + distances[prev][node];
        const left = arr.filter((item) => item !== node);
        calculateDistance(left, node, distance, [...route, node]);
    }
};

const nodes = grid.flatMap((cur) => cur.filter((_) => !["#", "."].includes(_)));
const combinations = nodes.flatMap((v, i) =>
    nodes.slice(i + 1).map((w) => ({ from: v, to: w }))
);
const distances = {};
const routes = [];

for (let obj of combinations) {
    obj.distance = bfs(grid, findNode(obj.from), findNode(obj.to));
}

for (let obj of combinations) {
    const { from, to, distance } = obj;
    distances[from] = distances[from] || {};
    distances[to] = distances[to] || {};
    distances[from][to] = distances[to][from] = distance;
}

const left = nodes.filter((item) => item !== "0");
calculateDistance(left, "0", 0, ["0"]);

console.log(routes.sort((a, b) => a[0] - b[0])[0][0]);

// part2
for (let arr of routes) {
    arr[0] = arr[0] + distances[0][arr.at(-1)];
}

console.log(routes.sort((a, b) => a[0] - b[0])[0][0]);
