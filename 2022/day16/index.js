const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .trim()
    .split("\n");

const regexp =
    /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/;

function bfs(graph, root) {
    const queue = [];
    root.paths = {};
    const explored = new Set();
    explored.add(root.valve);
    queue.push(root);

    while (queue.length > 0) {
        const current = queue.shift();
        for (const valve of graph[current.valve].connectingValves) {
            if (!explored.has(valve)) {
                explored.add(valve);
                root.paths[valve] = (root.paths[current.valve] || 0) + 1;
                queue.push(graph[valve]);
            }
        }
    }
}

function getInput() {
    const array = data.map((row) => {
        const [valve, flow, connectingValves] = row.match(regexp).slice(1);
        return {
            valve,
            flow: parseInt(flow),
            connectingValves: connectingValves.split(", "),
        };
    });
    const graph = Object.fromEntries(array.map((row) => [row.valve, row]));
    for (const node of array) {
        bfs(graph, node);
    }
    return graph;
}

function addFlow(graph, openValves) {
    return Object.keys(openValves).reduce(
        (acc, cur) => acc + graph[cur].flow,
        0
    );
}

function part1() {
    const time = 30;
    const graph = getInput();

    const queue = [];
    const root = {
        node: "AA",
        time,
        flow: graph.AA.flow,
        openValves: {},
    };
    queue.push(root);

    let maxFlow = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        const options = Object.values(graph).filter(
            (valve) => valve.flow > 0 && !current.openValves[valve.valve]
        );
        if (options.length === 0) {
            const flow =
                current.flow +
                current.time * addFlow(graph, current.openValves);
            maxFlow = Math.max(maxFlow, flow);
        }
        for (const { valve } of options) {
            const steps = graph[current.node].paths[valve] + 1;
            if (steps <= current.time) {
                queue.push({
                    node: valve,
                    time: current.time - steps,
                    flow:
                        current.flow +
                        steps * addFlow(graph, current.openValves),
                    openValves: { ...current.openValves, [valve]: true },
                });
            }
            const flow =
                current.flow +
                current.time * addFlow(graph, current.openValves);
            maxFlow = Math.max(maxFlow, flow);
        }
    }
    console.log(maxFlow);
}

part1();
