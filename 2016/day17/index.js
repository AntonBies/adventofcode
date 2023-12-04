if (!window.md5) {
    const script = document.createElement("script");
    script.src = "https://www.myersdaily.org/joseph/javascript/md5.js";
    document.head.appendChild(script);
}

const grid = Array(4)
    .fill(0)
    .map((_) => Array(4).fill("."));
const input = "ioramepc";

const bfs = (graph, node = [0, 0]) => {
    const ADJ = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];
    const directions = {
        "0,-1": "U",
        "0,1": "D",
        "-1,0": "L",
        "1,0": "R",
    };

    const queue = [{ pos: node, path: "" }];
    while (queue.length) {
        const {
            pos: [x, y],
            path,
        } = queue.shift();
        if (`${[x, y]}` === "3,3") return path;

        const doors = md5(input + path).slice(0, 4);
        ADJ.map(([dx, dy]) => ({
            next: [x + dx, y + dy],
            dir: directions[`${[dx, dy]}`],
        }))
            .filter((_, i) => !!doors[i].match(/[b-f]/))
            .filter(({ next, dir }) => graph[next[1]]?.[next[0]] === ".")
            .forEach(({ next, dir }) => {
                queue.push({ pos: next, path: path + dir });
            });
    }
};

const findLongest = (graph, node = [0, 0]) => {
    let longest = 0;
    const ADJ = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];
    const directions = {
        "0,-1": "U",
        "0,1": "D",
        "-1,0": "L",
        "1,0": "R",
    };

    const queue = [{ pos: node, path: "" }];
    while (queue.length) {
        const {
            pos: [x, y],
            path,
        } = queue.shift();
        if (`${[x, y]}` === "3,3") {
            longest = path.length;
            continue;
        }

        const doors = md5(input + path).slice(0, 4);
        ADJ.map(([dx, dy]) => ({
            next: [x + dx, y + dy],
            dir: directions[`${[dx, dy]}`],
        }))
            .filter((_, i) => !!doors[i].match(/[b-f]/))
            .filter(({ next, dir }) => graph[next[1]]?.[next[0]] === ".")
            .forEach(({ next, dir }) => {
                queue.push({ pos: next, path: path + dir });
            });
    }
    return longest;
};

console.log(bfs(grid));
console.log(findLongest(grid));
