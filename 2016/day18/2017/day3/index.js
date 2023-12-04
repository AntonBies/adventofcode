const grid = {
    "0,0": 1,
};

const markers = {
    cur: [0, 0],
    directions: [
        [1, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
    ],
    direction: 0,
    steps: 1,
    max: 1,
};

const getValue = ([x, y]) => {
    const mapping = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    const neighbours = mapping.map(([dx, dy]) => {
        return `${x + dx},${y + dy}`;
    });
    return neighbours.reduce((acc, cur) => {
        if (grid[cur]) return acc + grid[cur];
        return acc;
    }, 0);
};

const addToGrid = ([x, y], [dx, dy]) => {
    const [nextX, nextY] = [x + dx, y + dy];
    const nextValue = getValue([nextX, nextY]);
    grid[`${nextX},${nextY}`] = markers.max = nextValue;
    markers.cur = [nextX, nextY];
};

while (markers.max < 361527) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < markers.steps; j++) {
            addToGrid(markers.cur, markers.directions[markers.direction]);
        }
        markers.direction = (markers.direction + 1) % 4;
    }

    markers.steps++;
}
