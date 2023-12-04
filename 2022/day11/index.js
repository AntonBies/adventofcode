const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n\n")
    .map((monkey) =>
        monkey
            .split("\n")
            .filter(Boolean)
            .map((item) => item.trim())
    );

let supermod = 1;

const monkeys = data.map(
    ([number, starting, operation, test, ifTrue, ifFalse]) => {
        const thisMonkey = Number(number.split(" ")[1].split(":")[0]);
        const items = starting.split(":")[1].split(",").map(Number);
        const divisibleBy = Number(test.split(" ").at(-1));
        supermod *= divisibleBy;
        const getNewLevel = function (old) {
            const worryLevel = operation.split("new = old ")[1];
            const string = `${old} ${worryLevel}`.replace("old", old);
            const list = string.split(" ");
            const calculator = {
                "+": function (x, y) {
                    return Number(x) + Number(y);
                },
                "*": function (x, y) {
                    return Number(x) * Number(y);
                },
            };
            let newValue = calculator[list[1]](list[0], list[2]);
            newValue %= supermod;
            return newValue;
        };
        const getTestResult = function (item) {
            return item % divisibleBy === 0;
        };
        const throwTo = function (item) {
            const value = getTestResult(item) ? ifTrue : ifFalse;
            return Number(value.split(" ").at(-1));
        };
        let inspectedItems = 0;
        const handleItems = (arr) => {
            while (arr.length) {
                const item = arr.shift();
                monkeys[thisMonkey].inspectedItems++;
                const newItem = getNewLevel(item);
                const newMonkey = throwTo(newItem);
                monkeys[newMonkey].items.push(newItem);
            }
        };
        return {
            items,
            inspectedItems,
            handleItems,
        };
    }
);

const playRound = () => {
    for (const monkey of monkeys) {
        monkey.handleItems(monkey.items);
    }
};

for (let i = 0; i < 10000; i++) {
    playRound();
}
const mostInspected = monkeys
    .map((item) => item.inspectedItems)
    .sort((a, b) => b - a);

console.log(mostInspected[0] * mostInspected[1]);
