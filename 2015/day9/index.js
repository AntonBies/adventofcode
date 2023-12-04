const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => row.match(/(.+)\sto\s(.+)\s=\s(\d+)/))
    .map((arr) => {
        const [input, from, to, distance] = arr;
        return { from, to, distance: Number(distance) };
    });

const distances = {};
const routes = [];

for (let obj of data) {
    const { from, to, distance } = obj;
    distances[from] = distances[from] || {};
    distances[to] = distances[to] || {};
    distances[from][to] = distances[to][from] = distance;
}

const places = Object.keys(distances);

const calculateDistance = (arr, prev, dist, route) => {
    if (arr.length === 0) routes.push([dist, ...route]);
    for (let place of arr) {
        const distance = dist + distances[prev][place];
        const left = arr.filter((item) => item !== place);
        calculateDistance(left, place, distance, [...route, place]);
    }
};

for (let place of places) {
    const left = places.filter((item) => item !== place);
    calculateDistance(left, place, 0, [place]);
}

console.log(routes.sort((a, b) => a[0] - b[0])[0][0]);
console.log(routes.sort((a, b) => b[0] - a[0])[0][0]);
