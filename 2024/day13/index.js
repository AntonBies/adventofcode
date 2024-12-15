const fs = require("fs");
const path = require("path");

const calcA = ({
    A: { x: ax, y: ay },
    B: { x: bx, y: by },
    prize: { x: px, y: py },
}) => (px * by - py * bx) / (ax * by - bx * ay);

const calcB = ({ A: { x: ax }, B: { x: bx }, prize: { x: px } }, a) =>
    (px - ax * a) / bx;

const findSolution = (machine) => {
    const a = calcA(machine);
    if (!Number.isInteger(a)) return false;
    const b = calcB(machine, a);
    if (!Number.isInteger(b)) return false;
    return { a, b };
};

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .map((machine) =>
        machine.split("\n").reduce((acc, cur) => {
            const [_, button, x, y] = cur
                .match(/(?:Button\s)?([AB])?:\sX[+=](\d+),\sY[+=](\d+)/)
                .map((item) => (isNaN(item) ? item : Number(item)));
            acc[button ?? "prize"] = { x, y };
            return acc;
        }, {})
    );

const partone = (input) => {
    return input.reduce((acc, cur) => {
        const tokens = findSolution(cur);
        if (!tokens) return acc;
        return acc + 3 * tokens.a + tokens.b;
    }, 0);
};

const parttwo = (input) => {
    return input.reduce((acc, cur) => {
        const {
            A,
            B,
            prize: { x: px, y: py },
        } = cur;
        const tokens = findSolution({
            A,
            B,
            prize: { x: px + 10000000000000, y: py + 10000000000000 },
        });
        if (!tokens) return acc;
        return acc + 3 * tokens.a + tokens.b;
    }, 0);
};
console.log(partone(data));
console.log(parttwo(data));
