const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

const partone = (input) => {
    const directions = {
        N: [-1, 0],
        NE: [-1, 1],
        E: [0, 1],
        SE: [1, 1],
        S: [1, 0],
        SW: [1, -1],
        W: [0, -1],
        NW: [-1, -1],
    };

    const searched = {
        1: "M",
        2: "A",
        3: "S",
    };

    const checkX = (y, x, grid) => {
        return Object.values(directions).reduce((acc, cur) => {
            const [dy, dx] = cur;
            for (let key in searched) {
                if (grid?.[y + dy * key]?.[x + dx * key] !== searched[key])
                    return acc;
            }
            return acc + 1;
        }, 0);
    };

    return input.reduce((total, curRow, y, grid) => {
        return (
            total +
            curRow.reduce((subtotal, loc, x) => {
                if (loc !== "X") return subtotal;
                const xmasCount = checkX(y, x, grid);
                return subtotal + xmasCount;
            }, 0)
        );
    }, 0);
};

const parttwo = (input) => {
    const directions = {
        one: [
            [-1, -1],
            [1, 1],
        ],
        two: [
            [-1, 1],
            [1, -1],
        ],
    };

    const checkA = (y, x, grid) => {
        const letters = Object.values(directions).map((cur) => {
            return cur.reduce((acc, [dy, dx]) => {
                const letter = grid[y + dy]?.[x + dx];
                if (!letter) return acc;
                acc[letter] = acc[letter] || 0;
                acc[letter]++;
                return acc;
            }, {});
        });
        if (letters.every((obj) => obj.M && obj.S)) return 1;
        return 0;
    };

    return input.reduce((total, curRow, y, grid) => {
        return (
            total +
            curRow.reduce((subtotal, loc, x) => {
                if (loc !== "A") return subtotal;
                const xmasCount = checkA(y, x, grid);
                return subtotal + xmasCount;
            }, 0)
        );
    }, 0);
};

console.log(partone(data));
console.log(parttwo(data));
