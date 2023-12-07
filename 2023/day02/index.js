const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        let [gameId, sets] = row.split(":").map(_ => _.trim());
        gameId = Number(gameId.match(/Game\s(\d+)/)[1]);
        sets = sets.split("; ").map(set => {
            return set.split(",").reduce((acc, cur) => {
                const [fullMatch, amount, name] = cur.match(/(\d+)\s([a-z]+)/)
                acc[name] = Number(amount);
                return acc;
            }, {})
        });
        return {gameId, sets};
    });

const partone = (input) => {
    const totals = {
        red: 12,
        green: 13,
        blue: 14,
    }

    return input.reduce((acc, cur) => {
        console.log(cur);
        const isImpossible = cur.sets.some(obj => {
            for (const prop in obj) {
                if (obj[prop] > totals[prop]) return true;
            }
            return false;
        });
        if (isImpossible) return acc;
        return acc + cur.gameId;
    }, 0)
}

const parttwo = (input) => {
    return input.reduce((acc, cur) => {
        const fewest = cur.sets.reduce((acc, cur) => {
            for (const prop in cur) {
                acc[prop] = Math.max(acc[prop], cur[prop])
            }
            return acc;
        }, {blue: 0, red: 0, green: 0})
        return fewest["blue"] * fewest["red"] * fewest["green"] + acc;
    }, 0)
}

console.log(partone(data));
console.log(parttwo(data));