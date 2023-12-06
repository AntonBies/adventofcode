const fs = require("fs");
const path = require("path");

const [raceTimes, raceRecords] = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        const [_, numbers] = row.match(/.*:\s+([\d\s]+)/);
        return numbers.split(" ").filter(Boolean).map(Number);
    });

const margin = raceTimes.reduce((acc, cur, i) => {
    const distances = [];
    for (let speed = 1; speed < cur; speed++) {
        const movingTime = cur - speed;
        distances.push(speed * movingTime);
    }
    return acc * distances.filter(item => item > raceRecords[i]).length;
}, 1);

const raceTime = Number(raceTimes.join(""));
const raceRecord = Number(raceRecords.join(""));

const distances = [];
for (let speed = 1; speed < raceTime; speed++) {
    const movingTime = raceTime - speed;
    distances.push(speed * movingTime);
}

console.log(margin);
console.log(distances.filter(item => item > raceRecord).length);