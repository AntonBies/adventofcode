const fs = require("fs");
const path = require("path");

const integersBetweenRoots = (time, dist) => {
    const x1 = (-1 * time + Math.sqrt(time ** 2 - 4 * dist)) / -2;
    const x2 = (-1 * time - Math.sqrt(time ** 2 - 4 * dist)) / -2;
    const [min, max] = [Math.floor(Math.min(x1, x2)), Math.ceil(Math.max(x1,x2))];

    return max - min - 1;
}

const joinInput = (arr) => Number(arr.join(""));

const [raceTimes, raceRecords] = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        const [_, numbers] = row.match(/.*:\s+([\d\s]+)/);
        return numbers.split(" ").filter(Boolean).map(Number);
    });

const part1 = raceTimes.reduce((acc, cur, i) => acc * integersBetweenRoots(cur, raceRecords[i]), 1);
const part2 = integersBetweenRoots(joinInput(raceTimes), joinInput(raceRecords));
console.log(part1);
console.log(part2);

// const margin = raceTimes.reduce((acc, cur, i) => {
//     const distances = [];
//     for (let speed = 1; speed < cur; speed++) {
//         const movingTime = cur - speed;
//         distances.push(speed * movingTime);
//     }
//     return acc * distances.filter(item => item > raceRecords[i]).length;
// }, 1);

// const raceTime = Number(raceTimes.join(""));
// const raceRecord = Number(raceRecords.join(""));

// const distances = [];
// for (let speed = 1; speed < raceTime; speed++) {
//     const movingTime = raceTime - speed;
//     distances.push(speed * movingTime);
// }

// console.log(margin);
// console.log(distances.filter(item => item > raceRecord).length);