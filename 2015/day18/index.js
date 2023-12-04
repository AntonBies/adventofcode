const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) => row.split(""));
let map = {};
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        const coord = `${y},${x}`;
        map[coord] = data[y][x];
    }
}

const getNeighbours = (coord) => {
    const [y, x] = coord.split(",").map(Number);
    const list = [];
    for (let dy = -1; dy < 2; dy++) {
        for (let dx = -1; dx < 2; dx++) {
            if (dy === 0 && dx === 0) continue;
            list.push(`${y + dy},${x + dx}`);
        }
    }
    return list;
};

const getNextState = (coord) => {
    if (["0,0", "0,99", "99,0", "99,99"].includes(coord)) return "#";
    const curState = map[coord];
    const neighbours = getNeighbours(coord);
    const neighboursOn = neighbours.reduce((acc, cur) => {
        if (map[cur] === "#") return acc + 1;
        return acc;
    }, 0);

    if (curState === "#" && [2, 3].includes(neighboursOn)) return "#";
    if (curState === "." && neighboursOn === 3) return "#";
    return ".";
};

const playRound = (input) => {
    const nextMap = {};
    for (let coord in map) {
        const nextState = getNextState(coord);
        nextMap[coord] = nextState;
    }
    return nextMap;
};

map["0,0"] = map["0,99"] = map["99,0"] = map["99,99"] = "#";

for (let i = 0; i < 100; i++) {
    map = playRound(map);
}

Object.values(map).filter((item) => item === "#");
