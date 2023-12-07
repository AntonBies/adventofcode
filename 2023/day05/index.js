const fs = require("fs");
const path = require("path");
const puzzle = {};

fs.readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .forEach((row, i) => {
        if (i === 0) {
            const [_, objName, numbers] = row.match(/(.*):\s([\d\s]+)$/);
            puzzle[objName] = numbers.trim().split(' ').map(Number);
        } else {
            const {groups: {from, to, mappings}} = row.match(/(?<from>[a-z]+)-to-(?<to>[a-z]+) map:\n(?<mappings>[\S\s]*)/)
            const objName = from + to.replace(/./, c => c.toUpperCase());
            puzzle[objName] = mappings.trim().split('\n').map(row => row.split(" ").map(Number)).sort((a,b) => a[1] - b[1]);
        }

    });

puzzle.seedRanges = puzzle.seeds.reduce((acc, cur, i, arr) => {
    if (i % 2 === 0) return acc;
    return [...acc, [arr[i-1], cur]];
}, []);

const mapToNextCategory = (n, map) => {
    const range = map.find(([_, startIn, len]) => n >= startIn && n < startIn + len);
    if (!range) return n;
    return n - range[1] + range[0];
}

const goBack = (n, map) => {
    const range = map.find(([startIn, _, len]) => n >= startIn && n < startIn + len);
    if (!range) return n;
    return n - range[0] + range[1];
}

const seedLocation = Object.values(puzzle.seeds).map(seed => {
    const soil = mapToNextCategory(seed, puzzle.seedSoil);
    const fertilizer = mapToNextCategory(soil, puzzle.soilFertilizer);
    const water = mapToNextCategory(fertilizer, puzzle.fertilizerWater);
    const light = mapToNextCategory(water, puzzle.waterLight);
    const temperature = mapToNextCategory(light, puzzle.lightTemperature);
    const humidity = mapToNextCategory(temperature, puzzle.temperatureHumidity);
    const location = mapToNextCategory(humidity, puzzle.humidityLocation);
    return location;
});

const isSeed = (val) => {
    return puzzle.seedRanges.some(([start, len]) => val >= start && val < start + len);
};

const locationSeed = (val) => {
    return  goBack(
                goBack(
                    goBack(
                        goBack(
                            goBack(
                                goBack(
                                    goBack(val, puzzle.humidityLocation), 
                                puzzle.temperatureHumidity), 
                            puzzle.lightTemperature),
                        puzzle.waterLight),
                    puzzle.fertilizerWater),
                puzzle.soilFertilizer),
            puzzle.seedSoil);
}

console.log(Math.min(...seedLocation));
console.time('part2');
let locationIndex = 0;
while(!isSeed(locationSeed(locationIndex))) {
    locationIndex++;
}
console.log(locationIndex);
console.timeEnd('part2');


