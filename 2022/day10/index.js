const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split(" "))
    .map(([left, right = 0]) => [left, Number(right)]);

const updateCycle = (cycle) => cycle + 1;

const getSignalStrength = (x, cycle) => x * cycle;

const isSignalCycle = (cycle) =>
    !![20, 60, 100, 140, 180, 220].find((item) => item === cycle);

const handleInstruction = ({ cycle, x, signal }, [operation, amount]) => {
    const cyclePlusOne = updateCycle(cycle);
    let newSignal = signal;
    if (isSignalCycle(cyclePlusOne))
        newSignal = newSignal + getSignalStrength(x, cyclePlusOne);
    if (operation === "noop")
        return { x, cycle: cyclePlusOne, signal: newSignal };
    const cyclePlusTwo = updateCycle(cyclePlusOne);
    if (isSignalCycle(cyclePlusTwo))
        newSignal = newSignal + getSignalStrength(x, cyclePlusTwo);
    const newX = x + amount;
    return { x: newX, cycle: cyclePlusTwo, signal: newSignal };
};

const result = data.reduce(
    (acc, cur) => {
        return handleInstruction(acc, cur);
    },
    { cycle: 0, x: 1, signal: 0 }
);

console.log(result.signal);

const grid = Array(6)
    .fill(0)
    .map((_) => Array(40).fill(0));

const handleCycle = ({ cycle, sprite }) => {
    const row = Math.floor(cycle / 40),
        position = cycle % 40;
    grid[row][position] = sprite.includes(position) ? "##" : "  ";
    const newCycle = updateCycle(cycle);
    return { cycle: newCycle, sprite };
};

const instruction2 = ({ cycle, x }, [operation, amount]) => {
    const sprite = [x - 1, x, x + 1];
    const cycleOne = handleCycle({ cycle, sprite });
    if (operation === "noop") {
        return { cycle: cycleOne.cycle, x };
    }
    const cycleTwo = handleCycle(cycleOne);
    const newX = x + amount;
    return { cycle: cycleTwo.cycle, x: newX };
};

data.reduce(
    (acc, cur) => {
        return instruction2(acc, cur);
    },
    { cycle: 0, x: 1 }
);

console.log(grid.map((row) => row.join("")));
