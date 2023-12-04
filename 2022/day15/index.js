const fs = require("fs");

const manhattanDistance = (pointa, pointb) =>
    Math.abs(pointa.x - pointb.x) + Math.abs(pointa.y - pointb.y);

const getInput = () => {
    return fs
        .readFileSync("input.txt", { encoding: "utf-8" })
        .split("\n")
        .filter(Boolean)
        .map((string) => {
            const [sx, sy, bx, by] = string
                .match(
                    /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
                )
                .slice(1)
                .map(Number);
            const sensor = { x: sx, y: sy };
            const beacon = { x: bx, y: by };
            const dist = manhattanDistance(sensor, beacon);
            return {
                sensor,
                beacon,
                dist,
            };
        });
};

const part1 = () => {
    const input = getInput();
    const searchRow = input.length === 14 ? 10 : 2000000;
    const beacons = new Set(
        input.reduce(
            (acc, { beacon }) =>
                beacon.y === searchRow ? acc.concat([beacon.x]) : acc,
            []
        )
    );
    const data = input.map(({ sensor, beacon, dist }) => {
        const stepsToSearchRow = manhattanDistance(sensor, {
            x: sensor.x,
            y: searchRow,
        });
        const reachesSearchRow = dist >= stepsToSearchRow;
        if (reachesSearchRow) {
            const minX = sensor.x - (dist - stepsToSearchRow);
            const maxX = sensor.x + (dist - stepsToSearchRow);

            return { sensor, beacon, dist, reachesSearchRow, minX, maxX };
        }

        return { sensor, beacon, dist, reachesSearchRow };
    });

    const cannotContainBeacon = new Set();
    data.forEach((obj) => {
        const { reachesSearchRow } = obj;
        if (reachesSearchRow) {
            const { minX, maxX } = obj;
            for (let i = minX; i <= maxX; i++) {
                if (!beacons.has(i)) cannotContainBeacon.add(i);
            }
        }
    });
    console.log(cannotContainBeacon.size);
};

function part2() {
    const input = getInput();
    const maxXY = input.length === 14 ? 20 : 4000000;

    for (let i = 0; i <= maxXY; i++) {
        const data = input.map(({ sensor, beacon, dist }) => {
            const stepsToSearchRow = manhattanDistance(sensor, {
                x: sensor.x,
                y: i,
            });
            const reachesSearchRow = dist >= stepsToSearchRow;
            if (reachesSearchRow) {
                const minX = sensor.x - (dist - stepsToSearchRow);
                const maxX = sensor.x + (dist - stepsToSearchRow);

                return { sensor, beacon, dist, reachesSearchRow, minX, maxX };
            }

            return { sensor, beacon, dist, reachesSearchRow };
        });
        const ranges = data
            .reduce((acc, cur) => {
                if (!cur.reachesSearchRow) return acc;
                const minX = Math.max(0, cur.minX);
                const maxX = Math.min(maxXY, cur.maxX);
                return [...acc, [minX, maxX]];
            }, [])
            .sort((a, b) => a[0] - b[0])
            .reduce((acc, cur) => {
                if (acc.length === 0) return [];
                if (cur[1] <= acc[1]) return acc;
                if (cur[0] <= acc[1] + 1) return [acc[0], cur[1]];
                const x = cur[0] - 1;
                console.log(x * 4000000 + i);
                return [];
            });
        if (ranges.length === 0) break;
    }
}
part1();
part2();
