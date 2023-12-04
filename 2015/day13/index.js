const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) =>
        row.match(
            /(.+) would (.+)\s(\d+) happiness units by sitting next to (.+)\./
        )
    );

const map = {};
const seatings = [];

for (let row of data) {
    const [input, name, gain, digits, neighbour] = row;
    const amount = gain === "gain" ? Number(digits) : Number(digits) * -1;
    map[name] = map[name] || {};
    map[name][neighbour] = amount;
    map[name]["Anton"] = 0;
}

for (let key in map) {
    map["Anton"] = map["Anton"] || {};
    map["Anton"][key] = 0;
}

const people = Object.keys(map);

const calculateHappiness = (arr, prev, sum, seating) => {
    if (arr.length === 0) {
        const first = seating[0];
        const last = seating[seating.length - 1];
        const score = sum + map[first][last] + map[last][first];
        seatings.push([score, ...seating]);
    }
    for (let person of arr) {
        const score = sum + map[person][prev] + map[prev][person];
        const left = arr.filter((item) => item !== person);
        calculateHappiness(left, person, score, [...seating, person]);
    }
};

for (let person of people) {
    const left = people.filter((item) => item !== person);
    calculateHappiness(left, person, 0, [person]);
}

seatings.sort((a, b) => b[0] - a[0]);
